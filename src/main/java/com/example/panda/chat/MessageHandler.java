/* title : MessageHandler
 * 설명 : 웹 소켓으로 받아온 메시지를 처리하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.18
 * 업데이트 :
 */
package com.example.panda.chat;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.entity.WritingCompleteEntity;
import com.example.panda.service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.UriTemplate;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class MessageHandler extends TextWebSocketHandler {
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final WritingCompleteService writingCompleteService;
    private final UserService userService;
    private final PurchaseHistoryService purchaseHistoryService;
    private final WebSocketSessionManager webSocketSessionManager;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        session.setBinaryMessageSizeLimit(5*1024*1024);
        session.setTextMessageSizeLimit(5*1024*1024);
        // 데이터 용량 크기 5MB로 제한

        String uri = session.getUri().toString();
        String roomId = getRoomIdUsingUri(uri);
        String email = (String) session.getAttributes().get("user");

        webSocketSessionManager.registerSession(email + "/" + roomId, session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

        String receivedMessage = message.getPayload();
        ObjectMapper objectMapper = new ObjectMapper();
        ChatDTO chatDTO = objectMapper.readValue(receivedMessage, ChatDTO.class);
        // ObjectMapper를 통해 Message를 chatDTO로 변환

        String email = (String) session.getAttributes().get("user");

        webSocketSessionManager.registerRoomId(email, chatDTO.getRoomId());   // 클릭한 내용을 저장한다.

        // 요청을 보낸 사용자가 어떤 채팅방에서 보낸건지 등록
        // 사용자가 현재 그 채팅방을 보고있다고 생각

        ChatRoomDTO chatRoomDTO = chatRoomService.findById(chatDTO.getRoomId());
        // 현재 채팅방 정보 가져오기

        UserDTO buyer = chatRoomDTO.getBuyer();
        UserDTO seller = chatRoomDTO.getSeller();

        if (chatDTO.getType().equals("send")) {
            // 누군가 보낸 메시지일 경우

            chatDTO.setChatDate(new Date());

            WebSocketSession buyerSession = webSocketSessionManager.
                    getSession(buyer.getEmail() + "/" + chatRoomDTO.getRoomId());

            WebSocketSession sellerSession = webSocketSessionManager.
                    getSession(seller.getEmail() + "/" + chatRoomDTO.getRoomId());

            Map<String, Object> buyerMap = new HashMap<>();
            buyerMap.put("type", "chat");
            buyerMap.put("message", chatDTO);

            if (buyer.getEmail().equals(email))
                buyerMap.put("messageType", "sender");      // 내가 현재 채팅을 보낸 사람인가?
            else
                buyerMap.put("messageType", "receiver");    // 내가 현재 채팅을 받는 사람인가?

            buyerMap.put("amIBuyer", true);
            buyerMap.put("myRoomId", webSocketSessionManager.getRoomId(buyer.getEmail()));

            if (seller != null) {
                buyerMap.put("opNickname", seller.getNickname());
                buyerMap.put("opUserImg", seller.getUserImg());
            }
            sendMessage(buyerSession, buyerMap);

            Map<String, Object> sellerMap = new HashMap<>();
            sellerMap.put("type", "chat");
            sellerMap.put("message", chatDTO);

            if (seller.getEmail().equals(email))
                sellerMap.put("messageType", "sender");      // 내가 현재 채팅을 보낸 사람인가?
            else
                sellerMap.put("messageType", "receiver");    // 내가 현재 채팅을 받는 사람인가?

            sellerMap.put("amIBuyer", false);
            sellerMap.put("myRoomId", webSocketSessionManager.getRoomId(seller.getEmail()));

            if (buyer != null) {
                sellerMap.put("opNickname", buyer.getNickname());
                sellerMap.put("opUserImg", buyer.getUserImg());
            }

            sendMessage(sellerSession, sellerMap);

            chatService.save(chatDTO);

            if (email.equals(buyer.getEmail())) {   // buyer가 메시지를 보냈다는 의미
                Long roomId = webSocketSessionManager.getRoomId(seller.getEmail());
                chatRoomService.setNoReadAndBuyerByRoomId(chatRoomDTO.getRoomId(), false, roomId != chatRoomDTO.getRoomId());
                chatRoomService.setExitSellerByRoomId(chatRoomDTO.getRoomId(), false);
            } else {  // seller가 메시지를 보냈다는 의미
                Long roomId = webSocketSessionManager.getRoomId(buyer.getEmail());
                chatRoomService.setNoReadAndBuyerByRoomId(chatRoomDTO.getRoomId(), true, roomId != chatRoomDTO.getRoomId());
                chatRoomService.setExitBuyerByRoomId(chatRoomDTO.getRoomId(), false);
            }
        } else if (chatDTO.getType().equals("evaluate")) {
            // 사용자가 평가를 하였을 경우
            Map<String, Object> map = new HashMap<>();
            map.put("type", "evaluate");

            if (email.equals(buyer.getEmail())) {
                chatRoomDTO.setEvaluateBuyer(chatDTO.getCount());
                map.put("evaluateRoom", chatRoomDTO);

                sendMessage(session, map);

                chatRoomService.setEvaluateBuyerByRoomId(chatRoomDTO.getRoomId(), chatDTO.getCount());
                if (chatRoomDTO.getEvaluateSeller() != 0) { // 상대방의 평점이 null이 아니면 서로 평점을 매겼다는 의미 (구매, 판매 확정)
                    writingCompleteService.save(chatRoomDTO.getWriting().getWriting_Id());
                    userService.changeMemberPoint(buyer.getEmail(), chatRoomDTO.getEvaluateSeller() - 2);
                    userService.changeMemberPoint(seller.getEmail(), chatRoomDTO.getEvaluateBuyer() - 2);
                    purchaseHistoryService.save(buyer.getEmail(), chatRoomDTO.getWriting().getWriting_Id());
                    // 구매, 판매 확정 시 사용자 평가 반영 / good : +1, normal : 0, bad : -1
                }
            } else {
                chatRoomDTO.setEvaluateSeller(chatDTO.getCount());
                map.put("evaluateRoom", chatRoomDTO);

                sendMessage(session, map);

                chatRoomService.setEvaluateSellerByRoomId(chatRoomDTO.getRoomId(), chatDTO.getCount());
                if (chatRoomDTO.getEvaluateBuyer() != 0) { // 상대방의 평점이 null이 아니면 서로 평점을 매겼다는 의미 (구매, 판매 확정)
                    writingCompleteService.save(chatRoomDTO.getWriting().getWriting_Id());
                    userService.changeMemberPoint(buyer.getEmail(), chatRoomDTO.getEvaluateSeller() - 2);
                    userService.changeMemberPoint(seller.getEmail(), chatRoomDTO.getEvaluateBuyer() - 2);
                    purchaseHistoryService.save(buyer.getEmail(), chatRoomDTO.getWriting().getWriting_Id());
                    // 구매, 판매 확정 시 사용자 평가 반영 / good : +1, normal : 0, bad : -1
                }
            }
        } else if (chatDTO.getType().equals("exit")) {
            // 채팅방을 나갔을 경우

            Map<String, Object> map = new HashMap<>();
            map.put("type", "exit");
            map.put("exitedRoomId", chatDTO.getRoomId());

            webSocketSessionManager.removeRoomId(email);

            WebSocketSession buyerSession = webSocketSessionManager.
                    getSession(buyer.getEmail() + "/" + chatRoomDTO.getRoomId());

            WebSocketSession sellerSession = webSocketSessionManager.
                    getSession(seller.getEmail() + "/" + chatRoomDTO.getRoomId());

            map.put("amIExit", false);

            if (email.equals(buyer.getEmail())) {
                sendMessage(sellerSession, map);
                map.put("amIExit", true);
                sendMessage(buyerSession, map);

                if (chatRoomDTO.getIsExitSeller()) {
                    chatRoomService.deleteByRoomId(chatDTO.getRoomId());
                } else {
                    chatRoomService.setExitBuyerByRoomId(chatDTO.getRoomId(), true);
                }
            } else {
                sendMessage(buyerSession, map);
                map.put("amIExit", true);
                sendMessage(sellerSession, map);

                if (chatRoomDTO.getIsExitBuyer()) {
                    chatRoomService.deleteByRoomId(chatDTO.getRoomId());
                } else {
                    chatRoomService.setExitSellerByRoomId(chatDTO.getRoomId(), true);
                }
            }

        } else {
            // 메시지를 불러와야 하는 상황일 경우 (스크롤 or 채팅방 클릭)

            Map<String, Object> map = new HashMap<>();
            map.put("type", "chatList");

            List<ChatDTO> chatDTOList = chatService.findNByRoomId(chatDTO.getRoomId(), chatDTO.getCount() + 20);
            // 메시지 불러오기
            // 최근 20개의 메시지를 가져옴

            if (chatDTO.getType().equals("scroll")) {    // 스크롤을 위로 올려서 메시지를 받는 경우
                map.put("messageType", "false"); // 스크롤을 내려야 하는가?
            } else if (chatDTO.getType().equals("click")) {    // 채팅방 클릭으로 메시지를 받는 경우
                map.put("messageType", "true");  // 스크롤을 내려야 하는가?

                if (chatRoomDTO.getIsNoRead() && !(chatRoomDTO.getNoReadBuyer() ^ chatRoomDTO.getBuyer().getEmail().equals(email))) {
                    // 만약 채팅방에 읽지 않음 표시가 되어있고, 안읽은 사람이 사용자일 경우 이번에 채팅방을 클릭했으므로 읽음.
                    chatRoomService.setNoReadCountByRoomId(chatRoomDTO.getRoomId(), false);
                    List<ChatRoomDTO> chatRoomDTOList = chatRoomService.findByUserEmail(email);
                    map.put("myRooms", chatRoomDTOList);
                }
            }

            if (chatDTOList.size() == chatDTO.getCount()) {// 사용자가 이미 스크롤을 끝까지 올려 더 이상 불러올 메시지가 없음을 의미
                map.put("messageType", "full");
            }

            map.put("currentRoom", chatRoomDTO);
            map.put("messages", chatDTOList);
            sendMessage(session, map);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status){

        String uri = session.getUri().toString();
        String roomId = getRoomIdUsingUri(uri);
        String email = (String) session.getAttributes().get("user");

        webSocketSessionManager.removeSession(email + "/" + roomId);
    }

    String getRoomIdUsingUri (String uri) {
        UriTemplate uriTemplate = new UriTemplate("/chat/{roomId}");
        String roomId = uriTemplate.match(uri).get("roomId");

        return roomId;
    }

    public void sendMessage(WebSocketSession session, Map<String, Object> map) throws IOException {
        if(session != null && session.isOpen()) {
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(map);
            TextMessage textMessage = new TextMessage(json);
            session.sendMessage(textMessage);
        }
    }
}






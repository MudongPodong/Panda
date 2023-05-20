/* title : MessageHandler
 * 설명 : 웹 소켓으로 받아온 메시지를 처리하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.18
 * 업데이트 :
 */
package com.example.panda.controller;

import com.example.panda.chat.WebSocketSessionManager;
import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
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
        webSocketSessionManager.registerChatInfo(email, chatDTO);
        // 요청을 보낸 사용자가 어떤 채팅방에서 보낸건지 등록
        // 사용자가 현재 그 채팅방을 보고있다고 생각

        Map<String, Object> map = new HashMap<>();
        if(chatDTO.getType().equals("send")) {
            // 누군가 보낸 메시지일 경우
            chatDTO.setChatDate(new Date());
            chatService.save(chatDTO);

            if (session.isOpen()) {
                ChatRoomDTO chatRoomDTO = chatRoomService.findById(chatDTO.getRoomId());

                UserDTO buyer = chatRoomDTO.getBuyer();
                UserDTO seller = chatRoomDTO.getSeller();

                WebSocketSession buyerSession = webSocketSessionManager.
                        getSession(buyer.getEmail() + "/" + chatRoomDTO.getRoomId());

                WebSocketSession sellerSession = webSocketSessionManager.
                        getSession(seller.getEmail() + "/" + chatRoomDTO.getRoomId());

                map.put("message", chatDTO);

                if(buyerSession != null) {
                    if(buyer.getEmail().equals(email))
                        map.put("type", "sender");      // 내가 현재 채팅을 보낸 사람인가?
                    else
                        map.put("type", "receiver");    // 내가 현재 채팅을 받는 사람인가?
                    map.put("amIBuyer", true);
                    sendMessage(buyerSession, buyer, seller, map);
                }
                if (sellerSession != null) {
                    if(seller.getEmail().equals(email))
                        map.put("type", "sender");      // 내가 현재 채팅을 보낸 사람인가?
                    else
                        map.put("type", "receiver");    // 내가 현재 채팅을 받는 사람인가?
                    map.put("amIBuyer", false);
                    sendMessage(sellerSession, seller, buyer, map);
                }
            }
        } else {
            // 메시지 불러오기
            List<ChatDTO> chatDTOList = chatService.findNByRoomId(chatDTO.getRoomId(), chatDTO.getCount() + 20);
            // 최근 20개의 메시지를 가져옴.

            if(chatDTO.getType().equals("scroll")) {    // 스크롤을 위로 올려서 메시지를 받는 경우
                map.put("type", "false"); // 스크롤을 내려야 하는가?
            }
            else if(chatDTO.getType().equals("click")) {    // 채팅방 클릭으로 메시지를 받는 경우
                map.put("type", "true");  // 스크롤을 내려야 하는가?
            }
            if(chatDTOList.size() == chatDTO.getCount()) {// 사용자가 이미 스크롤을 끝까지 올려 더 이상 불러올 메시지가 없음을 의미
                map.put("type", "full");
            }

            map.put("messages", chatDTOList);
            if (session.isOpen()) {
                String json = objectMapper.writeValueAsString(map);
                TextMessage textMessage = new TextMessage(json);
                session.sendMessage(textMessage);
            }
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

    public void sendMessage(WebSocketSession session, UserDTO myInfo, UserDTO opInfo, Map<String, Object> map) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        ChatDTO chatDTO = webSocketSessionManager.getChatInfo(myInfo.getEmail());
        List<ChatRoomDTO> myRooms = chatRoomService.findByUserEmail(myInfo.getEmail());

        map.put("myRooms", myRooms);

        if(chatDTO != null) {
            map.put("myRoomId", chatDTO.getRoomId());
            map.put("myIndex", chatDTO.getIndex());
        }

        if(opInfo != null) {
            map.put("opNickname", opInfo.getNickname());
            map.put("opUserImg", opInfo.getUserImg());
        }

        String json = objectMapper.writeValueAsString(map);
        TextMessage textMessage = new TextMessage(json);
        session.sendMessage(textMessage);
    }

}






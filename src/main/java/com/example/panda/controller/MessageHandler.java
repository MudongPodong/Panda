/* title : MessageHandler
 * 설명 : 웹 소켓으로 받아온 메시지를 처리하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.18
 * 업데이트 : -
 */
package com.example.panda.controller;

import com.example.panda.config.WebSocketSessionManager;
import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import com.example.panda.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;
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
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@RestController
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

//        webSocketSessionManager.notifyMap();
        webSocketSessionManager.registerSession(email + "/" + roomId, session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

        String receivedMessage = message.getPayload();
        ObjectMapper objectMapper = new ObjectMapper();
        ChatDTO chatDTO = objectMapper.readValue(receivedMessage, ChatDTO.class);
        // ObjectMapper를 통해 Message를 chatDTO로 변환

        String email = (String) session.getAttributes().get("user");
        webSocketSessionManager.registerRoomId(email, chatDTO.getRoomId());
        // 요청을 보낸 사용자가 어떤 채팅방에서 보낸건지 등록
        // 사용자가 현재 그 채팅방을 보고있다고 생각

        Map<String, Object> map = new HashMap<>();
        if(chatDTO.getPhoto() != null || chatDTO.getContent() != null) {
            // 메시지가 존재할 때 처리
            chatDTO.setChatDate(new Date());
            chatService.save(chatDTO);

            if (session.isOpen()) {
                ChatRoomDTO chatRoomDTO = chatRoomService.findById(chatDTO.getRoomId());

                String buyer = chatRoomDTO.getBuyer().getEmail();
                String seller = chatRoomDTO.getSeller().getEmail();

                WebSocketSession buyerSession = webSocketSessionManager.
                        getSession(buyer + "/" + chatRoomDTO.getRoomId());

                WebSocketSession sellerSession = webSocketSessionManager.
                        getSession(seller + "/" + chatRoomDTO.getRoomId());

                Long buyerRoomId = webSocketSessionManager.getRoomId(buyer);
                Long sellerRoomId = webSocketSessionManager.getRoomId(seller);

                map.put("message", chatDTO);
                if(buyerSession != null) {
                    map.put("myRoomId", buyerRoomId);
                    String json = objectMapper.writeValueAsString(map);
                    TextMessage textMessage = new TextMessage(json);
                    buyerSession.sendMessage(textMessage);
                }

                if(sellerSession != null) {
                    map.put("myRoomId", sellerRoomId);
                    String json = objectMapper.writeValueAsString(map);
                    TextMessage textMessage = new TextMessage(json);
                    sellerSession.sendMessage(textMessage);
                }
            }
        } else {
            // 메시지 불러오기
            List<ChatDTO> chatDTOList = chatService.findByRoomId(chatDTO.getRoomId());

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
//        String email = (String) session.getAttributes().get("user");
//        webSocketSessionManager.removeSession(email);
    }

    String getRoomIdUsingUri (String uri) {
        UriTemplate uriTemplate = new UriTemplate("/chat/{roomId}");
        String roomId = uriTemplate.match(uri).get("roomId");

        return roomId;
    }

}






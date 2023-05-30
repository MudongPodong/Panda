/* title : ChatHandler
 * 설명 : 채팅 페이지 접속 시 웹 소켓을 처리하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.18
 * 업데이트 : -
 */
package com.example.panda.chat;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class ChatHandler extends TextWebSocketHandler {
    private final ChatRoomService chatRoomService;
    private final WebSocketSessionManager webSocketSessionManager;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        String email = (String) session.getAttributes().get("user");
        webSocketSessionManager.registerSession(email, session);

        List<ChatRoomDTO> chatRooms = chatRoomService.findByUserEmail(email);

        Map<String, Object> map = new HashMap<>();
        map.put("email", email);
        map.put("chatRooms", chatRooms);

        if(session.isOpen()) {
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(map);
            TextMessage textMessage = new TextMessage(json);
            session.sendMessage(textMessage);
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String email = (String) session.getAttributes().get("user");

        webSocketSessionManager.removeSession(email);
        webSocketSessionManager.removeRoomId(email);
    }


}






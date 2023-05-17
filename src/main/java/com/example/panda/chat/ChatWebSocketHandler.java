package com.example.panda.chat;

import com.example.panda.dto.ChatDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

public class ChatWebSocketHandler extends AbstractWebSocketHandler {

    private ObjectMapper objectMapper;

    public ChatWebSocketHandler (ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 메시지 처리 로직을 구현
        ChatDTO chatDTO = objectMapper.readValue(message.getPayload(), ChatDTO.class);
        System.out.println(chatDTO);

        // 채팅 메시지를 받았을 때 처리할 코드
        // session.sendMessage(new TextMessage("새로운 메시지: " + payload));
    }
}






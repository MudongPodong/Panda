package com.example.panda.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // WebSocket 연결이 성립되면 실행되는 메서드
        // 세션을 저장하거나 초기화 작업을 수행할 수 있습니다.
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트로부터 메시지가 도착하면 실행되는 메서드
        // 메시지를 처리하고 필요한 작업을 수행합니다.
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // WebSocket 연결이 종료되면 실행되는 메서드
        // 세션을 정리하거나 마무리 작업을 수행할 수 있습니다.
    }
}
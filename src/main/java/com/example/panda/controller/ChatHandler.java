/* title : ChatHandler
 * 설명 : 채팅 페이지 접속 시 웹 소켓을 처리하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.18
 * 업데이트 : -
 */
package com.example.panda.controller;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@RestController
public class ChatHandler extends TextWebSocketHandler {
    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        String receivedMessage = message.getPayload();

        ObjectMapper objectMapper = new ObjectMapper();
        UserDTO userDTO = objectMapper.readValue(receivedMessage, UserDTO.class);

        List<ChatRoomDTO> chatRoomDTOList = chatRoomService.findByUserEmail(userDTO.getEmail());

        if(session.isOpen()) {
            String json = objectMapper.writeValueAsString(chatRoomDTOList);
            TextMessage textMessage = new TextMessage(json);
            session.sendMessage(textMessage);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {

    }


}






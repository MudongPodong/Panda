package com.example.panda.controller;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /* 채팅 테스트용 (0번 채팅방) */
    @GetMapping("/api/chat")
    public List<ChatDTO> chatTest() {
        List<ChatDTO> chatTest = new ArrayList<>();
        return chatTest;
    }

    /* 채팅방 테스트용 */
    @GetMapping("/api/chatList")
    public List<ChatRoomDTO> chatListTest() {
        List<ChatRoomDTO> chatListTest = new ArrayList<>();
        return chatListTest;
    }
}

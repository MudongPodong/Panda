package com.example.panda.controller;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import com.example.panda.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    /* 채팅 테스트용 */
    @PostMapping("/api/chat")
    public List<ChatDTO> chatTest(@RequestBody ChatRoomDTO chatRoomDTO) {
        List<ChatDTO> chat = chatService.findByRoomId(chatRoomDTO.getRoomId());

//        System.out.println(chat);
        return chat;
    }

    /* 채팅방 테스트용 */
    @PostMapping("/api/chatList")
    public List<ChatRoomDTO> chatListTest(@RequestBody UserDTO userDTO) {
        List<ChatRoomDTO> chatList = chatRoomService.findByUserId(userDTO.getUserId());
//        System.out.println(chatList);

        return chatList;
    }

}

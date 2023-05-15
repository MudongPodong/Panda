package com.example.panda.controller;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    /* 채팅 테스트용 */
    @PostMapping("/api/chat")
    public List<ChatDTO> chatTest(@RequestParam Long roomId) {
        List<ChatDTO> chat = chatService.findByRoomId(roomId);

        return chat;
    }

    /* 채팅방 테스트용 */
    @PostMapping("/api/chatList")
    public List<ChatRoomDTO> chatListTest(@RequestParam String email) {
        List<ChatRoomDTO> chatList = chatRoomService.findByUserEmail(email);

        return chatList;
    }

    @PostMapping("/api/sendChat")
    public List<ChatDTO> sendChatTest(@RequestParam("message") String message, @RequestParam("roomId") Long roomId,
                         @RequestParam("isFromBuyer") Boolean isFromBuyer) {

        ChatDTO chatDTO = new ChatDTO(null, null, isFromBuyer, message, LocalDateTime.now(), null);

        chatService.save(chatDTO, roomId);
        List<ChatDTO> chat = chatService.findByRoomId(roomId);

        return chat;
    }

    @PostMapping("/api/sendChatPhoto")
    public List<ChatDTO> sendPhotoTest(@RequestParam("photo")MultipartFile photo,  @RequestParam("roomId") Long roomId,
                         @RequestParam("isFromBuyer") Boolean isFromBuyer) throws IOException {


        ChatDTO chatDTO = new ChatDTO(null, null, isFromBuyer, null, LocalDateTime.now(), photo.getBytes());
        chatService.save(chatDTO, roomId);

        List<ChatDTO> chat = chatService.findByRoomId(roomId);
        return chat;
    }

}

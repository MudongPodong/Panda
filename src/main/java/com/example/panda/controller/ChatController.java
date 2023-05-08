package com.example.panda.controller;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.PhotoDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import com.example.panda.service.PhotoService;
import com.example.panda.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final PhotoService photoService;

    /* 채팅 테스트용 */
    @PostMapping("/api/chat")
    public List<ChatDTO> chatTest(@RequestParam Long roomId) {
        List<ChatDTO> chat = chatService.findByRoomId(roomId);
//
//        for(ChatDTO chatDTO : chat) {
//            if(chatDTO.getPhoto() != null) {
//                System.out.println(new String(chatDTO.getPhoto()));
//            }
//        }
        return chat;
    }

    /* 채팅방 테스트용 */
    @PostMapping("/api/chatList")
    public List<ChatRoomDTO> chatListTest(@RequestParam String userId) {
        List<ChatRoomDTO> chatList = chatRoomService.findByUserId(userId);

        return chatList;
    }

    @PostMapping("/api/sendChat")
    public List<ChatDTO> sendChatTest(@RequestParam("message") String message, @RequestParam("roomId") Long roomId,
                         @RequestParam("isFromSender") Boolean isFromSender) {

        ChatDTO chatDTO = new ChatDTO(null, null, isFromSender, message, LocalDateTime.now(), null);

        chatService.save(chatDTO, roomId);
        List<ChatDTO> chat = chatService.findByRoomId(roomId);

        return chat;
    }

    @PostMapping("/api/sendChatPhoto")
    public List<ChatDTO> sendPhotoTest(@RequestParam("photo")MultipartFile photo,  @RequestParam("roomId") Long roomId,
                         @RequestParam("isFromSender") Boolean isFromSender) throws IOException {


        ChatDTO chatDTO = new ChatDTO(null, null, isFromSender, null, LocalDateTime.now(), photo.getBytes());
        chatService.save(chatDTO, roomId);

        List<ChatDTO> chat = chatService.findByRoomId(roomId);
        return chat;
    }

}

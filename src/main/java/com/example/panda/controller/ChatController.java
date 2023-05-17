/*
 * title : ChatController
 * 설명 : 채팅 관련 요청을 다루기 위한 Controller
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.controller;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    @PostMapping("/api/chat")
    public List<ChatDTO> chatTest(@RequestBody ChatDTO chatDTO) {
        List<ChatDTO> chat = chatService.findByRoomId(chatDTO.getRoomId());

        return chat;
    }

    @PostMapping("/api/chatList")
    public List<ChatRoomDTO> chatListTest(@RequestBody UserDTO userDTO) {
        List<ChatRoomDTO> chatList = chatRoomService.findByUserEmail(userDTO.getEmail());

        return chatList;
    }

    @PostMapping("/api/sendChat")
    public List<ChatDTO> sendChatTest(@RequestBody ChatDTO chatDTO) {

        chatDTO.setChatDate(new Date());
        chatService.save(chatDTO);
        List<ChatDTO> chat = chatService.findByRoomId(chatDTO.getRoomId());

        return chat;
    }

    @PostMapping("/api/sendChatPhoto")
    public List<ChatDTO> sendPhotoTest(@RequestParam("photo")MultipartFile photo,  @RequestParam("roomId") Long roomId,
                         @RequestParam("isFromBuyer") Boolean isFromBuyer) throws IOException {


        ChatDTO chatDTO = new ChatDTO(roomId, null, isFromBuyer, new Date(), photo.getBytes());
        chatService.save(chatDTO);

        List<ChatDTO> chat = chatService.findByRoomId(roomId);
        return chat;
    }

}

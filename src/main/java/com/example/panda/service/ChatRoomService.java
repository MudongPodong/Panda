package com.example.panda.service;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;


//    public List<ChatRoomDTO> findByIds(String sender_id, String receiver_id) {
//        List<ChatRoomEntity> chatRoomEntityList = chatRoomRepository.findAll();
//
//        List<ChatRoomDTO> chatRoomDTOList = new ArrayList<>();
//        for(ChatRoomEntity chatRoomEntity : chatRoomEntityList)
//            chatRoomDTOList.add(ChatRoomDTO.toChatRoomDTO(chatRoomEntity, sender_id, receiver_id);
//
//        return chatRoomDTOList;
//    }
}

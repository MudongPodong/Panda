/*
 * title : ChatRoomService
 * 설명 : 채팅방 관련 처리 작업을 하는 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.service;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.entity.ChatEntity;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public List<ChatRoomDTO> findByUserEmail(String email) {
        List<ChatRoomEntity> chatRoomEntityList = chatRoomRepository.findByUserEmail(email);
        List<ChatRoomDTO> chatRoomDTOList = new ArrayList<>();

        for(ChatRoomEntity chatRoomEntity : chatRoomEntityList)
            chatRoomDTOList.add(ChatRoomDTO.toChatRoomDTO(chatRoomEntity));

        return chatRoomDTOList;
    }

    @Transactional
    public ChatRoomDTO findById(Long roomId) {
        Optional<ChatRoomEntity> optionalChatRoomEntity = chatRoomRepository.findById(roomId);

        if(optionalChatRoomEntity.isPresent()) {
            ChatRoomEntity chatRoomEntity = optionalChatRoomEntity.get();
          return ChatRoomDTO.toChatRoomDTO(chatRoomEntity);
        } else return null;
    }

}

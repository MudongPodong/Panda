package com.example.panda.service;

import com.example.panda.dto.ChatDTO;
import com.example.panda.entity.ChatEntity;
import com.example.panda.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public List<ChatDTO> findByRoomId(int roomId) {
        List<ChatEntity> chatEntityList = chatRepository.findByRoomId(roomId);

        List<ChatDTO> chatDTOList = new ArrayList<>();

        for(ChatEntity chatEntity : chatEntityList)
            chatDTOList.add(ChatDTO.toChatDTO(chatEntity, roomId));

        return chatDTOList;
    }


}

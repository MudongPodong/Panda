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

    @Transactional
    public List<ChatDTO> findById(int room_id) {
        List<ChatEntity> chatEntityList = chatRepository.findAll();

        List<ChatDTO> chatDTOList = new ArrayList<>();

        for(ChatEntity chatEntity : chatEntityList)
            chatDTOList.add(ChatDTO.toChatDTO(chatEntity, room_id));

        return chatDTOList;
    }


}

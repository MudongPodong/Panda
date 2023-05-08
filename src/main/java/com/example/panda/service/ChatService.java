package com.example.panda.service;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.PhotoDTO;
import com.example.panda.entity.ChatEntity;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.entity.PhotoEntity;
import com.example.panda.repository.ChatRepository;
import com.example.panda.repository.ChatRoomRepository;
import com.example.panda.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;

    public List<ChatDTO> findByRoomId(Long roomId) {
        List<ChatEntity> chatEntityList = chatRepository.findByRoomId(roomId);

        List<ChatDTO> chatDTOList = new ArrayList<>();

        for(ChatEntity chatEntity : chatEntityList)
            chatDTOList.add(ChatDTO.toChatDTO(chatEntity, ChatRoomDTO.toChatRoomDTO(chatEntity.getRoom_id())));

        return chatDTOList;
    }

    @Transactional
    public Long save(ChatDTO chatDTO, Long roomId) {
        Optional<ChatRoomEntity> optionalChatRoomEntity = chatRoomRepository.findById(roomId);

        if(optionalChatRoomEntity.isPresent()) {
            ChatRoomEntity chatRoomEntity = optionalChatRoomEntity.get();
            ChatEntity chatEntity = ChatEntity.toSaveEntity(chatDTO, chatRoomEntity);

            chatRoomEntity.setLast_content(chatDTO.getContent());
            chatRoomEntity.setLast_date(chatDTO.getChatDate());

            chatRoomRepository.save(chatRoomEntity);
            return chatRepository.save(chatEntity).getChat_id();
        }
        else return null;

    }
}

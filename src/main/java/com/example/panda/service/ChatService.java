/*
* title : ChatService
* 설명 : 채팅 관련 처리 작업을 하는 클래스
* 작성자 : 이승현
* 생성일 : 2023.05.17
* 업데이트 : -
*/
package com.example.panda.service;

import com.example.panda.dto.ChatDTO;
import com.example.panda.entity.ChatEntity;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.repository.ChatRepository;
import com.example.panda.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
            chatDTOList.add(ChatDTO.toChatDTO(chatEntity));

        return chatDTOList;
    }

    @Transactional
    public Long save(ChatDTO chatDTO) {
        Optional<ChatRoomEntity> optionalChatRoomEntity = chatRoomRepository.findById(chatDTO.getRoomId());

        if(optionalChatRoomEntity.isPresent()) {
            ChatRoomEntity chatRoomEntity = optionalChatRoomEntity.get();
            ChatEntity chatEntity = ChatEntity.toSaveEntity(chatDTO);

            chatRoomEntity.setLast_content(chatDTO.getContent());
            chatRoomEntity.setLast_date(chatDTO.getChatDate());

            chatRoomRepository.save(chatRoomEntity);
            return chatRepository.save(chatEntity).getRoomId();
        }
        else return null;
    }

}

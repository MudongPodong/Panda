/*
 * title : ChatRoomService
 * 설명 : 채팅방 관련 처리 작업을 하는 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.service;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.repository.ChatRoomDSLRepository;
import com.example.panda.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomDSLRepository chatRoomDSLRepository;

    @Transactional
    public List<ChatRoomDTO> findByUserEmail(String email) {
        List<ChatRoomEntity> chatRoomEntityList = chatRoomDSLRepository.findByUserEmail(email);
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

    @Transactional
    public void setNoReadCountByRoomId(Long roomId, boolean isNoRead) {
        chatRoomRepository.setNoReadCountByRoomId(roomId, isNoRead);
    }

    @Transactional
    public void setNoReadAndBuyerByRoomId(Long roomId, boolean noReadBuyer, boolean isNoRead) {
        chatRoomRepository.setNoReadAndBuyerByRoomId(roomId, noReadBuyer, isNoRead);
    }

    @Transactional
    public void setEvaluateBuyerByRoomId(Long roomId, Integer evaluateBuyer) {
        chatRoomRepository.setEvaluateBuyerByRoomId(roomId, evaluateBuyer);
    }

    @Transactional
    public void setEvaluateSellerByRoomId(Long roomId, Integer evaluateSeller) {
        chatRoomRepository.setEvaluateSellerByRoomId(roomId, evaluateSeller);
    }

    @Transactional
    public void setExitBuyerByRoomId(Long roomId, boolean isExitBuyer) {
        chatRoomRepository.setExitBuyerByRoomId(roomId, isExitBuyer);
    }

    @Transactional
    public void setExitSellerByRoomId(Long roomId, boolean isExitSeller) {
        chatRoomRepository.setExitSellerByRoomId(roomId, isExitSeller);
    }


}

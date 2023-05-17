/*
 * title : ChatDTO
 * 설명 : 채팅 관련 요청을 위한 DTO.
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.dto;

import com.example.panda.entity.ChatEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {

    private Long roomId;
    private String content;
    private boolean isFromBuyer;
    private Date chatDate;
    private byte[] photo;

    public static ChatDTO toChatDTO(ChatEntity chatEntity) {
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setRoomId(chatEntity.getRoomId());
        chatDTO.setContent(chatEntity.getContent());
        chatDTO.setFromBuyer(chatEntity.getIsFromBuyer());
        chatDTO.setChatDate(chatEntity.getChatDate());
        chatDTO.setPhoto(chatEntity.getPhoto());

        return chatDTO;
    }
}

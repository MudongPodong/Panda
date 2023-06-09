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
import java.util.Base64;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {

    private Long roomId;
    private String content;
    private boolean isFromBuyer;
    private Date chatDate;
    private String photo = null;
    private int index;
    // 웹 소켓 용도, DB와 관련 X
    private int count;
    // 웹 소켓 용도, DB와 관련 X
    private String type;
    // 웹 소켓 용도, DB와 관련 X

    public static ChatDTO toChatDTO(ChatEntity chatEntity) {
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setRoomId(chatEntity.getRoomId());
        chatDTO.setContent(chatEntity.getContent());
        chatDTO.setFromBuyer(chatEntity.getIsFromBuyer());
        chatDTO.setChatDate(chatEntity.getChatDate());
        if(chatEntity.getPhoto() != null) {
            chatDTO.setPhoto(new String(chatEntity.getPhoto()));
        }
        return chatDTO;
    }
}

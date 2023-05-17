/*
 * title : ChatEntity
 * 설명 : 채팅 DB의 Document에 맞는 ChatEntity 클래스.
 *        MongoDB에 알맞은 형식
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.entity;
import com.example.panda.dto.ChatDTO;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Document(collection = "Chat")
public class ChatEntity {

    private Long roomId;
    private Boolean isFromBuyer;
    private String content;
    private Date chatDate;
    private byte[] photo;

    public static ChatEntity toSaveEntity(ChatDTO chatDTO) {
        ChatEntity chatEntity = new ChatEntity();
        chatEntity.setRoomId(chatDTO.getRoomId());
        chatEntity.setContent(chatDTO.getContent());
        chatEntity.setIsFromBuyer(chatDTO.isFromBuyer());
        chatEntity.setChatDate(chatDTO.getChatDate());
        chatEntity.setPhoto(chatDTO.getPhoto());

        return chatEntity;
    }
}

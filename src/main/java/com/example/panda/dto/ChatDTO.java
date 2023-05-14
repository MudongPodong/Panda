package com.example.panda.dto;

import com.example.panda.entity.ChatEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {
    private Long messageId; // 주키
    private ChatRoomDTO room; // 외래값
    private boolean isFromBuyer; // 최초 보낸 사람이 보낸 메시지인지 판별
    private String content;
    private LocalDateTime chatDate;
    private byte[] photo;

    public static ChatDTO toChatDTO(ChatEntity chatEntity, ChatRoomDTO room) {
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setMessageId(chatEntity.getChat_id());
        chatDTO.setRoom(room);
        chatDTO.setContent(chatEntity.getContent());
        chatDTO.setFromBuyer(chatEntity.getIs_from_buyer());
        chatDTO.setChatDate(chatEntity.getChat_date());
        chatDTO.setPhoto(chatEntity.getPhoto());

        return chatDTO;
    }
}

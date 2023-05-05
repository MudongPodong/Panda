package com.example.panda.dto;

import com.example.panda.entity.ChatEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {
    private int messageId; // 주키
    private int roomId; // 외래값
    private boolean isFromSender; // 최초 보낸 사람이 보낸 메시지인지 판별
    private String content;
    private LocalDateTime lastDate;

    public static ChatDTO toChatDTO(ChatEntity chatEntity, int roomId) {
        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setMessageId(chatEntity.getChat_id());
        chatDTO.setRoomId(roomId);
        chatDTO.setContent(chatEntity.getContent());
        chatDTO.setFromSender(chatEntity.getIs_from_sender());
        chatDTO.setLastDate(chatEntity.getChat_date());

        return chatDTO;
    }
}

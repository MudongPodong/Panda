package com.example.panda.dto;

import com.example.panda.entity.ChatRoomEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDTO {
    private int roomId; // 주키
    private String senderId; // 최초 보낸 사람 (외래키)
    private String receiverId;  // 최초 받은 사람 (외래키)
    private String lastContent; // 마지막 메시지
    private Date lastDate;


    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity, String senderId, String receiverId) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setSenderId(senderId);
        chatRoomDTO.setReceiverId(receiverId);
        chatRoomDTO.setLastDate(chatRoomEntity.getLast_date());

        return chatRoomDTO;
    }

    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setLastDate(chatRoomEntity.getLast_date());

        if(chatRoomEntity.getSender_id() != null)
            chatRoomDTO.setSenderId(chatRoomEntity.getSender_id().getUid());

        if(chatRoomEntity.getReceiver_id() != null)
            chatRoomDTO.setReceiverId(chatRoomEntity.getReceiver_id().getUid());

        return chatRoomDTO;
    }

}

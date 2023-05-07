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
    private UserDTO sender; // 최초 보낸 사람 (외래키)
    private UserDTO receiver;  // 최초 받은 사람 (외래키)
    private String lastContent; // 마지막 메시지
    private Date lastDate;


    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity, UserDTO sender, UserDTO receiver) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setSender(sender);
        chatRoomDTO.setReceiver(receiver);
        chatRoomDTO.setLastDate(chatRoomEntity.getLast_date());

        return chatRoomDTO;
    }

    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setLastDate(chatRoomEntity.getLast_date());

        if(chatRoomEntity.getSender_id() != null)
            chatRoomDTO.setSender(UserDTO.toUserDTO(chatRoomEntity.getSender_id()));

        if(chatRoomEntity.getReceiver_id() != null)
            chatRoomDTO.setReceiver(UserDTO.toUserDTO(chatRoomEntity.getReceiver_id()));

        return chatRoomDTO;
    }

}

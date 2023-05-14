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
    private Long roomId; // 주키
    private UserDTO buyer; // 최초 보낸 사람 (외래키)
    private UserDTO seller;  // 최초 받은 사람 (외래키)
    private String lastContent; // 마지막 메시지
    private LocalDateTime lastDate;


    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity, UserDTO buyer, UserDTO seller) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setBuyer(buyer);
        chatRoomDTO.setSeller(seller);
        chatRoomDTO.setLastDate(chatRoomEntity.getLast_date());

        return chatRoomDTO;
    }

    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setLastDate(chatRoomEntity.getLast_date());

        if(chatRoomEntity.getBuyer_id() != null)
            chatRoomDTO.setBuyer(UserDTO.toUserDTO(chatRoomEntity.getBuyer_id()));

        if(chatRoomEntity.getSeller_id() != null)
            chatRoomDTO.setSeller(UserDTO.toUserDTO(chatRoomEntity.getSeller_id()));

        return chatRoomDTO;
    }

}

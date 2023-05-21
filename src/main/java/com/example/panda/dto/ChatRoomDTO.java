/*
 * title : ChatRoomDTO
 * 설명 : 채팅방 관련 요청을 위한 DTO.
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.dto;

import com.example.panda.entity.ChatRoomEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDTO {

    private Long roomId; // 주키
    private UserDTO buyer; // 최초 보낸 사람 (구매자)
    private UserDTO seller;  // 최초 받은 사람 (판매자)
    private String lastContent; // 마지막 메시지의 내용
    private Date lastDate; // 마지막 메시지의 날짜
    private boolean isNoRead;
    private boolean noReadBuyer; // buyer가 안읽은건지 (안읽은 사람의 채팅 목록에 표시하기 위함)

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
        chatRoomDTO.setNoReadBuyer(chatRoomEntity.isNo_read_buyer());
        chatRoomDTO.setNoRead(chatRoomEntity.is_no_read());

        if(chatRoomEntity.getBuyer() != null)
            chatRoomDTO.setBuyer(UserDTO.toUserDTO(chatRoomEntity.getBuyer()));

        if(chatRoomEntity.getSeller() != null)
            chatRoomDTO.setSeller(UserDTO.toUserDTO(chatRoomEntity.getSeller()));

        return chatRoomDTO;
    }

}

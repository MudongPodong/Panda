package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRoomDTO {
    private int roomId; // 주키
    private String senderId; // 최초 보낸 사람 (외래키)
    private String receiverId;  // 최초 받은 사람 (외래키)
    private String lastContent; // 마지막 메시지
    private Date date;
}

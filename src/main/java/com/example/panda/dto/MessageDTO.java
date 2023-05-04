package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private int messageId; // 주키
    private int roomId; // 외래값
    private boolean isFromSender; // 최초 보낸 사람이 보낸 메시지인지 판별
    private String content;
    private Date date;
}

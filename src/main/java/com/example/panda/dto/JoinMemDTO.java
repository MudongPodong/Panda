package com.example.panda.dto;

import com.example.panda.entity.ChatEntity;
import com.example.panda.entity.JoinMemEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinMemDTO {
    private String email; // 이메일
    private String pw; // 비밀번호
    private String nickName; // 닉네임
    private String phone; // 전화번호
    private String addr; // 주소

    public static JoinMemDTO toJoinMemDTO(JoinMemEntity joinMemEntity) {
        JoinMemDTO joinMemDTO = new JoinMemDTO();

        joinMemDTO.setEmail(joinMemEntity.getUser_email());
        joinMemDTO.setPw(joinMemEntity.getUser_pw());
        joinMemDTO.setNickName(joinMemEntity.getUser_nick_name());
        joinMemDTO.setPhone(joinMemEntity.getUser_phone());
        joinMemDTO.setAddr(joinMemEntity.getUser_addr());

        return joinMemDTO;
    }
}

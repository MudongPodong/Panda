package com.example.panda.dto;

import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinMemDTO {
    private String email; // 이메일
    private String pw; // 비밀번호
    private String nickName; // 닉네임
    private String phone; // 전화번호
    private String addr; // 주소

    public static JoinMemDTO toJoinMemDTO(UserEntity joinMemEntity) {
        JoinMemDTO joinMemDTO = new JoinMemDTO();

        joinMemDTO.setEmail(joinMemEntity.getEmail());
        joinMemDTO.setPw(joinMemEntity.getPassword());
        joinMemDTO.setNickName(joinMemEntity.getNickname());
        joinMemDTO.setPhone(joinMemEntity.getPhoneNumber());
        joinMemDTO.setAddr(joinMemEntity.getAddress());

        return joinMemDTO;
    }
}

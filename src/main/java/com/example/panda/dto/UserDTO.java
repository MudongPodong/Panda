package com.example.panda.dto;

import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String email;
    private String password;
    private String phoneNumber;
    private String nickname;
    private String address;
    private int point;
    private byte[] userImg;


    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setPassword(userEntity.getPassword());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setNickname(userEntity.getNickname());
        userDTO.setAddress(userEntity.getAddress());
        userDTO.setPoint(userEntity.getPoint());
        userDTO.setPhoneNumber(userEntity.getPhoneNumber());
        userDTO.setUserImg(userEntity.getUserImg());

        return userDTO;
    }

}

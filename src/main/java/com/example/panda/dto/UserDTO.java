package com.example.panda.dto;

import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userId;
    private String password;
    private String phoneNumber;
    private String email;
    private String nickname;
    private String address;
    private int point;
    private byte[] photo;


    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(userEntity.getUid());
        userDTO.setPassword(userEntity.getPassword());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setNickname(userEntity.getNickname());
        userDTO.setAddress(userEntity.getAddress());
        userDTO.setPoint(userEntity.getPoint());
        userDTO.setPhoneNumber(userEntity.getPhone_number());
        if (userEntity.getPhoto() != null)
            userDTO.setPhoto(userEntity.getPhoto());

        return userDTO;
    }

}

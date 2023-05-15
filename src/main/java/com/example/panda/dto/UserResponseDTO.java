package com.example.panda.dto;

import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDTO {
    private String email;
    private String phoneNum;

    public static UserResponseDTO of(UserEntity user){
        return UserResponseDTO.builder()
                .email(user.getEmail())
                .phoneNum(user.getPhoneNumber())
                .build();
    }
}

package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {
    private String email;
    private String exPassword;
    private String newPassword;
}

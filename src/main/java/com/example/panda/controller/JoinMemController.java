package com.example.panda.controller;

import com.example.panda.entity.UserEntity;
import com.example.panda.service.JoinMemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class JoinMemController {
    private final JoinMemService joinMemService;

    @PostMapping("/api/join_mem")
    public boolean joinMem(@RequestParam("email")String email, @RequestParam("password")String pw, @RequestParam("nickname")String nickname,
                                    @RequestParam("Phone_number")String phone, @RequestParam("address")String addr) {
        boolean isExist = joinMemService.existByUserEmailAndPhone(email, phone);
        if(isExist){
            return false;
        }
        joinMemService.save(UserEntity.builder()
                .email(email)
                .password(pw)
                .nickname(nickname)
                .phoneNumber(phone)
                .address(addr)
                .build());
        return true;
    }
}

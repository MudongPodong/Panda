package com.example.panda.controller;

import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.service.JoinMemService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pages/joinMemPage")
public class JoinMemController {
    private final JoinMemService joinMemService;
    private final UserRepository userRepository;

//    @PostMapping("/api/join_mem")
//    public boolean joinMem(UserEntity user) {
//        boolean isExist = joinMemService.existByUserEmailAndPhone(user.getEmail(), user.getPhoneNumber());
//        if(isExist){
//            return false;
//        }
//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//
//        return true;
//    }

    @PostMapping("/api/join_mem")
    public boolean joinMem(@RequestParam("email")String email, @RequestParam("password")String pw, @RequestParam("nickname")String nickname,
                                    @RequestParam("Phone_number")String phone, @RequestParam("address")String addr) {
        boolean isExist = joinMemService.existByUserEmailAndPhone(email, phone);
        if(isExist){
            return false;
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encPw = bCryptPasswordEncoder.encode(pw);
        joinMemService.save(UserEntity.builder()
                .email(email)
                .password(encPw)
                .nickname(nickname)
                .phoneNumber(phone)
                .address(addr)
                .build());
        return true;
    }
}

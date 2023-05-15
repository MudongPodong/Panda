package com.example.panda.controller;

import com.example.panda.dto.TokenDTO;
import com.example.panda.dto.UserRequestDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.service.SignService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pages/joinMemPage")
public class SignController {
    private final SignService signService;
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
    public ResponseEntity<UserResponseDTO> signup(@RequestBody UserRequestDTO requestDTO) {
        return ResponseEntity.ok(signService.joinMem(requestDTO));
    }

    @PostMapping("/api/login")
    public ResponseEntity<TokenDTO> login(@RequestBody UserRequestDTO requestDTO) {
        return ResponseEntity.ok(signService.login(requestDTO));
    }
}

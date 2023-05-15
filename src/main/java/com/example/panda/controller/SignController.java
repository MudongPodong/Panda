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

    @PostMapping("/sign/joinMem")
    public ResponseEntity<UserResponseDTO> joinMem(@RequestParam("email") String email,
                                                   @RequestParam("password") String pw,
                                                   @RequestParam("nickname") String nickname,
                                                   @RequestParam("phone_number") String phoneNumber,
                                                   @RequestParam("address") String addr,
                                                   @RequestParam("point") int point,
                                                   @RequestParam("user_img") byte[] userImg) {
        UserRequestDTO requestDTO = new UserRequestDTO(email, pw, nickname, phoneNumber, addr, point, userImg);
        return ResponseEntity.ok(signService.joinMem(requestDTO));
    }
//    public ResponseEntity<UserResponseDTO> joinMem(UserEntity user) {
//        UserRequestDTO requestDTO = new UserRequestDTO(user.getEmail(), user.getPassword(), user.getPhoneNumber(), user.getNickname(), user.getAddress(), user.getPoint(), user.getUserImg());
//        return ResponseEntity.ok(signService.joinMem(requestDTO));
//    }
//    public ResponseEntity<UserResponseDTO> signup(UserRequestDTO requestDTO) {
//        return ResponseEntity.ok(signService.joinMem(requestDTO));
//    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(UserRequestDTO requestDTO) {
        return ResponseEntity.ok(signService.login(requestDTO));
    }
}

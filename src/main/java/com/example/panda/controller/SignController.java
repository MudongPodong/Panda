// title : SignController
// 설명 : 회원가입 및 로그인을 컨트롤하는 컨트롤러
//      프론트에서 axios로 넘긴 FormData를 받아 UserRequestDTO 인스턴스를 생성하여 회원가입을 요청한다.
//      프론트에서 axios로 넘긴 FormData를 받아 UserRequestDTO 인스턴스를 생성하여 로그인을 요청한다.
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.controller;

import com.example.panda.dto.TokenDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.service.SignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class SignController {
    private final SignService signService;

    @PostMapping("/sign/joinMem")
    public ResponseEntity<UserResponseDTO> joinMem(@RequestBody UserDTO userDTO) {
        UserResponseDTO responseDTO = signService.joinMem((userDTO));
        if(responseDTO == null){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.ok(signService.joinMem(userDTO));
    }
    @PostMapping("/sign/login")
    public ResponseEntity<TokenDTO> login(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(signService.login(userDTO));
    }
}

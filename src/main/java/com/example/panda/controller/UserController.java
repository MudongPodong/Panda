package com.example.panda.controller;

import com.example.panda.dto.ChangePasswordDTO;
import com.example.panda.dto.UserRequestDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/?")   // 회원정보 수정 주소 넣기
public class UserController {
    private final UserService userService;

    @GetMapping("/me")  // 사용자 정보 가져오기
    public ResponseEntity<UserResponseDTO> getMyMemberInfo() {
        UserResponseDTO myInfoBySecurity = userService.getMyInfoBySecurity();
        //System.out.println(myInfoBySecurity.getNickname());
        return ResponseEntity.ok((myInfoBySecurity));
    }

    @PostMapping("/nickname")   // 닉네임 변경
    public ResponseEntity<UserResponseDTO> setMemberNickname(@RequestBody UserRequestDTO request) {
        return ResponseEntity.ok(userService.changeMemberNickname(request.getEmail(), request.getNickname()));
    }

    @PostMapping("/password")   // 비밀번호 변경
    public ResponseEntity<UserResponseDTO> setMemberPassword(@RequestBody ChangePasswordDTO request) {
        return ResponseEntity.ok(userService.changeMemberPassword(request.getEmail(), request.getExPassword(), request.getNewPassword()));
    }
}

package com.example.panda.service;

import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.security.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDTO> findAll() {
        List<UserEntity> userEntityList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for(UserEntity userEntity : userEntityList) {
            userDTOList.add(UserDTO.toUserDTO(userEntity));
        }

        return userDTOList;

    }
    public UserDTO findbyId(String id){
        Optional<UserEntity> userEntity=userRepository.findById(id);
        UserDTO userDTO=UserDTO.toUserDTO(userEntity.get());
        return userDTO;
    }

    // 사용자 정보 가져오는 함수
    public UserResponseDTO getMyInfoBySecurity() {
        return userRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(UserResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    // 닉네임 변경 함수
    @Transactional
    public UserResponseDTO changeMemberNickname(String email, String nickname) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        user.setNickname(nickname);
        return UserResponseDTO.of(userRepository.save(user));
    }

    // 비밀번호 변경 함수
    @Transactional
    public UserResponseDTO changeMemberPassword(String email, String exPassword, String newPassword) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, user.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        user.setPassword(passwordEncoder.encode((newPassword)));
        return UserResponseDTO.of(userRepository.save(user));
    }
}

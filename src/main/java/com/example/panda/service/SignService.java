package com.example.panda.service;

import com.example.panda.dto.TokenDTO;
import com.example.panda.dto.UserRequestDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.jwt.TokenProvider;
import com.example.panda.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SignService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserResponseDTO joinMem(UserRequestDTO requestDTO) {
        if (userRepository.existsByEmailAndPhoneNumber(requestDTO.getEmail(), requestDTO.getPhoneNumber())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        UserEntity user = requestDTO.toUser(passwordEncoder);
        return UserResponseDTO.of(userRepository.save(user));
    }

    public TokenDTO login(UserRequestDTO requestDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDTO.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }
//    public boolean existByUserEmailAndPhone(String userEmail, String userPhone) {
//        boolean isExist = joinMemRepository.existsByEmailAndPhoneNumber(userEmail, userPhone);
//
//        return isExist;
//    }
//    @Transactional
//    public void save(UserEntity joinMemEntity) {
//        joinMemRepository.save(joinMemEntity);
//    }
}

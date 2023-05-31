// title : SignService
// 설명 : 회원가입 및 로그인에 사용할 service
//      회원가입을 하는 joinMem()
//      로그인을 하는 login()
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.service;

import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.UserSaveRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SignService {
//    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final UserSaveRepository userSaveRepository;
    private final PasswordEncoder passwordEncoder;
//    private final TokenProvider tokenProvider;

    public UserResponseDTO joinMem(UserDTO userDTO) {
        // UserDTO를 통해 사용자 정보를 받아 이미 회원가입 되어있는 사용자인지 확인 후 아니라면 DB에 사용자를 저장한다.
        if (userRepository.existsByEmailAndPhoneNumber(userDTO.getEmail(), userDTO.getPhoneNumber())) {
            //throw new RuntimeException("이미 가입되어 있는 유저입니다");
            return null;
        }
        UserEntity user = userDTO.toUser(passwordEncoder);  // 비밀번호는 인코딩을 하여 UserEntitiy를 생성하도록 한다.
        return UserResponseDTO.of(userSaveRepository.save(user));
    }

    @Transactional
//    public TokenDTO login(UserDTO userDTO){
//        // 1. Login ID/PW를 기반으로 AuthenticationToken 생성
//        UsernamePasswordAuthenticationToken authenticationToken = userDTO.toAuthentication();
//
//        // 2. 실제로 검증(사용자 비밀번호 체크)이 이루어지는 부분
//        // authenticate(authenticationToken) method 실행 시 CustomUserDetailService - loadUserByUsername method가 실행됨
//        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
//
//        // 3. 인증 정보를 기반으로 JWT 토큰 생성
//        TokenDTO tokenDTO = tokenProvider.generateTokenDto(authentication);
//
//        // 4 .RefreshToken 저장
////        RefreshToken refreshToken = RefreshToken.builder()
////                .key(authentication.getName())
////                .value(tokenDto.getRefreshToken())
////                .build();
////
////        refreshTokenRepository.save(refreshToken);
//
//        // 5. 토큰 발급
//        return tokenDTO;
//    }

    public boolean isAuthenticated(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || AnonymousAuthenticationToken.class.
                isAssignableFrom(authentication.getClass())) {
            return false;
        }
        if(authentication.isAuthenticated()){
            log.info("true");
            return true;
        }
        else {
            log.info("false");
            return false;
        }
//        return authentication.isAuthenticated();
    }
}

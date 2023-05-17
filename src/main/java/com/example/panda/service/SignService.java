// title : SignService
// 설명 : 회원가입 및 로그인에 사용할 service
//      회원가입을 하는 joinMem()
//      로그인을 하는 login()
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.service;

import com.example.panda.dto.TokenDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.entity.Authority;
import com.example.panda.entity.UserEntity;
import com.example.panda.jwt.TokenProvider;
import com.example.panda.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SignService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserResponseDTO joinMem(UserDTO userDTO) {
        // UserDTO를 통해 사용자 정보를 받아 이미 회원가입 되어있는 사용자인지 확인 후 아니라면 DB에 사용자를 저장한다.
        if (userRepository.existsByEmailAndPhoneNumber(userDTO.getEmail(), userDTO.getPhoneNumber())) {
            //throw new RuntimeException("이미 가입되어 있는 유저입니다");
            return null;
        }

        UserEntity user = userDTO.toUser(passwordEncoder);  // 비밀번호는 인코딩을 하여 UserEntitiy를 생성하도록 한다.
        return UserResponseDTO.of(userRepository.save(user));
    }

    public TokenDTO login(UserDTO userDTO) {
        log.info("login signService start");
        log.info("login set role and pw encoding");
        userDTO.setAuthority(Authority.ROLE_USER);
        //userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        log.info("create authenticationToken");
        // toAuthentication()을 통해 UsernamePasswordAuthenticatonToken 인스턴스 생성
        UsernamePasswordAuthenticationToken authenticationToken = userDTO.toAuthentication();
        log.info("create authentication");
        // AuthenticationManagerBuilder를 이용해 AuthenticationManager를 구현한 ProviderManager를 생성
        // ProviderManager는 데이터를 AbstractUserDetailsAuthenticationProvider 의 자식 클래스인 DaoAuthenticationProvider 를 주입받아서 호출
        // DaoAuthenticationProvider 내부에 있는 authenticate에서 retrieveUser을 통해 DB에서의 User의 비밀번호가 실제 비밀번호가 맞는지 비교
        //retrieveUser에서는 DB에서의 User를 꺼내기 위해, CustomUserDetailService에 있는 loadUserByUsername을 가져와 사용
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        //log.debug("authentication", authentication);
        // 토큰 생성하여 반환
        log.info("login signService return");
        return tokenProvider.generateTokenDto(authentication);
    }
}

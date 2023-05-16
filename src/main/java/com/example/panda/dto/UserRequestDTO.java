// title : UserRequestDTO
// 설명 : 사용자 정보에 대한 요청에 사용할 DTO
//      회원가입, 로그인 등에 사용
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.dto;

import com.example.panda.entity.Authority;
import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestDTO {
    private String email;
    private String password;
    private String phoneNumber;
    private String nickname;
    private String address;
    private int point;
    private byte[] photo;

    public UserEntity toUser(PasswordEncoder passwordEncoder){
        return UserEntity.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .phoneNumber(phoneNumber)
                .address(address)
                .point(point)
                .userImg(photo)
                .authority(Authority.ROLE_USER)
                .build();
    }
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}

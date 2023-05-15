package com.example.panda.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDTO { // 토큰의 값을 헤더에서 뽑거나 삽입할때 쓰는 dto
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;
}

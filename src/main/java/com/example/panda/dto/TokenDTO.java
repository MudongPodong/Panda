// title : TokenDTO
// 설명 : 토큰의 값을 헤더에서 뽑거나 삽입할때 쓰는 DTO
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
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

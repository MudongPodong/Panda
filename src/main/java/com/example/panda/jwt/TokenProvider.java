// title : TokenProvider
// 설명 : 토큰을 생성하고 검증하는 클래스
//      application.properties에 설정한 시크릿 키를 디코드하여 의존성이 주입된 key값으로 설정
//      토큰 생성하는 generateTokenDto()
//      토큰 인증을 꺼내는 getAuthentication()
//      토큰 검증을 하는 validateToken()
//      토큰을 claims형태로 만드는 parseClaims()
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.jwt;

import com.example.panda.dto.TokenDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    private final Key key;

    public TokenProvider(@Value("${jwt.secret-key}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        // 시크릿 키를 디코드하여 의존성이 주입된 key값으로 설정
    }

    public TokenDTO generateTokenDto(Authentication authentication) {
        log.info("generateTokenDTO");
        // Authentication를 String으로 변환
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();  // 현재 시각
        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME); // 만료 시각

        // builder를 이용해 토큰 생성
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(tokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + 86400000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        // TokenDTO에 생성한 토큰 정보를 넣어 반환
        log.info("generateTokenDTO2");
        return TokenDTO.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .accessToken(refreshToken)
                //.tokenExpiresIn(tokenExpiresIn.getTime())
                .build();
    }
    public Authentication getAuthentication(String accessToken) {
        // 받은 토큰을 Claims으로 변경
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            // 권한 정보가 없는 경우 예외처리
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // GrantedAuthority를 상속받은 클래스만 사용가능한 Collection
        // GrantedAuthority를 상속한 SimpleGrantedAuthority사용하여 리스트 생성(인가 포함)
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        // 토큰에서 얻은 정보와 인가를 포함한 Collection을 이용해 시큐리티의 User인스턴스 생성
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        // User 인스턴스와 인가로 UsernamePasswordAuthenticationToken 인스턴스 생성하여 반환
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
    public boolean validateToken(String token) {
        // 토큰 검증
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    private Claims parseClaims(String accessToken) {
        // String 토큰을 Claims로 만들기
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}

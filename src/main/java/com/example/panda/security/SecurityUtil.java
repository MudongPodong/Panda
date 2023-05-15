package com.example.panda.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

// SecurityContext에 유저 정보가 저장되는 시점을 다루는 클래스
// request가 들어오면 JwtFilter의 doFilter에 저장된 인증정보를 꺼내 id반환
public class SecurityUtil {
    private SecurityUtil(){}
    public static String getCurrentMemberId(){
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        return authentication.getName();
    }
}

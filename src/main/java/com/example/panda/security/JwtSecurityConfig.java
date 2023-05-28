//// title : JwtSecurityConfig
//// 설명 : TokenProvider와 JwtFilter를 SecurityConfig에 적용할때 사용하는 클래스
////      configure() 메소드로 jwt필터를 등록한다.
//// 작성자 : 심상혁
//// 생성일 : 2023.05.16
//// 업데이트 : -
//package com.example.panda.security;
//
//import com.example.panda.jwt.JwtFilter;
//import com.example.panda.jwt.TokenProvider;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.DefaultSecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@RequiredArgsConstructor
//public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
//    private final TokenProvider tokenProvider;
//
//    @Override
//    public void configure(HttpSecurity http){
//        // TokenProvider로 JwtFilter를 통해 SecurityConfig안에 필터 등록.
//        JwtFilter customFilter = new JwtFilter(tokenProvider);
//        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
//    }
//}

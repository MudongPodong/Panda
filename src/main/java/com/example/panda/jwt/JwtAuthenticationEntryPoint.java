//// title : JwtAuthenticationEntryPoint
//// 설명 : 유효한 자격 증명없이 접근할때 exception을 throw하는 클래스
////      401에러 발생시킨다.
//// 작성자 : 심상혁
//// 생성일 : 2023.05.16
//// 업데이트 : -
//package com.example.panda.jwt;
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//@Component
//public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
//    @Override
//    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//        // 유효한 자격 증명 없이 접근 시 401에러
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//    }
//}

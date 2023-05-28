//// title : JwtFilter
//// 설명 : jwt 필터클래스
////      request header에서 토큰 정보를 꺼내오는 resolveToken()
////      필터링을 하는 doFilterInternal()
////      resolveToken()으로 토큰 정보를 꺼내 TokenProvider의 validateToken()으로 토큰 유효성 검사
////      유효한 경우 스프링 시큐리티의 Authentication을 가져와 SecurityContext에 저장
////      SecurityContext에 허가되지 않은 uri의 요청은 모두 필터를 거치며 토큰 정보가 없거나 유효하지 않으면 정상실행되지 않는다.
//// 작성자 : 심상혁
//// 생성일 : 2023.05.16
//// 업데이트 : -
//package com.example.panda.jwt;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@RequiredArgsConstructor
//public class JwtFilter extends OncePerRequestFilter {
//    public static final String AUTHORIZATION_HEADER = "Authorization";
//    public static final String BEARER_PREFIX = "Bearer ";
//    private final TokenProvider tokenProvider;
//
//    private String resolveToken(HttpServletRequest request) {
//        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
//        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
//            return bearerToken.substring(7);
//        }
//        return null;
//    }
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String jwt = resolveToken(request);
//
//        if (jwt != null && tokenProvider.validateToken(jwt)) {
//            Authentication authentication = tokenProvider.getAuthentication(jwt);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}

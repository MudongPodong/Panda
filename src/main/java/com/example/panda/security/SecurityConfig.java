// title : SecurityConfig
// 설명 : 스프링 시큐리티 사용을 위한 filterChain
//      비밀번호 암호화를 위한 passwordEncoder()
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.security;
//import com.example.panda.jwt.JwtAccessDeniedHandler;
//import com.example.panda.jwt.JwtAuthenticationEntryPoint;
//import com.example.panda.jwt.JwtFilter;
//import com.example.panda.jwt.TokenProvider;
import com.example.panda.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@Component
@RequiredArgsConstructor
public class SecurityConfig {

//    private final TokenProvider tokenProvider;
//    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
//    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // 비밀번호 함호화를 위한 BCryptPasswordEncoder 빈
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .httpBasic().disable()  // https만 사용
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()   // 로컬스토리지에 토큰저장할거라 csrf를 disable
                //.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // REST api사용해 세션없이 토큰 주고받으며 데이터 주고받도록 세션 stateless
                //.and()
                //.exceptionHandling()    // 예외 처리
                //.authenticationEntryPoint(jwtAuthenticationEntryPoint)
                //.accessDeniedHandler(jwtAccessDeniedHandler)
                //.and()
                .authorizeHttpRequests((authz) -> authz
                        //.requestMatchers("/", "http://localhost:3000/**", "http://localhost:3000/pages/**", "http://localhost:3000/sign/**", "http://localhost:3000/api/**", "http://localhost:3000/chat/**").permitAll() // /pages/, sign를 제외한 모든 uri의 request는 토큰 필요
                        .requestMatchers("/chat/**", "/login", "/check","http://localhost:3000/**", "http://localhost:3000/", "http://localhost:3000/pages/loginPage", "http://localhost:3000/pages/joinMemPage", "/sign/joinMem", "/sign/**", "/login/**").permitAll() // /pages/, sign를 제외한 모든 uri의 request는 토큰 필요
                        //.requestMatchers("http://localhost:3000/pages/joinMemPage").hasAuthority("USER")
                        .anyRequest().authenticated());
        //http.apply(new JwtSecurityConfig(tokenProvider));   // JwtSecurityConfig로 tokenProvider 적용
        http.formLogin().loginPage("http://localhost:3000/pages/loginPage").usernameParameter("email").passwordParameter("password");
        http.formLogin().loginProcessingUrl("/login").defaultSuccessUrl("http://localhost:3000/",true);
        http.logout().logoutSuccessUrl("http://localhost:3000/").deleteCookies("JSESSIONID");
        http.userDetailsService(userDetailsService);
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
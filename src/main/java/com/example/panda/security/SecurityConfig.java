package com.example.panda.security;
import com.example.panda.jwt.JwtAccessDeniedHandler;
import com.example.panda.jwt.JwtAuthenticationEntryPoint;
import com.example.panda.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@Component
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        // 비밀번호 함호화를 위한 BCryptPasswordEncoder 빈
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain springSecurity(HttpSecurity http) throws Exception{
        http
                .httpBasic().disable()  // https만 사용
                .csrf().disable()   // 로컬스토리지에 토큰저장할거라 csrf를 disable
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // REST api사용해 세션없이 토큰 주고받으며 데이터 주고받도록 세션 stateless
                .and()
                .exceptionHandling()    // 예외 처리
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/pages/**", "/sign/**").permitAll() // /pages/, sign를 제외한 모든 uri의 request는 토큰 필요
                        .anyRequest().authenticated());
        http
                .formLogin()
                .loginPage("/pages/loginPage")
                .usernameParameter("email")
                .permitAll()
                .loginProcessingUrl("/api/login")
                .defaultSuccessUrl("/")
                .failureUrl("/pages/loginPage")
                //failureHandler(authenticationFailureHandler())
                .and()
                .logout()
                .logoutUrl("/")
                .deleteCookies("JSESSIONID")
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));   // JwtSecurityConfig로 tokenProvider 적용
        //.logoutSuccesshandler(logoutSuccessHandler());
        return http.build();
    }
}
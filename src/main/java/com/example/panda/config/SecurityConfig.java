package com.example.panda.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebSecurity
@EnableWebMvc
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain springSecurity(HttpSecurity http) throws Exception{
        http
                .csrf().disable()
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/api/**").hasRole("USER")
                        .anyRequest().authenticated());
        //.requestMatchers(new AntPathRequestMatcher("/api/**"))
        //.permitAll()
        //.anyRequest()
        //.authenticated()
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
                .deleteCookies("JSESSIONID");
        //.logoutSuccesshandler(logoutSuccessHandler());
        return http.build();
    }
}
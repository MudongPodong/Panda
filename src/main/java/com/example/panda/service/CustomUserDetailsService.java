package com.example.panda.service;

import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if(email == null || email.equals("")) {
            throw new UsernameNotFoundException(email);
        }
        return userRepository.findByEmail(email).map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(email + "을 찾을 수 없습니다."));
    }

    private  UserDetails createUserDetails(UserEntity user){
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(user.getAuthority().toString());
        return new User(String.valueOf(user.getEmail()), user.getPassword(), Collections.singleton(grantedAuthority));
    }
}

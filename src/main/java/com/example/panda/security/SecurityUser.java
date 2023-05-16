// title : SecurityUser
// 설명 :
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.security;

import com.example.panda.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
public class SecurityUser implements UserDetails {
    private static final long serialVersionUID = 1L;

    private UserEntity user;

    //일반로그인
    public SecurityUser(UserEntity user) {
        this.user = user;
    }

    //해당 User의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {
                return "ROLE_USER";
            }
        });
        return collect;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        //계정이 만료되었는가?
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        //계정이 잠금상태인가?
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        //계정 비밀번호가 몇일이 지났나?
        return true;
    }

    @Override
    public boolean isEnabled() {
        //계정이 활성화 되있나??
        return true;
    }
}

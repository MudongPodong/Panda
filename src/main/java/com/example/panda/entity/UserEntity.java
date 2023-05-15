package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "User")
@NoArgsConstructor
@Builder
public class UserEntity {
    @Id
    @Column(nullable = false, unique = true, length=50)
    private String email;

    @Column(nullable = false, length = 32)
    private String password;

    @Column(nullable = false, unique = true, length = 15, name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false, length = 32)
    private String nickname;

    @Column(nullable = false, length = 128)
    private String address;

    @Column
    @Builder.Default
    private int point = 0;

    @Column(name = "user_img")
    @Lob
    @Builder.Default
    private byte[] userImg = null;

    @Builder
    public UserEntity(String email, String password, String phoneNumber, String nickname, String address, int point, byte[] userImg){
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.nickname = nickname;
        this.address = address;
        this.point = point;
        this.userImg = userImg;
    }
}

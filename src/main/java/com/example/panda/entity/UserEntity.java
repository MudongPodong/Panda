package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "User")
public class UserEntity {
    @Id
    private String uid;

    @Column(length = 16)
    private String password;

    @Column(length = 32)
    private String phone_number;

    @Column(length = 64)
    private String email;

    @Column(length = 32)
    private String nickname;

    @Column(length = 128)
    private String address;

    @Column
    private int point;

    @OneToOne
    @JoinColumn(name = "pid")
    private PhotoEntity user_photo;
}

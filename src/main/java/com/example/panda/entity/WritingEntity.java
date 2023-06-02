package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Writing")
public class WritingEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wid;
    @Column(length = 64)
    private String writing_name;
    @Lob
    private String writing_photo;
//    private byte[] writing_photo;
    @Column(length = 32)
    private String category;
    @Column(length = 32)
    private String detail_category;
    @Column
    private int count;
    @Column
    private int price;
    @Column
    private LocalDateTime regit_date;

    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity;
    @Column
    private int favorite_count;
    @Column(length = 1024)
    private String content;
}

package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

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
    private byte[] writing_photo;
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
}

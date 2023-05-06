package com.example.panda.entity;

import com.example.panda.dto.PhotoDTO;
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
    @OneToOne
    @JoinColumn(name="writing_photo")
    private PhotoEntity writing_photo;
    @Column(length = 1024)
    private String writing_content;
    @Column(length = 32)
    private String category;
    @Column(length = 32)
    private String detail_category;
    @Column
    private Boolean is_sold;
    @Column
    private int count;
    @Column
    private Boolean is_auction;
    @Column
    private int price;
    @Column
    private LocalDateTime regit_date;
}

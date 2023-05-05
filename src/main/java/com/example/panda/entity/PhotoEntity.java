package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Photo")
public class PhotoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int pid;

    @Lob
    private byte[] pdata;

    
}

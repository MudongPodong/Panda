package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "Chat_room")
public class ChatRoomEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long room_id;

    @ManyToOne
    @JoinColumn(name="buyer")
    private UserEntity buyer;

    @ManyToOne
    @JoinColumn(name="seller")
    private UserEntity seller;

    @Column (length = 1024)
    private String last_content;

    @Column
    private LocalDateTime last_date;

}

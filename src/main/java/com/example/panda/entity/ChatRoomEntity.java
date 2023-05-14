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
    @JoinColumn(name="buyer_id")
    private UserEntity buyer_id;

    @ManyToOne
    @JoinColumn(name="seller_id")
    private UserEntity seller_id;

    @Column (length = 1024)
    private String last_content;

    @Column
    private LocalDateTime last_date;

}

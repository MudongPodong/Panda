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
    private int room_id;

    @ManyToOne
    @JoinColumn(name="sender_id")
    private UserEntity sender_id;

    @ManyToOne
    @JoinColumn(name="receiver_id")
    private UserEntity receiver_id;

    @Column (length = 1024)
    private String last_content;

    @Column
    private Date last_date;

}

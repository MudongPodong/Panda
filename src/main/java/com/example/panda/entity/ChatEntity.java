package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Chat")
public class ChatEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chat_id;

    @ManyToOne
    @JoinColumn(name="room_id")
    private ChatRoomEntity room_id;

    @Column
    private Boolean is_from_sender;

    @Column(length = 1024)
    private String content;

    @CreationTimestamp
    @Column
    private LocalDateTime chat_date;

//    @CreationTimestamp
//    @Column(updatable = false)
//    private LocalDateTime createdTime;
//
//    @UpdateTimestamp
//    @Column(insertable = false)
//    private LocalDateTime updatedTime;

}

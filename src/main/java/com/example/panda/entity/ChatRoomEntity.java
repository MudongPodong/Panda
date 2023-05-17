/*
 * title : ChatRoomEntity
 * 설명 : 채팅방 DB의 Table에 맞는 ChatRoomEntity 클래스.
 *        MySQL에 알맞은 형식
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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

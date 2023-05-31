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
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "Chat_room")
public class ChatRoomEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long room_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="buyer")
    private UserEntity buyer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="seller")
    private UserEntity seller;

    @Column (length = 1024)
    private String last_content;

    @Column
    private Date last_date;

    @Column
    private boolean is_no_read; // 안읽었는지?

    @Column
    private boolean no_read_buyer; // buyer가 안읽었는지?

    @OneToOne
    @JoinColumn(name="wid")
    private WritingEntity writing;

    @Column
    private Integer evaluate_buyer;

    @Column
    private Integer evaluate_seller;

    @Column
    private boolean is_exit_buyer;

    @Column
    private boolean is_exit_seller;
}

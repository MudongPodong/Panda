package com.example.panda.repository;


import com.example.panda.entity.ChatRoomEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.panda.entity.QChatRoomEntity.chatRoomEntity;

@Repository
@Slf4j
@RequiredArgsConstructor
public class ChatRoomDSLRepository {
    private final JPAQueryFactory queryFactory;

    public List<ChatRoomEntity> findByUserEmail(String email) {
        return queryFactory
                .selectFrom(chatRoomEntity)
                .where(chatRoomEntity.buyer.email.eq(email)
                        .or(chatRoomEntity.seller.email.eq(email)))
                .orderBy(chatRoomEntity.last_date.desc())
                .fetch();
    }
}

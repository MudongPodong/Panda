package com.example.panda.repository;

import com.example.panda.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Integer> {
    @Query(value = "SELECT * FROM (" +
            "SELECT * FROM Chat_room WHERE sender_id = :id " +
            "UNION " +
            "SELECT * FROM Chat_room WHERE receiver_id = :id " +
            ") AS combined " +
            "ORDER BY last_date DESC", nativeQuery = true)
    List<ChatRoomEntity> findByUserId(String id);

}

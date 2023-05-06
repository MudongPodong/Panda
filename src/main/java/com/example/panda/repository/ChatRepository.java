package com.example.panda.repository;

import com.example.panda.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<ChatEntity, Integer> {
    @Query("SELECT e FROM ChatEntity e WHERE e.room_id.room_id = :roomId")
    List<ChatEntity> findByRoomId(int roomId);

}

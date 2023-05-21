/*
 * title : ChatRoomRepository
 * 설명 : 채팅방 관련 SQL 처리를 위한 클래스
 *       JPA와 ChatRoomEntity를 이용하여 처리
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.repository;

import com.example.panda.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    @Query(value = "SELECT * FROM (" +
            "SELECT * FROM Chat_room WHERE buyer = :email " +
            "UNION " +
            "SELECT * FROM Chat_room WHERE seller = :email " +
            ") AS combined " +
            "ORDER BY last_date DESC", nativeQuery = true)
    List<ChatRoomEntity> findByUserEmail(@Param("email") String email);


    @Modifying
    @Query("UPDATE ChatRoomEntity e SET e.no_read_buyer = :noReadBuyer WHERE e.room_id = :roomId")
    void updateNoReadBuyerByRoomId(@Param("roomId") Long roomId, @Param("noReadBuyer") boolean noReadBuyer);

    @Modifying
    @Query("UPDATE ChatRoomEntity  e SET e.is_no_read = :isNoRead WHERE e.room_id = :roomId")
    void setNoReadCountByRoomId(@Param("roomId") Long roomId, @Param("isNoRead") boolean isNoRead);

    @Modifying
    @Query("UPDATE ChatRoomEntity  e SET e.no_read_buyer = :noReadBuyer, e.is_no_read = :isNoRead  WHERE e.room_id = :roomId")
    void setNoReadAndBuyerByRoomId(@Param("roomId") Long roomId, @Param("noReadBuyer") boolean noReadBuyer, @Param("isNoRead") boolean isNoRead);

}

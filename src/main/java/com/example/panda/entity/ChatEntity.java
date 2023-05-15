package com.example.panda.entity;

import com.example.panda.dto.ChatDTO;
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
    private Long chat_id;

    @ManyToOne
    @JoinColumn(name="room_id")
    private ChatRoomEntity room_id;

    @Column
    private Boolean is_from_buyer;

    @Column(length = 1024)
    private String content;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime chat_date;

    @Lob
    private byte[] photo;


    public static ChatEntity toSaveEntity(ChatDTO chatDTO, ChatRoomEntity chatRoomEntity) {
        ChatEntity chatEntity = new ChatEntity();
        chatEntity.setChat_id(chatDTO.getMessageId());
        chatEntity.setRoom_id(chatRoomEntity);
        chatEntity.setContent(chatDTO.getContent());
        chatEntity.setIs_from_buyer(chatDTO.isFromBuyer());
        chatEntity.setChat_date(chatDTO.getChatDate());
        chatEntity.setPhoto(chatDTO.getPhoto());

        return chatEntity;
    }
}

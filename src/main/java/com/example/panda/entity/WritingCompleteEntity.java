package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "Writing_complete")
public class WritingCompleteEntity {
    @Id // pk
    private int wid;
    @Column(length = 64)
    private String writing_name;
    @Column(length = 32)
    private String category;
    @Column(length = 32)
    private String detail_category;
    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity; // 글 작성자

    public static WritingCompleteEntity writingToComplete (WritingEntity writingEntity) {
        WritingCompleteEntity writingCompleteEntity = new WritingCompleteEntity();

        writingCompleteEntity.setWriting_name(writingEntity.getWriting_name());
        writingCompleteEntity.setWid(writingEntity.getWid());
        writingCompleteEntity.setCategory(writingEntity.getCategory());
        writingCompleteEntity.setDetail_category(writingEntity.getDetail_category());
        if(writingEntity.getUserEntity() != null)
            writingCompleteEntity.setUserEntity(writingEntity.getUserEntity());

        return writingCompleteEntity;
    }

}
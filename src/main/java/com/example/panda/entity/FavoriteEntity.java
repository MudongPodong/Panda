package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Favorite")
public class FavoriteEntity {
    @Id
    @Column
    private String uid;
    @OneToOne
    @PrimaryKeyJoinColumn(name="uid")
    private UserEntity userEntity;
    @OneToOne
    @JoinColumn(name="wid")
    private WritingEntity writingEntity;

}

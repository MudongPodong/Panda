package com.example.panda.entity;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.PhotoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Photo")
public class PhotoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int pid;

    @Lob
    private byte[] pdata;

    public static PhotoEntity toSaveEntity(PhotoDTO photoDTO) {

        PhotoEntity photoEntity = new PhotoEntity();
        photoEntity.setPid(photoDTO.getPhotoId());
        photoEntity.setPdata(photoDTO.getPhotoData());


        return photoEntity;
    }
    
}

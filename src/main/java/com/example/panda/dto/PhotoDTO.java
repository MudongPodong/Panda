package com.example.panda.dto;

import com.example.panda.entity.PhotoEntity;
import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhotoDTO {
    private int photoId;
    private byte[] photoData;

    public static PhotoDTO toPhotoDTO(PhotoEntity photoEntity) {
        PhotoDTO photoDTO = new PhotoDTO();

        photoDTO.setPhotoId(photoEntity.getPid());
        photoDTO.setPhotoData(photoEntity.getPdata());

        return photoDTO;
    }
}

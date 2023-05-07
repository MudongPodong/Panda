package com.example.panda.service;

import com.example.panda.dto.PhotoDTO;
import com.example.panda.entity.PhotoEntity;
import com.example.panda.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;

    public Integer save(PhotoDTO photoDTO) {
        PhotoEntity photoEntity = PhotoEntity.toSaveEntity(photoDTO);

        return photoRepository.save(photoEntity).getPid();
    }

    public PhotoDTO findById(int pid) {
        Optional<PhotoEntity> photoEntity = photoRepository.findById(pid);

        if(photoEntity.isPresent())
            return PhotoDTO.toPhotoDTO(photoEntity.get());
         else return null;
    }
}

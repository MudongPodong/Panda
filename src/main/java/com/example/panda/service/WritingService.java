package com.example.panda.service;

import com.example.panda.dto.WritingDTO;
import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.WritingDSLRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class WritingService {
//    @Autowired
    private final WritingRepository writingRepository;

    private final WritingDSLRepository writingDSLRepository;
    
    //이미지 등록 로직
    public void saveImage(MultipartFile image , WritingEntity wee) throws IOException {
        //byte[] imageData = image.getBytes();
        String imageData = image.getBytes().toString();
        wee.setWriting_photo(imageData);
        //writingRepository.save(wee);
    }
    
    public void write(WritingEntity we)
    {
        we.setFavorite_count(0);
        writingRepository.save(we);
    }
    public List<WritingDTO> findAll(){
        List<WritingEntity> writingEntityList = writingRepository.findAll();
        List<WritingDTO> writingDTOList = new ArrayList<>();

        for(WritingEntity writingEntity : writingEntityList) {
            writingDTOList.add(WritingDTO.toWritingDTO(writingEntity));
        }

        return writingDTOList;
    }
    public List<WritingDTO> findSearch(String word){
        List<WritingEntity> writingEntityList = writingDSLRepository.findSearch(word);
        List<WritingDTO> writingDTOList = new ArrayList<>();
        for(WritingEntity writingEntity : writingEntityList) {
            writingDTOList.add(WritingDTO.toWritingDTO(writingEntity));
        }
        return writingDTOList;
    }
    public WritingDTO findById(int wid){
        Optional<WritingEntity> writingEntity = writingRepository.findById(wid);
        WritingDTO writingDTO=WritingDTO.toWritingDTO(writingEntity.get());
        return writingDTO;
    }
    public List<WritingResponseDTO> findPopular(){
        List<WritingEntity> writingEntityList = writingDSLRepository.findPopularWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }
      
    
}

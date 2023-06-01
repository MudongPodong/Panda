package com.example.panda.service;

import com.example.panda.dto.WritingDTO;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class WritingService {
//    @Autowired
    private final WritingRepository writingRepository;

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
        List<WritingEntity> writingEntityList = writingRepository.findSearch(word);
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
}

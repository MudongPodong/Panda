package com.example.panda.service;

import com.example.panda.dto.WritingDTO;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.WritingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WritingService {
//    @Autowired
    private final WritingRepository writingRepository;

    public void write(WritingEntity we)
    {
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
}

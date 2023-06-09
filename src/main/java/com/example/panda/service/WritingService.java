package com.example.panda.service;

import com.example.panda.dto.WritingDTO;
import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingDSLRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.crossstore.ChangeSetPersister;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class WritingService {
//    @Autowired
    private final WritingRepository writingRepository;
    private final WritingDSLRepository writingDSLRepository;
    private final UserRepository userRepository;

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
    
    //게시글 삭제 로직 구현
    public void deletePost(Integer postId) throws ChangeSetPersister.NotFoundException {
        if(!writingRepository.existsById(postId))
        {
            throw new ChangeSetPersister.NotFoundException();
        }

        writingRepository.deleteById(postId);
    }

    public void saveWriting(String email,WritingDTO writingDTO){
        WritingEntity writingEntity=WritingEntity.toWritingEntity(writingDTO);

        Optional<UserEntity> userEntity=userRepository.findByEmail(email);
        writingEntity.setUserEntity(userEntity.get());

        writingRepository.save(writingEntity);
    }

}

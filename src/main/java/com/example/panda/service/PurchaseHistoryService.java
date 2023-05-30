package com.example.panda.service;

import com.example.panda.entity.PurchaseHistoryEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingCompleteEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.PurchaseHistoryRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingCompleteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PurchaseHistoryService {
    private final PurchaseHistoryRepository purchaseHistoryRepository;
    private final UserRepository userRepository;
    private final WritingCompleteRepository writingCompleteRepository;

    public void save(String email, int wid) {

        Optional<WritingCompleteEntity> optionalWritingCompleteEntity = writingCompleteRepository.findById(wid);
        Optional<UserEntity> optionalUserEntity = userRepository.findByEmail(email);

        if(optionalWritingCompleteEntity.isPresent() && optionalUserEntity.isPresent()) {
            WritingCompleteEntity writingCompleteEntity = optionalWritingCompleteEntity.get();
            UserEntity userEntity = optionalUserEntity.get();

            PurchaseHistoryEntity.toPurchaseHistoryEntity(userEntity, writingCompleteEntity);
        }
    }
}

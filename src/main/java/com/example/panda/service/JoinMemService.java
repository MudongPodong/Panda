package com.example.panda.service;

import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JoinMemService {
    private final UserRepository joinMemRepository;

    public boolean existByUserEmailAndPhone(String userEmail, String userPhone) {
        boolean isExist = joinMemRepository.existsByEmailAndPhoneNumber(userEmail, userPhone);

        return isExist;
    }
    @Transactional
    public void save(UserEntity joinMemEntity) {
        joinMemRepository.save(joinMemEntity);
    }
}

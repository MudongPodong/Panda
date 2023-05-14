package com.example.panda.service;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.JoinMemDTO;
import com.example.panda.entity.ChatEntity;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.entity.JoinMemEntity;
import com.example.panda.repository.JoinMemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JoinMemService {
    private final JoinMemRepository joinMemRepository;

    public boolean existByUserEmailAndPhone(String userEmail, String userPhone) {
        boolean isExist = joinMemRepository.existByUserEmailAndPhone(userEmail, userPhone);

        return isExist;
    }
    @Transactional
    public void save(JoinMemEntity joinMemEntity) {
        joinMemRepository.save(joinMemEntity);
    }
}

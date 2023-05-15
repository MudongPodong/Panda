package com.example.panda.service;

import com.example.panda.dto.UserDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserDTO> findAll() {
        List<UserEntity> userEntityList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for(UserEntity userEntity : userEntityList) {
            userDTOList.add(UserDTO.toUserDTO(userEntity));
        }

        return userDTOList;

    }
    public UserDTO findbyId(String id){
        Optional<UserEntity> userEntity=userRepository.findById(id);
        UserDTO userDTO=UserDTO.toUserDTO(userEntity.get());
        return userDTO;
    }
}

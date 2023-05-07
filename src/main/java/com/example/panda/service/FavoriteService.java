package com.example.panda.service;

import com.example.panda.dto.FavoriteDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.entity.FavoriteEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.FavoriteRepositiory;
import com.example.panda.repository.WritingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepositiory favoriteRepository;
    public List<FavoriteDTO> findAll(){
        List<FavoriteEntity> favoriteEntityList = favoriteRepository.findAll();
        List<FavoriteDTO> favoriteDTOList = new ArrayList<>();

        for(FavoriteEntity favoriteEntity : favoriteEntityList) {
            favoriteDTOList.add(FavoriteDTO.toFavoriteDTO(favoriteEntity));
        }

        return favoriteDTOList;
    }
}

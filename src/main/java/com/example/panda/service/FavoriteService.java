package com.example.panda.service;

import com.example.panda.dto.FavoriteDTO;
import com.example.panda.entity.FavoriteEntity;
import com.example.panda.repository.FavoriteRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteService {
    private final UserRepository userRepository;
    private final WritingRepository writingRepository;
    private final FavoriteRepository favoriteRepository;

    public List<FavoriteDTO> findByEmail(String email){
        List<FavoriteEntity> favoriteEntities=favoriteRepository.findByEmail(email);
        List<FavoriteDTO> favoriteDTOList=new ArrayList<>();

        for(FavoriteEntity favorite:favoriteEntities){
            favoriteDTOList.add(FavoriteDTO.toFavoriteDTO(favorite));
        }

        return favoriteDTOList;
    }

    public void deleteFavorite(String email,int wid){
        favoriteRepository.deleteFavorite(email,wid);
    }
}

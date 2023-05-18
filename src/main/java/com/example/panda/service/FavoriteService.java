package com.example.panda.service;

import com.example.panda.dto.FavoriteDTO;
import com.example.panda.entity.FavoriteEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.FavoriteRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<FavoriteDTO> findByWid(int wid){
        List<FavoriteEntity> favoriteEntities=favoriteRepository.findByWid(wid);
        List<FavoriteDTO> favoriteDTOList=new ArrayList<>();
        for(FavoriteEntity favorite:favoriteEntities){
            favoriteDTOList.add(FavoriteDTO.toFavoriteDTO(favorite));
        }
        return favoriteDTOList;
    }
    public int save(String email,int wid){
        FavoriteEntity favoriteEntity=new FavoriteEntity();
        Optional<UserEntity> userEntity=userRepository.findByEmail(email);
        Optional<WritingEntity> writingEntity=writingRepository.findById(wid);
        favoriteEntity.setUserEntity(userEntity.get());
        favoriteEntity.setWritingEntity(writingEntity.get());

        List<FavoriteEntity> favoriteEntities=favoriteRepository.findByEmail(email);
        for(FavoriteEntity favorite:favoriteEntities){  //겹치는게 있으면 저장X
            if(favorite.getUserEntity().getEmail().equals(email) && favorite.getWritingEntity().getWid()==wid) return 1;
        }

        favoriteRepository.save(favoriteEntity);
        return 2;
    }

    public void deleteFavorite(String email,int wid){
        favoriteRepository.deleteFavorite(email,wid);
    }
}

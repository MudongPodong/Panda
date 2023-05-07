//package com.example.panda.dto;
//
//import com.example.panda.entity.FavoriteEntity;
//import com.example.panda.entity.WritingEntity;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class FavoriteDTO {
//    private String user_id;
//    private int writing_id;
//    private UserDTO userDTO;
//    private WritingDTO writingDTO;
//
//    public static FavoriteDTO toFavoriteDTO(FavoriteEntity favoriteEntity) {
//        FavoriteDTO favoriteDTO = new FavoriteDTO();
//        if(favoriteEntity.getUserEntity()!=null) favoriteDTO.setUser_id(favoriteEntity.getUserEntity().getUid());
//        if(favoriteEntity.getUserEntity()!=null) {
//            favoriteDTO.setWriting_id(favoriteEntity.getWritingEntity().getWid());
//
//
//            //userDTO, writingDTO 값 넣어주기
//        }
//
//
//        return favoriteDTO;
//    }
//}

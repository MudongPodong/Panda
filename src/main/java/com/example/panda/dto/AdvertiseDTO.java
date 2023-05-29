package com.example.panda.dto;


import com.example.panda.entity.AdvertisementEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdvertiseDTO {
    private int aid;
    private LocalDateTime ad_regitDate;
    private int ad_Price;
    private WritingDTO writingDTO;
    public static AdvertiseDTO toadvertiseDTO(AdvertisementEntity advertisementEntity){
        AdvertiseDTO advertiseDTO=new AdvertiseDTO();
        advertiseDTO.setAid(advertisementEntity.getAid());
        advertiseDTO.setAd_regitDate(advertisementEntity.getAd_regitDate());
        advertiseDTO.setAd_Price(advertisementEntity.getAd_price());
        if(advertisementEntity.getWritingEntity()!=null) advertiseDTO.setWritingDTO(WritingDTO.toWritingDTO(advertisementEntity.getWritingEntity()));

        return advertiseDTO;
    }
}

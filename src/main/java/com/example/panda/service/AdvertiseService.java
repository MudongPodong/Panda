package com.example.panda.service;

import com.example.panda.dto.AdvertiseDTO;
import com.example.panda.entity.AdvertisementEntity;
import com.example.panda.repository.AdvertiseDSLRepository;
import com.example.panda.repository.AdvertisementRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdvertiseService {
    private final AdvertiseDSLRepository advertiseDSLRepository;
    private final AdvertisementRepository advertisementRepository;

    public List<AdvertiseDTO> todayADs(){  //현재 남아있는 광고중 가장 비싼 광고료 낸 5개의 게시글만 가져옴
        List<AdvertisementEntity> advertisementEntities=advertiseDSLRepository.todayAdvertise();
        List<AdvertiseDTO> advertiseDTOList=new ArrayList<>();

        for(AdvertisementEntity advertisement:advertisementEntities)
            advertiseDTOList.add(AdvertiseDTO.toadvertiseDTO(advertisement));

        return advertiseDTOList;
    }
}

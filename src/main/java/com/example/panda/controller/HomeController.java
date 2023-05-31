package com.example.panda.controller;

import com.example.panda.dto.AdvertiseDTO;
import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.service.AdvertiseRandom;
import com.example.panda.service.AdvertiseService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {
    private final AdvertiseService advertiseService;
    private final WritingService writingService;
    @GetMapping("/get/popular")
    public List<WritingResponseDTO> popularList(){  // 광고 + 인기 제품
        List<AdvertiseDTO> adList = advertiseService.todayADs();
        List<AdvertiseDTO> adList2= AdvertiseRandom.randFive(adList);
        List<WritingResponseDTO> popularList = writingService.findPopular();

        for(AdvertiseDTO advertiseDTO: adList2)
            popularList.add(0, advertiseDTO.getWritingResponseDTO());
        return popularList;
    }

}

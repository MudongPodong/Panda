package com.example.panda.controller;

import com.example.panda.dto.AdvertiseDTO;
import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.service.AdvertiseRandom;
import com.example.panda.service.AdvertiseService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    @PostMapping("/chat")
    public void joinChat(@RequestParam int wid){

    }

}

package com.example.panda.controller;

import com.example.panda.dto.WritingDTO;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchController {
    private final WritingService writingService;
    @GetMapping("/api/searchResult")
    public List<WritingDTO> test(){
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }
}

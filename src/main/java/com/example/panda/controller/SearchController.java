package com.example.panda.controller;

import com.example.panda.dto.WritingDTO;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchController {
    private final WritingService writingService;
    @PostMapping(value="/api/searchResult",produces = "application/json; charset=UTF-8")
    public List<WritingDTO> searching(@RequestParam("search_word") String word){
        //List<WritingDTO> writingDTOList = writingService.findSearch("%"+java.net.URLDecoder.decode(word, StandardCharsets.UTF_8)+"%");
        List<WritingDTO> writingDTOList = new ArrayList<>();
        String[] strarr=word.split("[_.~]");

        for(String str:strarr){
            writingDTOList.addAll(writingService.findSearch("%"+java.net.URLDecoder.decode(str, StandardCharsets.UTF_8)+"%"));
        }

        return writingDTOList;
    }
}

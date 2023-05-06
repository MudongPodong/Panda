package com.example.panda.controller;

import com.example.panda.dto.UserDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.repository.WritingRepository;
import com.example.panda.service.UserService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {
    private final WritingService writingService;
    @GetMapping("/api/hello")
    public List<String> test(){
        List<String> abc=new ArrayList<>();
        abc.add("사과");
        abc.add("바나나");
        abc.add("포도");
        abc.add("딸기");
        abc.add("수박");
        abc.add("메론");

        return abc;
    }

}

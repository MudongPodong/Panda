package com.example.panda.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class HomeController {
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

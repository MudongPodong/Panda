package com.example.panda.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class WritingController {

    @PostMapping("/api/noticeRegist")
    public String boardwritepro(String title , String content)
    {
        System.out.println("제목 : "+title);
        System.out.println("제목 : "+content);
        return "";
    }

}

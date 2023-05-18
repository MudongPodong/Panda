package com.example.panda.controller;

import com.example.panda.dto.WritingDTO;
import com.example.panda.entity.WritingContent;
import com.example.panda.entity.WritingEntity;
import com.example.panda.service.WritingContentService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class WritingController {

    @Autowired
    private final WritingService writingService;

    @GetMapping("/pages/noticeRegist")
    public String boardwritingform()
    {
        return "boardwrite";
    }


    @PostMapping("/api/noticeRegist")
    public String boardwritepro(WritingEntity writingentity)
    {
        writingService.write(writingentity);
        return "";
    }
    @GetMapping("/api/noticeRegist")
    public List<WritingDTO> boardList()
    {
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }

}

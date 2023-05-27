package com.example.panda.controller;

import com.example.panda.dto.UserDTO;
import com.example.panda.dto.WritingDTO;

import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;

import com.example.panda.service.UserService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class WritingController {

    @Autowired
    private final WritingService writingService;

    private final UserService userService;

//    @GetMapping("/pages/noticeRegist")
//    public String boardwritingform()
//    {
//        return "boardwrite";
//    }


    @PostMapping("/api/noticeRegist")
    public void boardwritepro(WritingEntity writingentity)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        UserEntity userEntity =userService.findbyEmail(userDetails.getUsername());

        writingentity.setUserEntity(userEntity);

        writingService.write(writingentity);
    }
//    @GetMapping("/api/noticeRegist")
//    public List<WritingDTO> boardList()
//    {
//        List<WritingDTO> writingDTOList = writingService.findAll();
//        return writingDTOList;
//    }

}
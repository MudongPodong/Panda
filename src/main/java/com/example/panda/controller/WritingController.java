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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class WritingController {

    @Autowired
    private final WritingService writingService;

    private final UserService userService;

    //게시글 내용 데이터베이스에 저장 이미지는 계속 작업중
//    @PostMapping("http://localhost:8080/noticeRegist")
//    public void boardwritepro(WritingEntity writingentity , @RequestParam("writing_photo") MultipartFile image) throws IOException {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
//        UserEntity userEntity =userService.findbyEmail(userDetails.getUsername());
//        byte[] imageData = image.getBytes();
//
//        writingentity.setUserEntity(userEntity);
//        //writingentity.setWriting_photo(imageData);
//        //writingService.saveImage(image , writingentity);
//        writingService.write(writingentity);
//
//
//    }

    //게시글 내용 목록 조회를 위한 부분
    @RequestMapping("/api/noticePage")
    public List<WritingDTO> boardList()
    {
         List<WritingDTO> writingDTOList = writingService.findAll();
         return writingDTOList;
    }


    //게시글 아이디 하나로 상세 페이지 조회 하는 로직
    @GetMapping ("/api/noticeConfirm/{postId}")
    public WritingDTO getPost(@PathVariable int postId)
    {
        WritingDTO writingDTO = writingService.findById(postId);
        return writingDTO;
    }


}
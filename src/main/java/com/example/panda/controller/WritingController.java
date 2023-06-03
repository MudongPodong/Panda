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
    
    @PostMapping("/api/noticeRegister")
    public void boardwritepro(@RequestParam("writing_name") String writingName,
                              @RequestParam("writing_photo") MultipartFile writingPhoto,
                              @RequestParam("category") String category,
                              @RequestParam("detail_category") String detailCategory,
                              @RequestParam("count") int count,
                              @RequestParam("price") int price,
                              @RequestParam("content") String content) throws IOException {
        System.out.println("혹시 이 부분 실행이 되고있니?");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        UserEntity userEntity =userService.findbyEmail(userDetails.getUsername());
        WritingEntity writingentity = new WritingEntity();

        writingentity.setUserEntity(userEntity);
        writingentity.setWriting_name(writingName);
        writingentity.setCategory(category);
        writingentity.setDetail_category(detailCategory);
        writingentity.setCount(count);
        writingentity.setPrice(price);
        writingentity.setContent(content);


        if (!writingPhoto.isEmpty()) {
            byte[] imageData = writingPhoto.getBytes();
            String base64Image = Base64.getEncoder().encodeToString(imageData);
            writingentity.setWriting_photo(imageData);
        }

        System.out.println("이 부분 실행이 되고있니?");
        writingService.write(writingentity);


    }

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
    
    //게시글 로그인한 사용자 게시글 필터링
    @GetMapping("/api/UserInfo")
    public UserEntity getUserInfo()
    {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        UserEntity userEntity =userService.findbyEmail(userDetails.getUsername());
        System.out.println(userEntity.getEmail());
        return userEntity;
    }
    
     //게시글 삭제 기능구현
    @DeleteMapping("/api/posts/{postId}")
    public void deletePost(@PathVariable Integer postId) throws ChangeSetPersister.NotFoundException {
        writingService.deletePost(postId);
    }


}

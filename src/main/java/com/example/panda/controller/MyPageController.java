//package com.example.panda.controller;
//
//import com.example.panda.dto.UserDTO;
//import com.example.panda.dto.WritingDTO;
//import com.example.panda.service.UserService;
//import com.example.panda.service.WritingService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//public class MyPageController {
//    private final WritingService writingService;
//    private final UserService userService;
//    @GetMapping("/api/writings")
//    public List<WritingDTO> test(){
//        List<WritingDTO> writingDTOList = writingService.findAll();
//        //for(WritingDTO writingDTO : writingDTOList)
//        //    System.out.println(writingDTO.getWriting_content());
//
//        return writingDTOList;
//    }
//
//    @GetMapping("/api/del_item")
//    public void requestItem(@RequestParam int id, @RequestParam String writing_name,@RequestParam String list){
////        System.out.println(id);
////        System.out.println(writing_name);
////        System.out.println(list);
//    }
//
//    @GetMapping("/api/list_totalPrice")   //프론트 내부에서 전체 리스트 계산 합 못 구함(정적 데이터만 계산 가능함)
//    public int totalPrice(){
//        List<WritingDTO> writingDTOList = writingService.findAll();
//        int sum=0;
//        for(WritingDTO writingDTO : writingDTOList) sum+=writingDTO.getPrice();
//
//        return sum;
//    }
//
//    @GetMapping("/api/favoriteList")   //찜 목록 가져오기
//    public List<WritingDTO> favoriteList(){
//        List<WritingDTO> writingDTOList=new ArrayList<>();
//        UserDTO userDTO=userService.findbyId("diqzk3173");
//
//
//        return writingDTOList;
//    }
//}

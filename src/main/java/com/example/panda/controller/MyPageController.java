package com.example.panda.controller;

import com.example.panda.dto.FavoriteDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.service.FavoriteService;
import com.example.panda.service.UserService;
import com.example.panda.service.WritingService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyPageController {
    private final WritingService writingService;
    private final UserService userService;
    private final FavoriteService favoriteService;
    @GetMapping("/api/writings")
    public List<WritingDTO> test(){
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }

    @PostMapping("/api/del_item")
    public void requestItem(@RequestParam("id")int id,
                            @RequestParam("writing_name")String writing_name,
                            @RequestParam("list")String list)  {
        //System.out.println(data);
        String[] del_list=list.split(",");
        for(String st:del_list){
            //System.out.println(st);
            favoriteService.deleteFavorite("jhng01@naver.com",Integer.parseInt(st));
        }
    }

    @GetMapping("/api/list_totalPrice")   //프론트 내부에서 전체 리스트 계산 합 못 구함(정적 데이터만 계산 가능함)
    public int totalPrice(){
        List<WritingDTO> writingDTOList = writingService.findAll();
        int sum=0;
        for(WritingDTO writingDTO : writingDTOList) sum+=writingDTO.getPrice();

        return sum;
    }

    @GetMapping("/api/favoriteList")   //찜 목록 가져오기(매개변수에 @RequestParam으로 세션값 받아와야함)
    public List<FavoriteDTO> favoriteList(){
        List<WritingDTO> writingDTOList=new ArrayList<>();

        List<FavoriteDTO> favoriteDTOList=favoriteService.findByEmail("jhng01@naver.com");

        return favoriteDTOList;
    }
}

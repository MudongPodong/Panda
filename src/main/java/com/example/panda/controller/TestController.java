package com.example.panda.controller;

import com.example.panda.dto.UserDTO;
import com.example.panda.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class TestController {
    private final UserService userService;

    @GetMapping("/")
    public String test(){
        List<UserDTO> userDTOList = userService.findAll();

        for(UserDTO userDTO : userDTOList)
            System.out.println(userDTO.getUserId());
        return "index";
    }



}

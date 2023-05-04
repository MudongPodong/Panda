package com.example.panda.controller;

import com.example.panda.dto.MessageDTO;
import com.example.panda.dto.MessageRoomDTO;
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

    /*
    *  MessageRoom (채팅방) DB가 필요할 것 같아서 만듦.
    *  Message & Message Room DB 설계 참고 자료
    *  https://youngminz.netlify.app/posts/django-1-to-1-chat-service
    */

    /* 채팅 테스트용 (0번 채팅방) */
    @GetMapping("/api/chat")
    public List<MessageDTO> chatTest() {
        List<MessageDTO> chatTest = new ArrayList<>();
        chatTest.add(new MessageDTO(0, 0, true,  "님", new Date()));
        chatTest.add(new MessageDTO(1, 0, true, "네고 안하면 안삼", new Date()));
        chatTest.add(new MessageDTO(2, 0, false, "사지마셈", new Date()));
        chatTest.add(new MessageDTO(3, 0, true, "신고할게요", new Date()));
        chatTest.add(new MessageDTO(4, 0, false, "?", new Date()));
        return chatTest;
    }

    /* 채팅방 테스트용 */
    @GetMapping("/api/chatList")
    public List<MessageRoomDTO> chatListTest() {
        List<MessageRoomDTO> chatListTest = new ArrayList<>();
        chatListTest.add(new MessageRoomDTO(0,  "네고왕김네고", "나", "?", new Date()));
        chatListTest.add(new MessageRoomDTO(1,  "사려는사람", "나", "네고 가능?", new Date()));
        chatListTest.add(new MessageRoomDTO(2,  "다판다", "나", "ㅎㅇ", new Date()));

        return chatListTest;
    }
}

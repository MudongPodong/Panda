/* title : WebSocketConfig
* 설명 : WebSocket을 구성하기 위해 사용되는 클래스
*       Endpoint를 등록한다.
* 작성자 : 이승현
* 생성일 : 2023.05.17
* 업데이트 : -
*/

package com.example.panda.config;

import com.example.panda.controller.ChatHandler;
import com.example.panda.controller.MessageHandler;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final ChatRoomService chatRoomService;
    private final ChatService chatService;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatHandler(chatRoomService, chatService), "/chat")
                        .setAllowedOrigins("*");

        registry.addHandler(new MessageHandler(chatService), "/chat/{roomId}")
                .setAllowedOrigins("*");
    }
}
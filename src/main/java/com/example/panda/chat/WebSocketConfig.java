/* title : WebSocketConfig
* 설명 : WebSocket을 구성하기 위해 사용되는 클래스
*       Endpoint를 등록한다.
* 작성자 : 이승현
* 생성일 : 2023.05.17
* 업데이트 : -
*/

package com.example.panda.chat;

import com.example.panda.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
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
    private final WritingCompleteService writingCompleteService;
    private final UserService userService;
    private final PurchaseHistoryService purchaseHistoryService;
    private final HandshakeInterceptor handshakeInterceptor;
    private final WebSocketSessionManager webSocketSessionManager;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ChatHandler(chatRoomService, webSocketSessionManager), "/chat")
                .addInterceptors(handshakeInterceptor)
                .setAllowedOrigins("http://localhost:3000");

        registry.addHandler(new MessageHandler(chatService, chatRoomService, writingCompleteService,
                        userService, purchaseHistoryService, webSocketSessionManager), "/chat/{roomId}")
                .addInterceptors(handshakeInterceptor)
                .setAllowedOrigins("http://localhost:3000");
    }
}
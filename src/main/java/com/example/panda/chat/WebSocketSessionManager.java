/* title : WebSocketSessionManager
 * 설명 : 웹 소켓 통신 시 사용자마다 세션 및 채팅방 정보를 저장하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.20
 * 업데이트 : -
 */
package com.example.panda.chat;

import com.example.panda.dto.ChatDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionManager {
    private Map<String, WebSocketSession> sessionMap; // 사용자 email과 세션 정보를 매핑하는 맵
    private Map<String, ChatDTO> chatInfoMap; // 사용자의 현재 roomId 및 인덱스를 매핑하는 맵

    public WebSocketSessionManager() {
        sessionMap = new ConcurrentHashMap<>();
        chatInfoMap = new ConcurrentHashMap<>();
    }

    public void registerSession(String sessionId, WebSocketSession webSocketSession) {
        sessionMap.put(sessionId, webSocketSession);
    }

    public void removeSession(String sessionId) {
        sessionMap.remove(sessionId);
    }

    public WebSocketSession getSession(String sessionId) {
        return sessionMap.get(sessionId);
    }

    public void registerChatInfo(String sessionId, ChatDTO chatDTO) {
        chatInfoMap.put(sessionId, chatDTO);
    }

    public void removeChatInfo(String sessionId) {
        chatInfoMap.remove(sessionId);
    }

    public ChatDTO getChatInfo(String sessionId) {
        return chatInfoMap.get(sessionId);
    }

}
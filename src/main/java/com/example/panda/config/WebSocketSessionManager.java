package com.example.panda.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionManager {
    private Map<String, WebSocketSession> sessionMap; // 세션 ID와 인증 정보를 매핑하는 맵
    private Map<String, Long> roomIdMap; // 사용자의 현재 roomId를 저장하는 맵

    public WebSocketSessionManager() {
        sessionMap = new ConcurrentHashMap<>();
        roomIdMap = new ConcurrentHashMap<>();
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

    public void registerRoomId(String sessionId, Long roomId) {
        roomIdMap.put(sessionId, roomId);
    }

    public void removeRoomId(String sessionId) {
        roomIdMap.remove(sessionId);
    }

    public Long getRoomId(String sessionId) {
        return roomIdMap.get(sessionId);
    }

//    public void notifyMap () {
//        for( String key : sessionMap.keySet() ){
//            System.out.println( String.format("키 : %s, 값 : %s", key, sessionMap.get(key)) );
//        }
//    }
//
//    public WebSocketSession isSenderSession(WebSocketSession session, WebSocketSession sessionA, WebSocketSession sessionB) {
//        if(sessionA == null)
//            return sessionB;
//        else if(sessionB == null)
//            return sessionA;
//        else return session.getId().equals(sessionA.getId()) ? sessionA : sessionB;
//    }
}
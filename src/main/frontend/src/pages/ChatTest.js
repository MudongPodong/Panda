import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatList from "./ChatList";
import axios from "axios";
import {useEffect, useState} from "react";

let email = "diqzk1562@naver.com";
function ChatTest() {

    const [chatList, setChatList] = useState(null);

    useEffect(() => {

        const socket = new WebSocket('ws://localhost:8080/chat');

        socket.onopen = () => {
            console.log('웹 소켓 연결 열림');
            // 연결이 열리면 채팅방 목록 요청
            socket.send(email);

            socket.onmessage = (event) => {
                setChatList(JSON.parse(event.data));
                console.log(event.data);
            }
        };

    }, []);


    // const socket = new SockJS('/chat');
    // const stompClient = Stomp.over(socket);
    //
    // const userInfo = {
    //     username: 'john',
    //     userId: '1234',
    // };
    //
    // stompClient.connect({}, () => {
    //     stompClient.send('/app/userInfo', {}, JSON.stringify(userInfo));
    // });

};

export default ChatTest;



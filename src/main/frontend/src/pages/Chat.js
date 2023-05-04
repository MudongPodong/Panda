import '../App.css';
import '../Css_dir/chat.css'
import profile from '../imgs/profileEx.PNG'
import search from '../imgs/chat_search.png'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
function App() {


    const [messages, getMessages] = useState([]);
    const [chatLists, getLists] = useState([]);

    useEffect(() => {
        axios.get('/api/chat')
            .then(response => {
                getMessages(response.data);
                console.log(response);
            })
    }, []);

    useEffect(() => {
        axios.get('/api/chatList')
            .then(response => {
                getLists(response.data);
            })
    }, []);

    return (
        <div className="chat_page">
            <div className="plist">
                <ChatList chatLists={chatLists} />
            </div>
            <div className="chat_container">
                <div className="chat_header">
                    <div className="chat_image">
                        <img src={profile} width="100%" height="100%"></img>
                    </div>
                    <div className="chat_info">
                        <div className="chat_name">네고왕김네고</div>
                    </div>
                    <div className="chat_search">
                        <img src={search} width="30px" height="30px"></img>
                    </div>
                </div>
                <div className="chat_history">
                    <MessageList messages={messages} />
                </div>
                <div className="chat_message">
                    <textarea name="send_message" placeholder="메시지를 입력하세요" rows="3"></textarea>
                    <button>전송</button>
                </div>
            </div>
        </div>
    );
}

export default App;
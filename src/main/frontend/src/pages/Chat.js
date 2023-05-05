import styles from '../Css_dir/Chat.module.css'
import profile from '../imgs/profileEx.PNG'
import search from '../imgs/chat_search.png'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
import {useNavigate} from "react-router-dom";
function Chat() {

    const [isOpen, setSearch] = useState(false);

    const toggleSearch = () => {
        setSearch(isOpen => !isOpen);
    }

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
        <div className={styles.chat_page}>
            <div className={styles.plist}>
                <ChatList chatLists={chatLists} />
            </div>
            <div className={styles.chat_container}>
                <div className={`${styles.chat_header} ${isOpen ? styles.chat_header_search : null}`}>
                    <div className={styles.chat_image}>
                        <img src={profile} width="100%" height="100%"></img>
                    </div>
                    <div className={styles.chat_info}>
                        <div className={styles.chat_name}>네고왕김네고</div>
                    </div>
                    {/*<div className={styles.chat_search}>*/}
                    {/*    /!*<input type="text" className={isOpen ? styles.show_search : styles.hide_search}/>*!/*/}
                    {/*    /!*<img src={search} width="30px" height="30px" onClick={()=>toggleSearch()} />*!/*/}
                    {/*    /!*<button className={isOpen ? styles.show_search : styles.hide_search}>검색</button>*!/*/}
                    {/*</div>*/}
                </div>
                <div className={`${styles.chat_history} ${isOpen ? styles.chat_history_search : null}`}>
                    <MessageList messages={messages} />
                </div>
                <div className={styles.chat_message}>
                    <textarea name={styles.send_message} placeholder="메시지를 입력하세요" rows="3"></textarea>
                    <button>전송</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;

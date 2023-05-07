import styles from '../Css_dir/Chat.module.css'
import profile from '../imgs/profileEx.PNG'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
import Painting from '../imgs/temp_painting.png';

function Chat() {
    let currentSessionName = {
        userId : "diqzk1562"
    };

    const [messages, getMessages] = useState([]);
    const [chatLists, getChatLists] = useState([]);
    const [op_Id, setOpId] = useState([]);

    const chatListClick = async (roomId, nickname) => {
        try {
            const response = await axios.post('/api/chat', {roomId : roomId});
            getMessages(response.data);
            setOpId(nickname);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axios.post('/api/chatList', currentSessionName)
            .then((response)=> {
                getChatLists(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

return (
        <div className={styles.chat_page}>
            <div className={styles.plist}>
                <ChatList chatLists={chatLists} onClick={chatListClick} />
            </div>
            <div className={styles.chat_container}>
                <div className={styles.chat_header}>
                    <div className={styles.chat_image}>
                        <img src={profile} width="100%" height="100%"></img>
                    </div>
                    <div className={styles.chat_info}>
                        <div className={styles.chat_name}>{op_Id}</div>
                    </div>
                </div>
                <div className={styles.chat_history}>
                    <MessageList messages={messages} />
                </div>
                <div className={styles.chat_message}>
                    <textarea name={styles.send_message} placeholder="메시지를 입력하세요" rows="3"></textarea>
                    <button>전송</button>
                    <img src={Painting} className={styles.painting} />
                </div>
            </div>
        </div>
    );
}

export default Chat;

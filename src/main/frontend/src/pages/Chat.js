import styles from '../Css_dir/Chat.module.css'
import profile from '../imgs/profileEx.PNG'
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
import Painting from '../imgs/temp_painting.png';
import Map from '../imgs/temp_map.png';

function Chat() {
    let userId = "diqzk1562";
    const [messages, getMessages] = useState([]);
    const [chatLists, getChatLists] = useState([]);
    const [op_Id, setOpId] = useState([]);
    const [currentRoomId, setRoomId] = useState([]);
    const [isSender, setIsSender] = useState(false);

    const chatListClick = async (roomId, nickname, amISender) => {
        try {
            setRoomId(roomId);
            const formData = new FormData();
            formData.append('roomId', roomId);
            const response = await axios.post('/api/chat', formData);
            getMessages(response.data);
            setOpId(nickname);
            setIsSender(amISender);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append('userId', userId);
        axios.post('/api/chatList', formData)
            .then((response)=> {
                getChatLists(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [sendText, setSendText] = useState('');
    const imageInput = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const imageSelectClick = () => {
        imageInput.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    const handleTextChange = (event) => {
        setSendText(event.target.value);
    }
    const handleUpload = () => {
        if(selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const maxSize = 5 * 1024 * 1024;

            if (allowedExtensions.includes(fileExtension) && selectedFile.size <= maxSize) {
                const formData = new FormData();
                formData.append('photo', selectedFile);
                formData.append('roomId', currentRoomId);
                formData.append('isFromSender', isSender);

                axios.post('/api/sendChatPhoto', formData, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                    .then((response)=> {
                        getMessages(response.data);
                        console.log('파일 업로드 성공');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else{
                console.log('올바른 파일 형식이 아니거나 파일 크기가 너무 큽니다.');
            }
        } else if (sendText !== '') {
            const formData = new FormData();

            formData.append('roomId', currentRoomId);
            formData.append('isFromSender', isSender);
            formData.append('message', sendText);

            axios.post('/api/sendChat', formData)
                .then((response)=> {
                    getMessages(response.data);
                    console.log('채팅 전송 성공');
                })
                .catch(error => {
                    console.error(error);
                });
            setSendText('');
        }
        else {
            console.log('입력이 없습니다.');
        }
    }


return (
        <div className={styles.chat_page}>
            <div className={styles.plist}>
                <ChatList chatLists={chatLists} onClick={chatListClick}/>
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
                    <textarea name={styles.send_message} placeholder="메시지를 입력하세요" value={sendText} rows="3" onChange={handleTextChange}></textarea>
                    <button onClick={handleUpload}>전송</button>
                    <img src={Painting} className={styles.painting} onClick={imageSelectClick} />
                    <img src={Map} className={styles.map}  />
                    <input type="file" ref={imageInput} className={styles.button_hidden} onChange={handleFileChange} />
                </div>
            </div>
        </div>
    );
}

export default Chat;

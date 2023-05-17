import styles from '../Css_dir/Chat.module.css'
import profile from '../imgs/profileEx.PNG'
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
import Painting from '../imgs/temp_painting.png';
import Map from '../imgs/temp_map.png';
import XButton from '../imgs/XButton.png';


function Chat() {
    let email = "diqzk1562@naver.com";

    const [messages, getMessages] = useState([]);
    const [chatLists, getChatLists] = useState([]);
    const [op_Id, setOpId] = useState([]);
    const [currentRoomId, setRoomId] = useState([]);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isClicked, setIsClicked] = useState(null);
    const [sendText, setSendText] = useState('');
    const imageInput = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const scrollRef = useRef();
    const [previewImage, setPreviewImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    useEffect(() => {

        const socket = new WebSocket('ws://localhost:8080/chat');

        socket.onopen = () => {
            console.log('웹 소켓 연결 열림');
            // 연결이 열리면 채팅방 목록 요청
            socket.send(email);

            socket.onmessage = (event) => {
                getChatLists(JSON.parse(event.data));
                console.log(event.data);
            }
        };
    }, []);

    const imageSelectClick = () => {
        imageInput.current.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setPreviewImage(imageUrl);
                // imagePreviewRef.current.src = imageUrl;
            };
            reader.readAsDataURL(file);
        }
    }

    const handleKeyPress= (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUpload();
        }
    };

    const loadChatList = () => {

        axios.post('/api/chatList', {email: email})
            .then((response)=> {
                getChatLists(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const loadChat = (roomId) => {
        axios.post('/api/chat',
            {roomId: roomId})
            .then((response)=> {
                getMessages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const chatListClick = (roomId, nickname, amIBuyer, clickIndex) => {
        try {
            setRoomId(roomId);
            setOpId(nickname);
            setIsBuyer(amIBuyer);
            setIsClicked(clickIndex);
            loadChat(roomId);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = () => {

        if(selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const maxSize = 1 * 1024 * 1024;

            if (!allowedExtensions.includes(fileExtension)) {
                console.log('올바른 파일 형식이 아닙니다.');
                setSelectedFile(null);
            }

            else if (selectedFile.size > maxSize) {
                console.log('파일 크기 제한은 ' + (maxSize / (1024 * 1024)) + 'MB 입니다.');
                setSelectedFile(null);
            }
            else {
                const formData = new FormData();
                formData.append('photo', selectedFile);
                formData.append('roomId', currentRoomId);
                formData.append('isFromBuyer', isBuyer);

                axios.post('/api/sendChatPhoto', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        getMessages(response.data);
                        console.log('파일 업로드 성공');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        } else if (sendText !== '') {
            const message = {
                roomId: currentRoomId,
                isFromBuyer:isBuyer,
                content: sendText,
                chatDate: null,
                photo: null
            }
            axios.post('/api/sendChat', JSON.stringify(message), {
                headers: {
                    "Content-Type": `application/json`,
                }
            })
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
        loadChatList();
    }

    const XButtonClick = () => {
        setSelectedFile(null);
        setPreviewImage(null);
        setFileInputKey(Date.now());
    }

    return (
        <div className={styles.chat_page}>
            <div className={styles.plist}>
                <ul>
                <li className={styles.profile_First}>
                        <div className={styles.p_profile}>
                            <img src={profile} width="100%" height="100%"></img>
                        </div>
                        <div className={styles.p_info}>
                            <div className={styles.p_name}>나</div>
                            <div className={styles.p_time}></div>
                            <div className={styles.p_last_message}></div>
                        </div>
                    </li>
                </ul>
                <ChatList chatLists={chatLists} onClick={chatListClick} isClicked={isClicked}/>
            </div>
            <div className={styles.chat_container}>
            <MessageList messages={messages} setScrollRef={scrollRef} op_Id={op_Id}/>
                <div className={styles.chat_message}>
                    <div className={`${styles.image_preview_box} ${previewImage === null ? styles.button_hidden : null}`}>
                        <img src={XButton} width="2.5%" onClick={XButtonClick}/>
                        <div className={styles.image_preview}>
                            <img src={previewImage} width="100%" height="100%"/>
                        </div>
                    </div>
                    <textarea name={styles.send_message} placeholder="메시지를 입력하세요" value={sendText} rows="3" onChange={(event) => setSendText(event.target.value)} onKeyPress={handleKeyPress}></textarea>
                    <button onClick={handleUpload}>전송</button>
                    <img src={Painting} className={styles.painting} onClick={imageSelectClick} />
                    <img src={Map} className={styles.map}  />
                    <input type="file" ref={imageInput} className={styles.button_hidden} key={fileInputKey} onChange={handleFileChange} />
                    {/*<button onClick={sendMessage}>제출</button>*/}
                </div>
            </div>
        </div>

    );
}

export default Chat;

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

    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
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

    const connectChat = () => {
        const socket = new WebSocket('ws://localhost:8080/chat');
        socket.onopen = () => {

            const data = {
                email: "diqzk1562@naver.com",
            };

            console.log(data);
            socket.send(JSON.stringify(data));

            socket.onmessage = (event) => {
                console.log(`chat 소켓 열림`);
                // JSON.parse(event.data).forEach((chatRoom) => {
                //     socket = new WebSocket(`ws://localhost:8080/chat/${chatRoom.roomId}`);
                //     socket.onopen = () => {
                //         console.log(`${chatRoom.roomId}번 소켓이 열렸습니다!`);
                //     };
                // });
                setChatRooms(JSON.parse(event.data));
            };
        };
    };

    useEffect(() => {
        connectChat();
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
                setChatRooms(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const loadChat = (roomId) => {

        const data = {
            roomId: roomId,
        };

        const room = chatRooms.find((r) => r.roomId === roomId);


        if(!room.hasOwnProperty("socket")) {
            room.socket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);
            room.socket.onopen = () => {
                console.log(`${roomId}소켓 열림`);
                room.socket.send(JSON.stringify(data));
                room.socket.onmessage = (event) => {
                    setMessages(JSON.parse(event.data));
                };
            };
        } else {
            room.socket.send(JSON.stringify(data));
            room.socket.onmessage = (event) => {
                setMessages(JSON.parse(event.data));
            }
        };
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
                        setMessages(response.data);
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
                    setMessages(response.data);
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
                <ChatList chatLists={chatRooms} onClick={chatListClick} isClicked={isClicked} email={email}/>
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
                </div>
            </div>
        </div>

    );
}

export default Chat;

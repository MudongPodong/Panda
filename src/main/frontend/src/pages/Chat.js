import styles from '../Css_dir/Chat.module.css'
import profile from '../imgs/profileEx.PNG'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
import Painting from '../imgs/temp_painting.png';
import guidance from '../imgs/temp_map.png';
import XButton from '../imgs/XButton.png';

function Chat() {

    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);

    const [op_Id, setOpId] = useState([]);
    const [currentRoomId, setRoomId] = useState(null);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isClicked, setIsClicked] = useState(null);
    const [sendText, setSendText] = useState('');
    const imageInput = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const [isBigger, setIsBigger] = useState(false);
    const [isNotFormal, setIsNotFormal] = useState(false);

    const [chatSocket, setChatSocket] = useState(null);
    const [socketMap, setSocketMap] = useState(new Map());

    const [email, setEmail] = useState(null);

    const maxSize = 4 * 1024 * 1024;

    useEffect(() => {
        let socket;

        if(chatSocket == null) {
            socket = new WebSocket('ws://localhost:8080/chat');
            setChatSocket(socket);

            socket.onopen = () => {
                console.log(`chat 소켓 열림`);
            };

        } else {
            socket = chatSocket;
        }

        socket.onmessage = (event) => {

            let receivedMap = JSON.parse(event.data);
            setChatRooms(receivedMap.chatRooms);
            setEmail(receivedMap.email);
            // let roomID = receivedMap.roomId;
            // console.log("roomID:" + roomID);

            receivedMap.chatRooms.forEach((chatRoom, index) => {
                let room = socketMap.get(chatRoom.roomId);
                if (room == null) {
                    let room = new WebSocket(`ws://localhost:8080/chat/${chatRoom.roomId}`);
                    socketMap.set(chatRoom.roomId, room);

                    room.onopen = () => {
                        console.log(`방번호 : ${chatRoom.roomId} 소켓 열림`)
                        socketMap.set(chatRoom.roomId, room);
                    }

                    room.onmessage = (event) => {
                        let parsedMessage = JSON.parse(event.data);
                        let chatList = parsedMessage.messages;
                        let chat = parsedMessage.message;
                        let myRoomId = parsedMessage.myRoomId;
                        if (chatList) setMessages(chatList);
                        else if (chat) {
                            setMessages((prevMessages) => [...prevMessages, chat]);
                            setChatRooms((prevRooms) => {
                                const updatedRooms = prevRooms.map(chatRoom => chatRoom.roomId === chat.roomId ?
                                    {
                                        ...chatRoom, lastContent: chat.photo != null ? "사진" : chat.content,
                                        lastDate: chat.chatDate
                                    } : chatRoom);

                                updatedRooms.sort((a, b) => {
                                    return b.lastDate - a.lastDate;
                                });
                                let email = receivedMap.email;

                                if(chat.roomId === myRoomId) {
                                    chatListClick(myRoomId,
                                        updatedRooms[0].buyer.email === email ? updatedRooms[0].seller.nickname : updatedRooms[0].buyer.nickname,
                                        updatedRooms[0].buyer.email !== email,
                                        0);
                                    setRoomId(myRoomId);
                                }
                                return updatedRooms;
                            });
                        }
                    }
                }
            });
        };
    }, [currentRoomId]);

    useEffect(() => {
        if(currentRoomId) {
            let roomSocket = socketMap.get(currentRoomId)
            if(roomSocket == null) {
                console.log("채팅방이 없는뎄?");
            }
            roomSocket.send(JSON.stringify({roomId: currentRoomId}));
        }
    }, [currentRoomId])

    const imageSelectClick = () => {
        imageInput.current.click();
    }

    const handleFileChange = (event) => {
        if(event.target.files[0] == null) return;
        const file = event.target.files[0];
        setSelectedFile(file);

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            setIsNotFormal(true);
            setSelectedFile(null);
            setPreviewImage(null);
            return;
        }

        if (file.size > maxSize) {
            setIsBigger(true);
            setSelectedFile(null);
            setPreviewImage(null);
            return;
        }

        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setPreviewImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
        setIsNotFormal(false);
        setIsBigger(false);
    }

    const handleKeyPress= (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUpload();
        }
    };

    const loadChat = (roomId) => {

        let roomSocket = socketMap.get(roomId);

        if(roomSocket == null) {
            console.log("채팅 방이 없는데요?");
            return;
        }

        const data = {
            roomId: roomId,
        };

        roomSocket.send(JSON.stringify(data));
    };

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
        if(sendText === '' && !selectedFile) return;

        let room = socketMap.get(currentRoomId);
        let message;;

        if(selectedFile) {
            message = {
                roomId: currentRoomId,
                fromBuyer:isBuyer,
                content: null,
                chatDate: null,
                photo: previewImage
            };
        } else {
            message = {
                roomId: currentRoomId,
                fromBuyer:isBuyer,
                content: sendText,
                chatDate: null,
                photo: null
            }
            setSendText('');
        }

        room.send(JSON.stringify(message));
        setPreviewImage(null);
        setSelectedFile(null);
    };

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
                            <div className={`${styles.p_name} ${styles.whitesmoke_color}`}>나</div>
                            <div className={`${styles.p_time} ${styles.whitesmoke_color}`}></div>
                            <div className={`${styles.p_last_message} ${styles.whitesmoke_color}`}/>
                        </div>
                    </li>
                </ul>
                <ChatList chatRooms={chatRooms} onClick={chatListClick} isClicked={isClicked} email={email}/>
            </div>

            {currentRoomId != null ?
                <div className={styles.chat_container}>
                    <MessageList messages={messages} op_Id={op_Id} isBuyer={isBuyer} currentRoomId={currentRoomId} />
                    <div className={styles.chat_message}>
                        <div className={styles.error_message}>
                            {
                                isBigger === true ? `이미지 용량 제한은 ${maxSize / (1024 * 1024)}MB 입니다.` : isNotFormal === true ? "이미지 파일이 아닙니다." : null
                            }
                        </div>
                        <div className={`${styles.image_preview_box} ${previewImage === null ? styles.button_hidden : null}`}>
                            <img src={XButton} width="2.5%" onClick={XButtonClick}/>
                            <div className={styles.image_preview}>
                                <img src={previewImage} width="100%" height="100%"/>
                            </div>
                        </div>
                    <textarea name={styles.send_message} placeholder={"메시지를 입력하세요."} rows="3" value={sendText} onChange={(event) => setSendText(event.target.value)} onKeyPress={handleKeyPress}></textarea>
                    <button onClick={handleUpload}>전송</button>
                        <img src={Painting} className={styles.painting} onClick={imageSelectClick} />
                        <img src={guidance} className={styles.map}  />
                        <input type="file" ref={imageInput} className={styles.button_hidden} key={fileInputKey} onChange={handleFileChange} />
                    </div>
                </div>
                :
                <div className={styles.chat_container}>
                    <div className={styles.chat_header} />
                    <div className={styles.chat_history}>
                        <div className={styles.no_room_selected}>채팅 방을 클릭해주세요.</div>
                    </div>
                    <div className={styles.chat_message} />
                </div>
            }
        </div>
    );
}

export default Chat;

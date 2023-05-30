import React, {useEffect, useRef, useState} from 'react';
import styles from '../Css_dir/Chat.module.css'
import dayjs from 'dayjs';
import profile from "../imgs/profileEx.PNG";
import smile from "../imgs/emo_smile.PNG";
import normal from "../imgs/emo_normal.PNG";
import sad from "../imgs/emo_sad.PNG";
import Modal from 'react-modal';

const MessageList = React.memo(({ messages, toMessageList, socket}) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEmo, setSelectedEmo] = useState(null);
    const chatContainerRef = useRef();
    const messageRef = useRef();

    useEffect(() => {
        if(!messages[0]) return;
        // 시작할 때 messages 배열이 빈채로 하위 컴포넌트가 시작되어 오류 메시지가 출력되는 것을 방지

        let type = messages[messages.length-1].type;
        // 스크롤을 내려야 하는가?

        if(type === 'true') {// 스크롤을 내려야 함
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }

        else if(type === 'isBottom') {
            if(chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight
            >= chatContainerRef.current.scrollHeight - (128 + messageRef.current.offsetHeight))
                // 현재 사용자가 메시지를 받는 사람이며, 스크롤이 밑에 있는지 확인해야함
                // 밑에 없으면 현재 스크롤을 올려서 메시지를 보고 있다는 의미.
                // scrollTop, clientHeight 를 더한게 꼭 128 차이가 나길래 -128을 해줌.
                // 메시지 크기가 128이던데 아마 메시지 크기랑 연관된 것으로 보임.
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        else if (type === 'false'){
            // 위로 올려서 이전 데이터를 가져온 상황.
            // 스크롤을 이전 메시지까지만 두어야함.
            chatContainerRef.current.scrollTop = 2560;
        }
    }, [messages])

    const handleScroll = () => {
        if(chatContainerRef.current.scrollTop === 0 && messages[0].type !== 'full') {
            socket.send(JSON.stringify({
                roomId:messages[0].roomId,
                count: messages.length,
                type: "scroll",
            }));
        };
    };

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const openEvaluateModal = () => {
        setIsOpen(true);
        setSelectedEmo(null);
    }

    const closeEvaluateModal = () => {
        setIsOpen(false);
    }

    const sendEvaluate = (roomId) => {
        if(roomId === null) {
            console.log("대화를 나눈 적이 없습니다.");
            return;
        }
        socket.send(JSON.stringify({
            roomId:roomId,
            count:selectedEmo,
            type:"evaluate",
        }));
        setIsOpen(false);
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeEvaluateModal}
                onClick={closeImageModal}
                ariaHideApp={false}
                style={{
                    content: {
                        width: '40%',
                        margin: '0 auto',
                        marginTop:'50px',
                        height: '45%',
                        backgroundColor: 'whitesmoke',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}>
                <div>
                    <div className={styles.eval_header}>
                        상대방을 평가해주세요!
                    </div>

                    <div className={styles.eval_img}>
                        <img src={smile} className = {selectedEmo === 3 ? null : styles.blackwhite} onClick={() => setSelectedEmo(3)}/>
                        <img src={normal}  className = {selectedEmo === 2 ? null : styles.blackwhite} onClick={() => setSelectedEmo(2)}/>
                        <img src={sad}  className = {selectedEmo === 1 ? null : styles.blackwhite} onClick={() => setSelectedEmo(1)}/>
                    </div>

                    <div className={styles.eval_button}>
                        <button onClick={ messages[0] != null ? () => sendEvaluate(messages[0].roomId) : () => sendEvaluate() }>확인</button>
                        <button onClick={closeEvaluateModal}>닫기</button>
                    </div>
                </div>
            </Modal>
            <div className={styles.chat_header}>
                <div className={styles.chat_image}>
                    <img src={profile} width="100%" height="100%"></img>
                </div>
                <div className={styles.chat_info}>
                    <div className={styles.chat_name}>{toMessageList.op_Id}</div>
                </div>
                {
                    toMessageList.amIBuyer ?
                        toMessageList.evaluateBuyer > 0 ?
                            <button className={styles.purchase_button}>
                                평점 작성 완료
                            </button>
                            :
                            <button className={`${styles.purchase_button} ${styles.point_cursor}`} onClick={openEvaluateModal}>
                                상대 평점 남기기
                            </button>
                        :
                        toMessageList.evaluateSeller > 0 ?
                            <button className={styles.purchase_button}>
                                평점 작성 완료
                            </button>
                            :
                            <button className={`${styles.purchase_button} ${styles.point_cursor}`} onClick={openEvaluateModal}>
                                상대 평점 남기기
                            </button>
                }
            </div>
            <div className={styles.chat_history} ref={chatContainerRef} onScroll={handleScroll}>
        <ul>
            {messages.map((message, index) => {

                const date1 = dayjs(message.chatDate);
                const date2 = dayjs(new Date());
                let date;
                if(date2.diff(date1, 'year') > 0)
                    date = date1.format('yyyy년 M월 D일 A h시 m분');
                else if(date2.diff(date1, 'day') > 0)
                    date = date1.format('M월 D일 A h시 m분');
                else
                    date = date1.format('오늘 A h시 m분');

                return (
                    <li key={index}>
                        {
                            message.fromBuyer === toMessageList.amIBuyer ?
                            <div>
                                <div className={styles.message_info}>
                                    <span className={`${styles.message_name} ${styles.float_right}`}>{message.fromBuyer}</span>
                                    &nbsp; &nbsp;
                                    <span className={`${styles.message_time} ${styles.float_right}`}>{date}</span>
                                </div>
                                {
                                    message.content ?
                                        <div className={`${styles.my_message} ${styles.align_right}`}>
                                            {message.content}
                                        </div>
                                        :
                                        <div className={`${styles.message_img} ${styles.align_right}`}>
                                            <img src={message.photo} alt="이미지" onClick={() => openImageModal(message.photo)} />
                                        </div>
                                }
                            </div>
                            :
                            <div>
                                <div className={styles.message_info}>
                                    <span className={`${styles.message_name} ${styles.float_left}`}>{message.fromBuyer}</span>
                                    &nbsp; &nbsp;
                                    <span className={`${styles.message_time} ${styles.float_left}`}>{date}</span>
                                </div>
                                {
                                    message.content ?
                                        <div className={`${styles.op_message} ${styles.align_left}`} ref={messageRef}>
                                            {message.content}
                                        </div>
                                        :
                                        <div className={`${styles.message_img} ${styles.align_left}`}>
                                            <img src={message.photo} alt="이미지" onClick={() => openImageModal(message.photo)} />
                                        </div>
                                }
                            </div>
                        }
                    </li>
                )
            })}
        </ul>
            </div>
            <Modal
                isOpen={selectedImage !== null}
                onRequestClose={closeImageModal}
                ariaHideApp={false}
                contentLabel="이미지 확대"
                style={{
                    content: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        width: '80%',
                        margin: '0 auto',
                        padding:'0',
                        marginTop:'50px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
                onClick={closeImageModal}
            >
                {selectedImage && (<img src={selectedImage} onClick={closeImageModal} style={{width:'100%', height:'100%', objectFit:'contain'}} />)}
            </Modal>
        </div>
    );
}, (prevProps, nextProps) => {
    if (prevProps.messages === nextProps.messages) {
        return true;
    }
    return false;
});

export default MessageList;
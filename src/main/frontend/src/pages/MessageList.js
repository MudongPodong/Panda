import React, {useEffect, useRef, useState} from 'react';
import styles from '../Css_dir/Chat.module.css'
import dayjs from 'dayjs';
import profile from "../imgs/profileEx.PNG";
import Modal from 'react-modal';

const MessageList = ({ messages, op_Id}) => {
    const scrollRef = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        scrollRef.current.scrollIntoView();
    }, [messages])

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <div className={styles.chat_header}>
                <div className={styles.chat_image}>
                    <img src={profile} width="100%" height="100%"></img>
                </div>
                <div className={styles.chat_info}>
                    <div className={styles.chat_name}>{op_Id}</div>
                </div>
            </div>
            <div className={styles.chat_history} >
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
                    date = date1.format('A h시 m분');

                return (
                    <li key={index}>
                        {
                            message.fromBuyer === false ?
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
                                        <div className={`${styles.op_message} ${styles.align_left}`}>
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
            <div ref={scrollRef}></div>
        </ul>
            </div>
            <Modal
                isOpen={selectedImage !== null}
                onRequestClose={closeImageModal}
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
};

export default MessageList;
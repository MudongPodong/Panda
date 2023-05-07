import React from 'react';
import styles from '../Css_dir/Chat.module.css'
import dayjs from 'dayjs';
import profileEx from '../imgs/profileEx.PNG'
import MessageImage from './MessageImage.js';

const MessageList = ({ messages }) => {
    return (
        <ul>
            {messages.map(message => {

                const date1 = dayjs(message.chatDate);
                const date2 = dayjs(new Date());
                let date;
                if(date2.diff(date1, 'year') > 0)
                    date = date1.format('yyyy년 M월 D일 A h시 m분');
                else if(date2.diff(date1, 'day') > 0)
                    date = date1.format('M월 D일 A h시 m분');
                else
                    date = date1.format('A h시 m분');

                // const photo = atob(message.photo);
                const blob = new Blob([message.photo], {type: 'image/PNG'});
                const imageUrl = URL.createObjectURL(blob);

                if(message.photo) {
                    console.log(message.photo);
                    console.log(blob);
                }
                return (
                    <li key={message.messageId}>
                        {
                            message.fromSender === false ?
                            <div>
                                <div className={styles.message_info}>
                                    <span className={`${styles.message_name} ${styles.float_right}`}>{message.fromSender}</span>
                                    &nbsp; &nbsp;
                                    <span className={`${styles.message_time} ${styles.float_right}`}>{date}</span>
                                </div>
                                <div className={`${styles.my_message} ${styles.align_right}`}>
                                    {
                                        message.content ?
                                        message.content
                                        :
                                            // <img src={imageUrl} alt="이미지" />
                                            <img src={imageUrl} alt="Image" onError={() => console.log('Error occurred while loading image.')} />
                                        // <MessageImage ImageData={message.photo}/>
                                    }
                                </div>
                            </div>
                            :
                            <div>
                                <div className={styles.message_info}>
                                    <span className={`${styles.message_name} ${styles.float_left}`}>{message.fromSender}</span>
                                    &nbsp; &nbsp;
                                    <span className={`${styles.message_time} ${styles.float_left}`}>{date}</span>
                                </div>
                                <div className={`${styles.op_message} ${styles.align_left}`}>
                                    {message.content ?
                                        message.content
                                        :
                                        // <img src={imageUrl} alt="Image" onError={() => console.log('Error occurred while loading image.')} />
                                        <MessageImage ImageData={message.photo}/>
                                    }
                                </div>
                            </div>
                        }
                    </li> )
            })}

        </ul>
    );
};

export default MessageList;
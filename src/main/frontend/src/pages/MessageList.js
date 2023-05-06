import React from 'react';
import styles from '../Css_dir/Chat.module.css'
import dayjs from 'dayjs';

const MessageList = ({ messages }) => {
    return (
        <ul>
            {messages.map(message => {

                const date1 = dayjs(message.chatDate);
                const date2 = dayjs(new Date());
                let date;
                if(date2.diff(date1, 'year') > 0)
                    date = date1.format('yyyy-MM-dd');
                else if(date2.diff(date1, 'day') > 0)
                    date = date1.format('MM-DD hh:mm A');
                else
                    date = date1.format('hh:mm A');

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
                                    {message.content}
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
                                    {message.content}
                                </div>
                            </div>
                        }
                    </li> )
            })}

        </ul>
    );
};

export default MessageList;
import React, {useEffect, useState} from 'react';
import styles from '../Css_dir/Chat.module.css'
import profile from "../imgs/profileEx.PNG";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const ChatList = ({ chatLists, onClick}) => {

    let currentSessionName = "diqzk1562";
    let currentSessionNickname = "네고안함";

    return (
        <ul>
            <li className={styles.profile_list}>
                <div className={styles.p_profile}>
                    <img src={profile} width="100%" height="100%"></img>
                </div>
                <div className={styles.p_info}>
                    <div className={styles.p_name}>{currentSessionNickname}</div>
                    <div className={styles.p_time}></div>
                    <div className={styles.p_last_message}></div>
                </div>
            </li>

            {chatLists.map(chatList => {
                const date1 = dayjs(chatList.lastDate);
                const date2 = dayjs(new Date());

                let diff;

                if (date2.diff(date1, 'year') > 0)
                    diff = date2.diff(date1, 'year') + "년 전";
                else if (date2.diff(date1, 'month') > 0)
                    diff = date2.diff(date1, 'month') + "달 전";
                else if (date2.diff(date1, 'week') > 0)
                    diff = date2.diff(date1, 'week') + "주 전";
                else if (date2.diff(date1, 'day') > 0)
                    diff = date2.diff(date1, 'day') + "일 전";
                else if (date2.diff(date1, 'hour') > 0)
                    diff = date2.diff(date1, 'hour') + "시간 전";
                else if (date2.diff(date1, 'minute') > 0)
                    diff = date2.diff(date1, 'minute')+ "분 전";
                else diff = "방금 전";

                return (
                    <li className = {styles.profile_list} key={chatList.roomId} onClick={() => onClick(chatList.roomId, chatList.sender.userId === currentSessionName ? chatList.receiver.nickname : chatList.sender.nickname)}>
                        <div className={styles.p_profile}>
                            <img src={profile} width="100%" height="100%"></img>
                        </div>
                        <div className={styles.p_info}>
                            {
                                chatList.sender.userId === currentSessionName ?
                                    <div className={styles.p_name}>
                                        {chatList.receiver.nickname}
                                    </div>
                                    :
                                    <div className={styles.p_name}>
                                        {chatList.sender.nickname}
                                    </div>
                            }
                            <div className={styles.p_time}>{diff}</div>
                            <div className={styles.p_last_message}>{chatList.lastContent}</div>
                        </div>
                    </li> )
            })}
        </ul>
    );
};

export default ChatList;
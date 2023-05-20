import React, {useEffect, useState} from 'react';
import styles from '../Css_dir/Chat.module.css'
import profile from "../imgs/profileEx.PNG";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const ChatList = React.memo(({ chatRooms, onClick, toChatList}) => {

    return (
        <ul>
            {chatRooms.map((chatList, index) => {
                const date1 = dayjs(chatList.lastDate);
                const date2 = dayjs(new Date());

                let diff;

                if (date2.diff(date1, 'year') > 0)
                    diff = date2.diff(date1, 'year') + "년 전";
                else if (date2.diff(date1, 'month') > 0)
                    diff = date2.diff(date1, 'month') + "달 전";
                else if (date2.diff(date1, 'week') > 0)
                    diff = date2.diff(date1, 'week') + "주 전";
                else if (date2.diff(date1, 'day') > 1)
                    diff = date2.diff(date1, 'day') + "일 전";
                else if (date2.diff(date1, 'day') == 1)
                    diff = "어제";
                else diff = `${date1.format("A h:mm")}`;

                return (
                    <li className = {`${styles.profile_list} ${index === toChatList.isClicked ? styles.profile_list_clicked : null}`} key={index} onClick={() => onClick(chatList.roomId,
                        chatList.buyer.email === toChatList.email ? chatList.seller.nickname : chatList.buyer.nickname,
                        chatList.buyer.email !== toChatList.email,
                        index)} >
                        <div className={styles.p_profile} >
                            <img src={profile} width="100%" height="100%"></img>
                        </div>
                        <div className={styles.p_info}>
                            {
                                chatList.buyer.email === toChatList.email ?
                                    <div className={`${index === toChatList.isClicked ? styles.black_color : styles.whitesmoke_color} ${styles.p_name}`}>
                                        {chatList.seller.nickname}
                                    </div>
                                    :
                                    <div className={`${index===toChatList.isClicked ? styles.black_color : styles.whitesmoke_color } ${styles.p_name}`}>
                                        {chatList.buyer.nickname}
                                    </div>
                            }
                            <div className={`${index===toChatList.isClicked ? styles.black_color : styles.whitesmoke_color } ${styles.p_time}`}>{diff}</div>
                            <div className={`${index===toChatList.isClicked ? styles.black_color : styles.whitesmoke_color} ${styles.p_last_message}`}>
                                {chatList.lastContent === null ?
                                    "사진" : chatList.lastContent}
                            </div>
                        </div>
                    </li> )
            })}
        </ul>
    );
}, (prevProps, nextProps) => {
    if (prevProps.chatRooms === nextProps.chatRooms &&
    prevProps.toChatList === nextProps.toChatList &&
    prevProps.onClick === nextProps.onClick)
    {
        return true;
    }
    return false;
});

export default ChatList;
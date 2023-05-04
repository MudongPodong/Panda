import React from 'react';
import '../App.css';
import '../Css_dir/chat.css'
import profile from "../imgs/profileEx.PNG";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');
const ChatList = ({ chatLists }) => {
    return (
        <ul>
            <li key={null}>
                <div className="p_profile">
                    <img src={profile} width="100%" height="100%"></img>
                </div>
                <div className="p_info">
                    <div className="p_name">사용자 1</div>
                    <div className="p_time"></div>
                    <div className="p_last_message"></div>
                </div>
            </li>

            {chatLists.map(chatList => {
                const date1 = dayjs(chatList.date);
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
                else if (date2.diff(date1, 'second') > 0)
                    diff = date2.diff(date1, 'second')+ "초 전";
                else diff = "방금 전";

                return (
                    <li key={chatList.roomId}>
                        <div className="p_profile">
                            <img src={profile} width="100%" height="100%"></img>
                        </div>
                        <div className="p_info">
                            <div className="p_name">{chatList.senderId}</div>
                            <div className="p_time">{diff}</div>
                            <div className="p_last_message">{chatList.lastContent}</div>
                        </div>
                    </li> )
            })}
        </ul>
    );
};

export default ChatList;
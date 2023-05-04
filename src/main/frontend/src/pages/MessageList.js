import React from 'react';
import '../App.css';
import '../Css_dir/chat.css'
import dayjs from 'dayjs';

const MessageList = ({ messages }) => {
    return (
        <ul>
            {messages.map(message => {

                const date1 = dayjs(message.date);
                const date2 = dayjs(new Date());
                let date;
                if(date2.diff(date1, 'year') > 0)
                    date = date1.format('yyyy-MM-dd');
                else if(date2.diff(date1, 'day') > 0)
                    date = date1.format('MM-dd hh:mm A');
                else
                    date = date1.format('hh:mm A');

                return (
                    <li key={message.messageId}>
                        {
                            message.fromSender === false ?
                                <div>
                                    <div className="message_info">
                                        <span className="message_name float_right">{message.fromSender}</span>
                                        &nbsp; &nbsp;
                                        <span className="message_time float_right">{date}</span>
                                    </div>
                                    <div className="my_message align_right">
                                        {message.content}
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="message_info">
                                        <span className="message_name float_left">{message.fromSender}</span>
                                        &nbsp; &nbsp;
                                        <span className="message_time float_left">{date}</span>
                                    </div>
                                    <div className="op_message align_left">
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
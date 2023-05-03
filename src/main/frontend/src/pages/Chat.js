import '../App.css';
import '../Css_dir/Chat.module.css'
import profile from '../profileEx.PNG'
import logo from "../logo192_192.png"

function App() {
    return (
        <div className="App">
            <div className="plist">
                <ul>
                    <li>
                        <div className="p_profile">
                            <img src={logo} width="100%" height="100%"></img>
                        </div>
                        <div className="p_info">
                            <div className="p_name">사용자 1</div>
                            <div className="p_time">5분전</div>
                            <div className="p_last_message">싫어</div>
                        </div>
                    </li>
                    <li>
                        <div className="p_profile">
                            <img src={profile} width="100%" height="100%"></img>
                        </div>
                        <div className="p_info">
                            <div className="p_name">사용자 2</div>
                            <div className="p_time">어제</div>
                            <div className="p_last_message">네고 가능?</div>
                        </div>
                    </li>
                    <li>
                        <div className="p_profile">
                            <img src={profile} width="100%" height="100%"></img>
                        </div>
                        <div className="p_info">
                            <div className="p_name">???????</div>
                            <div className="p_time">먼 옛날</div>
                            <div className="p_last_message">??</div>
                        </div>
                    </li>

                </ul>
            </div>
            <div className="chat_container">
                <div className="chat_header">
                    <div className="chat_image">
                        <img src={profile} width="100%" height="100%"></img>
                    </div>
                    <div className="chat_info">
                        <div className="chat_name">사용자 1</div>
                    </div>
                    <div className="chat_search">
                        검색 기능
                    </div>
                </div>
                <div className="chat_history">
                    <ul>
                        <li>
                            <div className="message_info">
                                <span className="message_name float_left">상대</span>
                                &nbsp; &nbsp;
                                <span className="message_time float_left">12:20</span>
                            </div>
                            <div class="op_message align_left">
                                네고 가능?
                            </div>
                        </li>
                        <li>
                            <div className="message_info">
                                <span className="message_name float_right">나</span>
                                &nbsp; &nbsp;
                                <span className="message_time float_right">12:21</span>
                            </div>
                            <div class="my_message align_right">
                                ㄴㄴ
                            </div>
                        </li>
                        <li>
                            <div className="message_info">
                                <span className="message_name float_left">상대</span>
                                &nbsp; &nbsp;
                                <span className="message_time float_left">12:21</span>
                            </div>
                            <div class="op_message align_left">
                                조금만
                            </div>
                        </li>
                        <li>
                            <div className="message_info">
                                <span className="message_name float_right">나</span>
                                &nbsp; &nbsp;
                                <span className="message_time float_right">12:25</span>
                            </div>
                            <div class="my_message align_right">
                                안됨
                            </div>
                        </li>
                        <li>
                            <div className="message_info">
                                <span className="message_name float_left">상대</span>
                                &nbsp; &nbsp;
                                <span className="message_time float_left">12:34</span>
                            </div>
                            <div class="op_message align_left">
                                해줘
                            </div>
                        </li>
                        <li>
                            <div className="message_info">
                                <span className="message_name float_right">나</span>
                                &nbsp; &nbsp;
                                <span className="message_time float_right">12:35</span>
                            </div>
                            <div class="my_message align_right">
                                싫어
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="chat_message">
                    <textarea name="send_message" placeholder="메시지를 입력하세요" rows="3"></textarea>
                    <button>전송</button>
                </div>
            </div>
        </div>
    );
}

export default App;

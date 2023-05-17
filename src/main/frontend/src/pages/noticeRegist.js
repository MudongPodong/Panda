import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import axios from 'axios';



    //db에 데이터를 넘겨줄때 작성
    const NoticeRegist = () => {

        const movePage = useNavigate();
        function alertmessage()
        {
            alert("정상 등록 되었습니다");
        }
        function nagative_alertmessage()
        {
            alert("등록 실패 !..");
        }
        function gohome() {
            movePage('/');
        }

        function gonoticepage()
        {
            movePage('/pages/noticePage');
        }

        let [title, setTitle] = useState('');
        let [content, setContent] = useState('');
        const handleSubmit = (e) => {
            e.preventDefault();

            //게시글 데이터
            const postData = {
                title: title,
                content: content
            };

            axios.post('/api/noticeRegist', postData)
                .then(response => {
                    console.log(response.data);
                    alertmessage();
                })
                .catch(error => {
                    console.error(error);
                    nagative_alertmessage();
                });

            // 게시글 작성 후 입력 필드 초기화
            setTitle('');
            setContent('');

        };


        return (
            <div>
                <div className={styles.board_wrap}>
                    <div className={styles.board_title}>
                        <strong>게시글 작성</strong>
                        <p>판매자는 하단 등록 버튼을 눌러 판매 등록을 할 수 있습니다.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.board_write_wrap}>
                            <div className={styles.board_write}>
                                <div className={styles.title}>
                                    <dl>
                                        <dt><label htmlFor={title}>제목</label></dt>
                                        <dd><input type="text" id="title" value={title} placeholder="제목 입력"
                                                   onChange={(e) => setTitle(e.target.value)}></input></dd>
                                    </dl>
                                </div>
                                <div className={styles.info}>
                                    <dl>
                                        <dt>글쓴이</dt>
                                        <dd><input type="text" placeholder="글쓴이 입력"></input></dd>
                                    </dl>
                                    <dl>
                                        <dt>등록물품(사진)이후 수정</dt>
                                        <dd><input type="password" placeholder="비밀번호 입력"></input></dd>
                                    </dl>
                                </div>
                                <div className={styles.cont}>
                                    <label htmlFor={content}></label>
                                    <textarea id="content" value={content} placeholder="내용 입력"
                                              onChange={(e) => setContent(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className={styles.bt_wrap}>
                                <button type={"submit"}  className={styles.on}>등록</button>
                                <a onClick={gonoticepage}>취소</a>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        );

    };


export default NoticeRegist;


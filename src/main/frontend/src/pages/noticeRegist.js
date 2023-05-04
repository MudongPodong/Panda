import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../../../../../Panda-main/src/main/frontend/src/Css_dir/notice.module.css";
import TopNav from "./top_navigation";
function NoticeRegist(){
    const movePage = useNavigate();
    function gohome() {
        movePage('/');
    }

    return(
        <div>
            <TopNav></TopNav>
        <div className={styles.board_wrap}>
            <div className={styles.board_title}>
                <strong>게시글 작성</strong>
                <p>판매자는 하단 등록 버튼을 눌러 판매 등록을 할 수 있습니다.</p>
            </div>
            <div className={styles.board_write_wrap}>
                <div className={styles.board_write}>
                    <div className={styles.title}>
                        <dl>
                            <dt>제목</dt>
                            <dd><input type="text" placeholder="제목 입력"></input></dd>
                        </dl>
                    </div>
                    <div className="info">
                        <dl>
                            <dt>글쓴이</dt>
                            <dd><input type="text" placeholder="글쓴이 입력"></input></dd>
                        </dl>
                        <dl>
                            <dt>비밀번호</dt>
                            <dd><input type="password" placeholder="비밀번호 입력"></input></dd>
                        </dl>
                    </div>
                    <div className={styles.cont}>
                        <textarea placeholder="내용 입력"></textarea>
                    </div>
                </div>
                <div className={styles.bt_wrap}>
                    <a onClick={gohome} className={styles.on}>등록</a>
                    <a onClick={gohome}>취소</a>
                </div>
            </div>
        </div>
        </div>
    );
}

export default NoticeRegist;

import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";

function NoticeConfirm()
{
    const movePage = useNavigate();
    function gonoticepage()
    {
        movePage('/pages/noticePage');
    }

    function gomodify()
    {
        movePage('/pages/noticeModify');
    }

    return(
        <div>
            <div className={styles.board_wrap}>
                <div className={styles.board_title}>
                    <strong>게시글 확인</strong>
                    <p>판매자가 등록한 물품정보를 확인 할 수 있습니다</p>
                </div>
            </div>
            <div className={styles.board_view_wrap}>
                <div className={styles.board_view}>
                    <div className={styles.title}>
                        <div>글 제목이 들어갑니다.&nbsp;&nbsp; <span className={styles.favorite_count}>찜: 회</span></div>
                        <button className={styles.favorite_btn}>찜등록</button>
                    </div>
                    <div className={styles.info}>
                        <dl>
                            <dt>번호</dt>
                            <dd>1</dd>
                        </dl>
                        <dl>
                            <dt>글쓴이</dt>
                            <dd>박민기</dd>
                        </dl>
                        <dl>
                            <dt>작성일</dt>
                            <dd>2023.05.05</dd>
                        </dl>
                        <dl>
                            <dt>조회</dt>
                            <dd>5조5억회</dd>
                        </dl>
                    </div>
                    <div className={styles.cont}>
                        글내용이 들어갑니다

                    </div>
                    <div className={styles.bt_wrap}>
                        <a onClick={gonoticepage} className={styles.on}>목록</a>
                        <a onClick={gomodify} >수정</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeConfirm;

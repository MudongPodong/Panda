import React from 'react';
import { useNavigate } from 'react-router-dom';
//test
import styles from "../../../../../../Panda-main/src/main/frontend/src/Css_dir/notice.module.css";
import navi from "../../../../../../Panda-main/src/main/frontend/src/Css_dir/navigation.module.css";
import logo from "../../../../../../Panda-main/src/main/frontend/src/imgs/logo192_192.png";
import TopNav from "./top_navigation";


function NoticePage(){
    const movePage = useNavigate();
    function gohome(){
        movePage('/');
    }
    function goregist()
    {
        movePage('/pages/noticeRegist');
    }

    return (
<div>
    <TopNav></TopNav>
    <div className={styles.board_wrap}>
        <div className={styles.board_title}>
            <strong>게시글 작성</strong>
            <p>판매자는 하단 등록 버튼을 눌러 판매 등록을 할 수 있습니다.</p>
        </div>
        <div className={styles.border_list_wrap}>
            <div className={styles.board_list}>
                <div className={styles.top}>
                    <div className={styles.num}>번호</div>
                    <div className={styles.title}>제목</div>
                    <div className={styles.writer}>글쓴이</div>
                    <div className={styles.date}>작성일</div>
                    <div className={styles.count}>조회</div>
                </div>
                <div>
                    <div className={styles.num}>1</div>
                    <div className={styles.title}><a href="#">글 제목</a></div>
                    <div className={styles.writer}>박민기</div>
                    <div className={styles.date}>2023.04.28</div>
                    <div className={styles.count}>33</div>
                </div>
                <div>
                    <div className={styles.num}>2</div>
                    <div className={styles.title}><a href="#">글 제목</a></div>
                    <div className={styles.writer}>박민기</div>
                    <div className={styles.date}>2023.04.28</div>
                    <div className={styles.count}>33</div>
                </div>
                <div>
                    <div className={styles.num}>3</div>
                    <div className={styles.title}><a href="#">글 제목</a></div>
                    <div className={styles.writer}>박민기</div>
                    <div className={styles.date}>2023.04.28</div>
                    <div className={styles.count}>33</div>
                </div>
                <div>
                    <div className={styles.num}>4</div>
                    <div className={styles.title}><a href="#">글 제목</a></div>
                    <div className={styles.writer}>박민기</div>
                    <div className={styles.date}>2023.04.28</div>
                    <div className={styles.count}>33</div>
                </div>
                <div>
                    <div className={styles.num}>5</div>
                    <div className={styles.title}><a href="#">글 제목</a></div>
                    <div className={styles.writer}>박민기</div>
                    <div className={styles.date}>2023.04.28</div>
                    <div className={styles.count}>33</div>
                </div>

            </div>
            <div className={styles.board_page}>
                <a href="#" className={'${styles.bt} ${styles.first}'}><b>〈〈</b></a>
                <a href="#" className={'${styles.bt} ${styles.prev}'}><b>〈</b></a>
                <a href="#" className={'${styles.num} ${styles.on}'}>1</a>
                <a href="#" className={styles.num}>2</a>
                <a href="#" className={styles.num}>3</a>
                <a href="#" className={styles.num}>4</a>
                <a href="#" className={styles.num}>5</a>
                <a href="#" className={'${styles.bt} ${styles.next}'}><b>〉</b></a>
                <a href="#" className={'${styles.bt} ${styles.last}'}><b>〉〉</b></a>
            </div>
            <div className={styles.bt_wrap}>
                <a onClick={goregist} className={styles.on}>등록</a>
            </div>
        </div>
    </div>
</div>



    );

}

export default NoticePage;
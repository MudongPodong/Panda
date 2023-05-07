import React from 'react';
import { useNavigate } from 'react-router-dom';
//test
import styles from "../Css_dir/notice.module.css";


function NoticePage(){
    const movePage = useNavigate();
    function gohome(){
        movePage('/');
    }
    function goregist()
    {
        movePage('/pages/noticeRegist');
    }

    function goconfirm()
    {
        movePage('/pages/noticeConfirm');
    }

    return (
<div className={styles.wrap}>
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
                    <div className={styles.title}><a href="#" onClick={goconfirm}>글 제목</a></div>
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
                <a href="#" className={styles.num}><b>〈〈</b></a>
                <a href="#" className={styles.num}><b>〈</b></a>
                <a href="#" className={styles.num}>1</a>
                <a href="#" className={styles.num}>2</a>
                <a href="#" className={styles.num}>3</a>
                <a href="#" className={styles.num}>4</a>
                <a href="#" className={styles.num}>5</a>
                <a href="#" className={styles.num}><b>〉</b></a>
                <a href="#" className={styles.num}><b>〉〉</b></a>
            </div>
            <div className={styles.bt_wrap}>
                <a onClick={goregist} className={styles.on}>등록</a>
            </div>
        </div>
    </div>
    <footer className={styles.footer}/>
</div>



    );

}

export default NoticePage;
import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import axios from "axios";

function NoticeConfirm({match})
{
    const movePage = useNavigate();
    const location=useLocation();
    const navigate = useNavigate();
    const writingInfo = { ...location.state };
    const listdata=new FormData();
    const [data, setData] = useState([])  //해당 게시글에 찜등록한 사람 수
    listdata.append('wid', writingInfo.word);  //이전 페이지에서 받아온 글id

    //게시글 상세 조회
    //const {id} = useParams();
    const [post , setPost] = useState(null); //게시글 내용을 가져오는 변수
    // const {postId} = match.params;
    function gonoticepage()
    {
        movePage('/pages/noticePage');
    }

    function gomodify()
    {
        movePage('/pages/noticeModify');
    }
    const Btn_register=()=>{    //찜등록하는 동작

        const favorite_regit=new FormData();

        favorite_regit.append('wid', writingInfo.word);

        axios.post('/api/favorite_register', favorite_regit,{     //post방식
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => {
            if(response.data ===1)alert('이미 등록한 제품입니다!');
            else if(response.data ===2) alert('자신의 제품을 찜 등록 할 수 없습니다!');
            else {
                alert('정상 등록 되었습니다.');
                window.location.reload();
            }
        })
            .catch(error=>{
            console.error(error);
        })
    }

    useEffect(() => {
        axios.post('/api/favorite_writing',listdata,{  //해당 게시글을 찜등록한 사람의 수를 카운팅해서 가져옴
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);


    //상세 게시글 조회 useEffect
    // useEffect(() => {
    //     fetch(`/api/noticeConfirm/${postId}`)
    //         .then(response => response.json())
    //         .then(data => setPost(data))
    //         .catch(error => console.log(error))
    // } , [postId]);

    /*if(!post)
    {
        return <div>불러오는 중입니다 잠시만 기다려 주십시오...!</div>;
    }*/

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
                        {/*{data =>*/}
                        {/*    <div>글 제목이 들어갑니다.&nbsp;&nbsp; <span className={styles.favorite_count}>찜:{data.favorite_count}회</span></div>*/}
                        {/*}*/}
                        <div>{data.writing_name}&nbsp;&nbsp; <span className={styles.favorite_count}>찜:{data.favorite_count}회</span></div>
                        <button className={styles.favorite_btn} onClick={Btn_register}>찜등록</button>
                    </div>
                    <div className={styles.info}>
                        <dl>
                            <dt>번호</dt>
                            {/*{location.search.toString().split("=").at(1)}*/}
                            <dd>{writingInfo.word}</dd>
                        </dl>
                        <dl>
                            <dt>글쓴이</dt>
                            {/*<dd>{post.user_name}</dd>*/}
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
                        {/*{post.content}*/}
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

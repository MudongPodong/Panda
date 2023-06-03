import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import axios from "axios";

function NoticeConfirm()
{
    const movePage = useNavigate();
    const location=useLocation();
    const navigate = useNavigate();
    const writingInfo = { ...location.state };
    const listdata=new FormData();
   // const writingdata = new FormData();
    const [data, setData] = useState([])  //해당 게시글에 찜등록한 사람 수
    listdata.append('wid', writingInfo.word);  //이전 페이지에서 받아온 글id
    const writingdata = new FormData();
    writingdata.append('wid',writingInfo.word);

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

    const goChat = () => {
        axios.post('/joinChat', {writing_Id: writingInfo.word}, {
            headers: {
                "Content-Type" : `application/json`
            },
        })
            .then(response => {
                if(response.data != '') {
                    console.log("채팅 페이지 이동");
                    window.open('/pages/Chat', '_blank');
                }
                else {
                    alert('당신의 글입니다');
                }
            })
            .catch(error => {
                console.log(error);
            });
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
     useEffect(() => {

         axios.post('/api/noticeConfirm',listdata,{
             headers: {
                 'Content-Type' : 'multipart/form-data'
            }
         })
            .then(response => setPost(response.data))
             .catch(error => console.log(error))
     } , []);


    //사용자 게시글 조회목록 등록 useEffect
    useEffect(() => {

        axios.post('/api/saveInquiry',writingdata,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    } , []);

     //게시글 삭제기능 구현
    const deletePost = (postId) => {
        axios.delete(`/api/posts/${postId}`)
            .then(response => {
                alert("게시글 삭제가 완료되었습니다!!");
                movePage("/pages/noticePage");
            })
            .catch(error => {
                alert("게시글이 존재하지 않거나 오류가 발생 하여 삭제 할 수 없습니다")
            });
    };


    const handleDelete = () => {
        deletePost(writingInfo.word);
    };
    
    
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
                            <dd>{data.user_name}</dd>
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
                        {data.content}
                    </div>
                    <div className={styles.bt_wrap}>
                        <a onClick={gonoticepage} className={styles.on}>목록</a>
                        <a onClick={gomodify} >수정</a>
                        <a onClick={handleDelete}>삭제</a>
                        <a onClick={goChat} className={styles.on}>채팅</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeConfirm;

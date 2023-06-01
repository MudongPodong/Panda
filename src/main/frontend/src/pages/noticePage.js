import React , {useState , useEffect} from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
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

    const [posts , setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/noticePage')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    },[]);

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
                            {posts.map(post => (
                            <div key={post.writing_Id}>

                                    <div className={styles.num}>{post.writing_Id}</div>
                                    <div className={styles.title}>
                                        {/*<Link to={`/post/${post.writing_Id}`}>{post.writing_name}</Link>*/}
                                        <Link to={`/pages/noticeConfirm/${post.writing_Id}`}>{post.writing_name}</Link>
                                    </div>
                                    <div className={styles.writer}>{post.user_name}</div>
                                    <div className={styles.date}>2023.04.28</div>
                                    <div className={styles.count}>33</div>


                            </div>
                            ))}

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
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

    //사용자가 입력한 데이터
    const [writing_name, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [detail_category , setDetailcategory] = useState('');
    const [count,setCount] = useState(0);
    const [price,setPrice] = useState(0);


    //이미지 , 게시글 데이터
    const [content_blob , setContentBlob] = useState(null);
    const [content , setContent] = useState('');

    //이미지 업로드
    const handleFileChange = (ev) => {
        setContentBlob(ev.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData();

        formdata.append('writing_name',writing_name);
        formdata.append('category',category);
        formdata.append('detail_category',detail_category);
        formdata.append('count',count);
        formdata.append('price',price);
        //formdata.append('image',content_blob);
        //formdata.append("content",content);
        /*이미지 데이터
        const postData =
        {
            content : content,
            content_blob : content_blob
        };*/



        axios.post("/api/noticeRegist", formdata,{     //post방식
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => {
                //console.log(response.data);
                alertmessage();
            })
            .catch(error => {
                console.error(error);
                nagative_alertmessage();
            });

        // 게시글 작성 후 입력 필드 초기화
        setTitle('');
        setContent('');
        setPrice(0);
        setCategory('');
        setDetailcategory('');
        setContent('');
        setContentBlob(null);
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
                                    <dt><label htmlFor={writing_name}>제목</label></dt>
                                    <dd><input type="text" id="writing_name" value={writing_name} placeholder="제목 입력"
                                               onChange={(e) => setTitle(e.target.value)}></input></dd>
                                </dl>
                            </div>
                            <div className={styles.info}>
                                <dl>
                                    <dt>카테고리</dt>
                                    <dd><input type="text" id="category" value={category} placeholder="카테고리를 입력하시오"
                                               onChange={(e) => setCategory(e.target.value)}></input></dd>
                                </dl>
                                <dl>
                                    <dt>카테고리(세부)</dt>
                                    <dd><input type="text" id = "detail_category" value={detail_category} placeholder="세부 카테고리 입력"
                                               onChange={(e) => setDetailcategory(e.target.value)}></input></dd>

                                </dl>
                                <dl>
                                    <dt>수량</dt>
                                    <dd><input type="text" id="count" value={count}
                                               onChange={(e) => setCount(e.target.value)}></input></dd>

                                </dl>
                                <dl>
                                    <dt>가격</dt>
                                    <dd><input type="text" id="price" value={price}
                                               onChange={(e) => setPrice(e.target.value)}></input></dd>

                                </dl>

                                <dl>
                                    <dt>사진 등록</dt>
                                    <dd><input type="file" onChange={handleFileChange}></input></dd>

                                </dl>

                            </div>
                            <div className={styles.cont}>
                                <textarea id="content" value={content} placeholder="제품 상세 설명을 입력하시오"
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
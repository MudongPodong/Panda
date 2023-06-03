import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import axios from 'axios';

const NoticeRegist = () => {
    const movePage = useNavigate();

    function alertmessage() {
        alert("정상 등록 되었습니다");
    }

    function nagative_alertmessage() {
        alert("등록 실패 !..");
    }

    function gohome() {
        movePage('/');
    }

    function gonoticepage() {
        movePage('/pages/noticePage');
    }

    const [writing_name, setTitle] = useState('');
    const [writing_photo, setWriting_photo] = useState(null); // Initialize with an empty string
    const [category, setCategory] = useState('');
    const [detail_category, setDetail_category] = useState('');
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');
    const imageInput = useRef();

    const handleFileChange = (event) => {    //이미지 업로드
        if(event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.');
            return;
        }

        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setWriting_photo(imageUrl);
            };
            reader.readAsDataURL(file);
        }


        //
        // const reader = new FileReader();
        // reader.onload = function (e) {
        //     setWriting_photo(e.target.result);
        // };
        // if (event.target.files.length > 0) { // Check if an image is selected
        //     reader.readAsDataURL(event.target.files[0]);
        // }
    };
    const imageSelectClick = () => {
        imageInput.current.click();
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     const formData = new FormData();
    //     formData.append('writing_name', writing_name);
    //     formData.append('writing_photo', writing_photo);
    //     formData.append('category', category);
    //     formData.append('detail_category', detail_category);
    //     formData.append('count', count);
    //     formData.append('price', price);
    //     formData.append('content', content);
    //
    //     axios.post("/api/noticeRegister", formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(response => {
    //             alertmessage();
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             nagative_alertmessage();
    //         });
    //
    //     setTitle('');
    //     setCount(0);
    //     setPrice(0);
    //     setCategory('');
    //     setDetail_category('');
    //     setContent('');
    //     setWriting_photo('');
    // };

    const registerInfo=()=>{
        if(writing_name===''){
            alert('글 제목을 입력해주세요!');
            return;
        }
        if(category===''){
            alert('카테고리를 입력해주세요!');
            return;
        }
        if(detail_category===''){
            alert('세부 카테고리를 입력해주세요!');
            return;
        }
        if(count===0){
            alert('수량 입력해주세요!');
            return;
        }
        if(price===0){
            alert('금액을 0원으로 책정할 수 없습니다!');
            return;
        }
        if(content===''){
            alert('글 내용을 입력해주세요!');
            return;
        }
        const writing={
            writing_name: writing_name,
            category: category,
            detail_category: detail_category,
            count: count,
            price: price,
            content: content,
            writingImg:writing_photo
        }
        axios.post('/api/noticeRegister', writing, {
            headers: {
                "Content-Type": `application/json`,
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow_Credentials':"true",
            },
        })
            .then((response) => {
                if(response.status === 200) {
                    alert('회원정보 변경 성공');
                    //window.location.reload();
                } else {
                    alert('요청이 이상함');
                }
            })
            .catch(error => {
                alert('알 수 없는 오류?');
            });
    }

    return (
        <div>
            <div className={styles.board_wrap}>
                <div className={styles.board_title}>
                    <strong>게시글 작성</strong>
                    <p>판매자는 하단 등록 버튼을 눌러 판매 등록을 할 수 있습니다.</p>
                </div>
                <form onSubmit={registerInfo} enctype={"multipart/form-data"}>
                    <div className={styles.board_write_wrap}>
                        <div className={styles.board_write}>
                            <div className={styles.title}>
                                <dl>
                                    <dt>{/*<label htmlFor={writing_name}></label>*/}제목</dt>
                                    <dd><input type="text" id="writing_name" value={writing_name} placeholder="제목 입력" onChange={(e) => setTitle(e.target.value)} /></dd>
                                </dl>
                            </div>
                            <div className={styles.info}>
                                <dl>
                                    <dt>카테고리</dt>
                                    <dd><input type="text" id="category" value={category} placeholder="카테고리를 입력하시오" onChange={(e) => setCategory(e.target.value)} /></dd>
                                </dl>
                                <dl>
                                    <dt>카테고리(세부)</dt>
                                    <dd><input type="text" id="detail_category" value={detail_category} placeholder="세부 카테고리 입력" onChange={(e) => setDetail_category(e.target.value)} /></dd>
                                </dl>
                                <dl>
                                    <dt>수량</dt>
                                    <dd><input type="text" id="count" value={count} onChange={(e) => setCount(e.target.value)} /></dd>
                                </dl>
                                <dl>
                                    <dt>가격</dt>
                                    <dd><input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} /></dd>
                                </dl>
                                <dl>
                                    <dt>사진 등록</dt>
                                    <dd>
                                        <input type="file" ref={imageInput} name="writing_photo" id="writing_photo" onChange={handleFileChange} />
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>대표 이미지 설정</dt>
                                    <dd>
                                        <img alt="미리보기" src={writing_photo} style={{ maxWidth: "100px" }} />
                                    </dd>
                                </dl>
                            </div>
                            <div className={styles.cont}>
                                <textarea id="content" value={content} placeholder="제품 상세 설명을 입력하시오" onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className={styles.bt_wrap}>
                            <button type="submit" className={styles.on}>등록</button>
                            <a onClick={gonoticepage}>취소</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoticeRegist;

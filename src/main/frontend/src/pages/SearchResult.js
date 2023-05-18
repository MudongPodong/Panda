import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import FixBar from "./FixBar";
import styles from '../Css_dir/SearchResult.module.css'
import axios from 'axios';


function SearchResult() {
    const [data, setData] = useState([])
    const location = useLocation();
    const navigate = useNavigate();

    //const userInfo = { ...location.state };
    const userInfo = { ...location.state };
    const listdata=new FormData();
    listdata.append('search_word', location.search.toString().split("=").at(1));

    const movePage= (event)=>{       //일단 아이디만 받아서 넘겨서 게시물 상세 페이지에서 백엔드로 데베 불어오는게 나을듯(WritingConten 테이블이랑, Writing 테이블 개체 다불러야함)

        let getId=event.currentTarget.id
        // const elements=event.currentTarget.querySelectorAll('div');
        // elements.forEach(function (element){
        //
        // });
        navigate('/pages/noticeConfirm?search='+getId, {state:{
            word:getId
            }});
    }

    useEffect(() => {
        axios.post('/api/searchResult',listdata,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <br/><br/><br/><br/><br/>
                <div className={styles.headTitle}>
                    <h1 className={styles.title}>검색 결과
                        <span>다음 검색 결과입니다..</span>
                    </h1>
                </div>
                <br/><br/>
                <div className={styles.btn_center}>
                    <button type="button" className={styles.btn_5}>인기순</button>
                    <button type="button" className={styles.btn_5}>가격순</button>
                    <button type="button" className={styles.btn_5}>판매순</button>
                </div>
                <br/>
                <div className={styles.container}>
                    {data.length === 0 ? (
                        <p style={{ fontSize: '25px' }}>받아온 데이터가 없습니다.</p>
                    ):(
                        <div>
                            {data.map(item=>(
                                <div className={styles.resultMap} onClick={movePage} id={item.writing_Id}>
                                    <img className={styles.content_picture} src="http://placekitten.com/150/150"></img>
                                    {/*<p> <b>{item.writing_name}</b> <br/>*/}
                                    {/*    [판매자]: {item.user_name} <br/>*/}
                                    {/*    가격: {item.price}원 <br/>*/}
                                    {/*    판매자 평점:{item.user_point}점</p>*/}
                                    <div> <b>{item.writing_name}</b></div>
                                    <div>  [판매자]: {item.user_name} </div>
                                    <div>    가격: {item.price} </div>
                                    <div>    판매자 평점:{item.user_point}</div>
                                </div>
                            ))}
                        </div>
                    )

                    }
                </div>
                <br/><br/>
                <hr/>
                <div className={styles.board_wraping}>
                    <div className={styles.board_paging}>
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
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>

        </div>
    );
}

export default SearchResult;
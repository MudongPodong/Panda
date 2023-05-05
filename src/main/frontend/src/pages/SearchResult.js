import React, {useEffect, useState} from 'react';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import FixBar from "./FixBar";
import styles from '../Css_dir/SearchResult.module.css'
import axios from 'axios';


function SearchResult() {
    const [data, setData] = useState([])
    const movePage= ()=>{
        document.location.href="/pages/OtherPage2";
    }


    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <FixBar></FixBar>
            <br/>
            <div className={styles.headTitle}>
                <h1 className={styles.title}>검색 결과
                    <span>다음 검색 결과입니다..</span>
                </h1>
            </div>
            <br/><br/>
            <div>
                <button type="button" className={styles.btn_5}>인기순</button>
                <button type="button" className={styles.btn_5}>가격순</button>
                <button type="button" className={styles.btn_5}>판매순</button>
            </div>

            <div className={styles.container}>
                {data.map(item=>(
                    <div className={styles.resultMap} onClick={movePage}>

                        <img className={styles.content_picture} src="http://placekitten.com/150/150" ></img>
                        <p> <b>김치라면</b> <br/>
                            [판매자]: 무동포동 <br/>
                            가격: 10,000원 <br/>
                            판매자 평점:*****</p>
                    </div>
                ))}
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

            <footer className={styles.footer_div}>

            </footer>

        </div>
    );
}

export default SearchResult;
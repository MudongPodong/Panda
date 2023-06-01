import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import ListVeiw from "./ListVeiw";
import axios from "axios";

function Home() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState([]);   // 추천 제품 리스트
    let [popular, setPopular] = useState([]);   // 인기상품 + 광고 리스트

    function goSearchResult(){
        //movePage('/pages/SearchResult');
    }

    useEffect(() => {   // 로그인 되었는지 확인
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                    return true;
                }
                else{
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    alert('로그인이 필요합니다.');
                    movePage('/pages/loginPage');
                }
            }).catch(error=>{
            console.error(error);
            console.log('need login');
            document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
            alert('로그인이 필요합니다.');
            movePage('/pages/loginPage');
        });
    },[]);
    useEffect(() => {   // 인기상품 + 광고 가져오기
        axios.get('/get/popular')
            .then((response)=>{
                console.log(response.data);
                setPopular(response.data);
            }).catch(error => {
            console.error(error);
        });
    },[]);
    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>
                        <section className={styles.top_section}>
                            <h1 className={styles.head}>추천 매물</h1>
                            <div className={styles.list_wrap}>
                                {/*<ListVeiw list={recommend_item}></ListVeiw>*/}
                                <ListVeiw></ListVeiw>
                            </div>
                            <div className={styles.more_wrap}>
                                <a className={styles.more} onClick={goSearchResult}>추천 매물 더 보기</a>
                            </div>
                        </section>
                        <section className={styles.mid_section}>
                            <h1 className={styles.head}>인기 매물</h1>
                            <div className={styles.rank_wrap}>
                                <ListVeiw list={popular}></ListVeiw>
                            </div>
                            <div className={styles.more_wrap}>
                                <a className={styles.more} onClick={goSearchResult}>인기 매물 더 보기</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default Home;

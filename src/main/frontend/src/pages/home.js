import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import ListVeiw from "./ListVeiw";
import axios from "axios";

function Home() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState('');

    const isLogin = () => {
        axios.post('/check')
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
    }
    function goSearchResult(){
        movePage('/pages/SearchResult');
    }
    isLogin();
    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>
                        <section className={styles.top_section}>
                            <h1 className={styles.head}>추천 매물</h1>
                            <div className={styles.list_wrap}>
                                <ListVeiw></ListVeiw>
                            </div>
                            <div className={styles.more_wrap}>
                                <a className={styles.more} onClick={goSearchResult}>추천 매물 더 보기</a>
                            </div>
                        </section>
                        <section className={styles.mid_section}>
                            <h1 className={styles.head}>인기 매물</h1>
                            <div className={styles.rank_wrap}>
                                <ListVeiw></ListVeiw>
                            </div>
                            <div className={styles.more_wrap}>
                                <a className={styles.more} onClick={goSearchResult}>인기 매물 더 보기</a>
                            </div>
                        </section>
                        <section className={styles.bottom_section}>
                            <h1 className={styles.head}>인기 검색어</h1>
                            <div className={styles.search_wrap}>
                                <ul>
                                    <li>검색어</li>
                                    <li>검색어</li>
                                    <li>검색어</li>
                                    <li>검색어</li>
                                    <li>검색어</li>
                                </ul>
                            </div>
                            <div className={styles.more_wrap}>
                                <a className={styles.more} onClick={goSearchResult}>인기 검색어 더 보기</a>
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

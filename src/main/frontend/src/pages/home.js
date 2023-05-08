import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import ListVeiw from "./ListVeiw";

function Home() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState('');
    function goSearchResult(){
        movePage('/pages/SearchResult');
    }
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

import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import TopNav from "./top_navigation";
import image from "../imgs/logo192_192.png"
import ListVeiw from "./ListVeiw";

function Home() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState('');

    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <TopNav/>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>
                        <h1 className={styles.head}>추천 매물</h1>
                        <div className={styles.list_wrap}>
                            <ListVeiw></ListVeiw>
                        </div>
                        <div className={styles.wrap_label}>
                            <a>추천 매물 더 보기</a>
                        </div>
                        <h1 className={styles.head}>인기 매물</h1>
                        <div className={styles.rank_wrap}>
                            <ListVeiw></ListVeiw>
                        </div>
                        <div className={styles.wrap_label}>
                            <a>인기 매물 더 보기</a>
                        </div>
                        <h1 className={styles.head}>인기 검색어</h1>
                        <div className={styles.search_wrap}>

                        </div>
                        <div className={styles.wrap_label}>
                            <a>인기 검색어 더 보기</a>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default Home;

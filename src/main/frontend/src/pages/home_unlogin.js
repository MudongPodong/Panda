import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';

function HomeUn() {
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
                        <p>홈페이지 - 로그인 하세요.</p>
                        <img src={'/imgs/logo512_512.png'}/>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default HomeUn;

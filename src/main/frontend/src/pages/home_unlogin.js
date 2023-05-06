import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import TopNav from "./top_navigation";

function HomeUn() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState('');
    function goSearchResult(){
        movePage('/pages/SearchResult');
    }
    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <TopNav/>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>

                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default HomeUn;

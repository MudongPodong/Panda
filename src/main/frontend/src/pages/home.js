import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import TopNav from "./top_navigation";
function Home() {
    const movePage = useNavigate();

    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <TopNav/>
            <p><br></br><br></br><br></br><br></br><br></br><br></br>홈화면</p>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default Home;

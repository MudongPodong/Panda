import styles from '../Css_dir/navigation.module.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import logo from '../imgs/logo192_192.png';

function Home() {
    const movePage = useNavigate();
    function gohome(){
        window.location.replace('/');
    }
    function gologin(){
        movePage('/pages/loginpage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <div className={styles.black_nav}>
                    <h1 className={styles.logo}>
                        <a onClick={gohome} className={styles.home_link}>
                            <img src={logo} alt='panda' width={21} height={21}></img>
                            <span className={styles.need_img}>PANDA</span>
                        </a>
                    </h1>
                    <nav className={styles.left_nav}>
                        <ul className={styles.top_list}>
                            <li className={styles.tlist_item}>
                                <a className={styles.tlist_item_a} href="">
                                    <span className={styles.tlist_text}>리스트아이템</span>
                                </a>
                            </li>
                            <li className={styles.tlist_item}>
                                <a className={styles.tlist_item_a} href="">
                                    <span className={styles.tlist_text}>리스트아이템</span>
                                </a>
                            </li>
                            <li className={styles.tlist_item}>
                                <a className={styles.tlist_item_a} href="">
                                    <span className={styles.tlist_text}>리스트아이템</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav className={styles.right_nav}>
                        <ul className={styles.top_list}>
                            <li className={styles.tlist_item}>
                                <a className={styles.tlist_item_a} href="">
                                    <span className={styles.tlist_text}>123</span>
                                </a>
                            </li>
                            <li className={styles.tlist_item}>
                                <a className={styles.tlist_item_a} onClick={gologin}>
                                    <span className={styles.tlist_text}>LogIn</span>
                                </a>
                            </li>
                            <li className={styles.tlist_item}>
                                <a className={styles.tlist_item_a} href="">
                                    <span className={styles.tlist_text}>123</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            <p><br></br><br></br><br></br><br></br><br></br><br></br>홈화면</p>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default Home;

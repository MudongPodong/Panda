import styles from '../Css_dir/navigation.module.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import logo from '../imgs/logo192_192.png';
import Sidebar from "./sidebar";
import Searchbar from "./searchbar";


function TopNav() {
    const movePage = useNavigate();

    function gohome() {
        window.location.replace('/');
    }

    function gologin() {
        movePage('/pages/loginpage');
    }

    function gonotice()
    {
        movePage('/pages/noticePage');
    }

    return (
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
                            <span className={styles.tlist_text}>카테고리</span>
                        </a>
                    </li>
                    <li className={styles.tlist_item}>
                        <a className={styles.tlist_item_a} href="">
                            <span className={styles.tlist_text}>챗봇</span>
                        </a>
                    </li>
                    <li className={styles.tlist_item}>
                        <a className={styles.tlist_item_a}>
                            <form name='search' id='search_form' method='get'>
                                <input type='text' className={`${styles.tlist_text} ${styles.search_input}`}
                                       placeholder='  검색' name='search'></input>
                            </form>
                        </a>
                        <button type='submit' form='search_form'
                                className={`${styles.tlist_text} ${styles.search_input_btn}`}></button>
                        <Searchbar></Searchbar>
                    </li>
                </ul>
            </nav>
            <nav className={styles.right_nav}>
                <ul className={styles.top_list}>
                    <li className={styles.tlist_item}>
                        <a className={styles.tlist_item_a} onClick={gonotice}>
                            <span className={styles.tlist_text}>판매등록</span>
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
            <Sidebar></Sidebar>
        </div>
    );
}

export default TopNav;

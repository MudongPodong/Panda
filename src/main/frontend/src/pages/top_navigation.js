import styles from '../Css_dir/navigation.module.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import logo from '../imgs/logo192_192.png';
import green_logo from '../imgs/green_logo_192_192.png';
import Sidebar from "./sidebar";
import Searchbar from "./searchbar";


function TopNav() {
    const movePage = useNavigate();

    function goHome() {
        movePage('/');
    }
    function goSearchResult(){
        movePage('/pages/SearchResult');
    }

    function goLogin() {
        movePage('/pages/loginPage');
    }

    function goNotice()
    {
        movePage('/pages/noticePage');
    }

    function goMypage()
    {
        movePage('/pages/OtherPage2');
    }

    function goChat(){
        movePage('/pages/Chat');
    }

    return (
        <div className={styles.black_nav}>
            <div className={styles.logo_box} onClick={goHome} >
                <h1 className={styles.logo}>
                    <a className={styles.home_link}>
                        <div className={styles.logo_img_wrap}>
                            <img src={green_logo} alt='panda' width={21} height={21} className={styles.green_logo_img}></img>
                            <img src={logo} alt='panda' width={21} height={21} className={styles.logo_img}></img>
                        </div>
                        <span className={styles.need_img}>PANDA</span>
                    </a>
                </h1>
            </div>
            <nav className={styles.left_nav}>
                <ul className={styles.top_list}>
                    <div className={styles.category_wrap}>
                        <li className={`${styles.tlist_item} ${styles.category}`}>
                            <a className={styles.tlist_item_a} href="">
                                <span className={styles.tlist_text}>카테고리 ▼</span>
                            </a>
                        </li>
                        <div className={styles.category_content}>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <a onClick={goSearchResult}><div className={styles.line}></div>카테고리</a>
                            <div className={styles.bottom_line}></div>
                        </div>
                    </div>
                    <li className={styles.tlist_item} onClick={goChat}>
                        <a className={styles.tlist_item_a}>
                            <span className={styles.tlist_text}>채팅</span>
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
                                className={`${styles.tlist_text} ${styles.search_input_btn}`} onClick={goSearchResult}></button>
                        <Searchbar></Searchbar>
                    </li>
                </ul>
            </nav>
            <nav className={styles.right_nav}>
                <ul className={styles.top_list}>
                    <li className={styles.tlist_item} onClick={goNotice}>
                        <a className={styles.tlist_item_a}>
                            <span className={styles.tlist_text}>판매등록</span>
                        </a>
                    </li>
                    <li className={styles.tlist_item} onClick={goLogin}>
                        <a className={styles.tlist_item_a}>
                            <span className={styles.tlist_text}>LogIn</span>
                        </a>
                    </li>
                    <li className={styles.tlist_item} onClick={goMypage}>
                        <a className={styles.tlist_item_a} href="">
                            <span className={styles.tlist_text}>마이페이지</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <Sidebar></Sidebar>
        </div>
    );
}

export default TopNav;

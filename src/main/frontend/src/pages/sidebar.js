import React, {useEffect, useRef, useState } from "react";
import styles from "../Css_dir/sidebar.module.css";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sideClickRef = useRef(null);
    // button 클릭 시 토글
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    //사이드바 외부 클릭시 닫히는 함수
    useEffect(()=> {
        function handleClose(e){
            if (isOpen==true && (sideClickRef.current && !sideClickRef.current.contains(e.target))) {
                setIsOpen(false);
            }
        }
        window.addEventListener('mousedown', handleClose);
        return () => {
            window.removeEventListener('mousedown', handleClose);
        };
    }, [isOpen]);

    const movePage = useNavigate();

    function goChat(){
        movePage('/pages/chat');
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

    return (
        <div className={styles.header} ref={sideClickRef}>
            <div className={styles.logo_box}>
                <button className={styles.logo} width='35px'></button>
                <button className={(!isOpen ? `${styles.logo}` : `${styles.exit}`)} width='35px' onClick={toggleMenu}></button>
                <div className={styles.line}></div>
            </div>
            <div className={(isOpen ? `${styles.show_menu}` : `${styles.hide_menu}`)}>
                <div className={styles.search_box}>
                    <form name='search' id='search_form_s' method='get'>
                        <input type='text' className={styles.search_input} placeholder='  검색' name='search'></input>
                    </form>
                    <div className={styles.search_btn_wrap}>
                        <button type='submit' form='search_form_s' className={styles.search_input_btn} onClick={goSearchResult}></button>
                    </div>
                </div>
                <div>
                    <br/><br/>
                    최근 검색 or 추천검색 등
                </div>
                <ul className={styles.nav_list}>
                    <li className={styles.nav_list_item}>카테고리<div className={styles.list_line}></div></li>
                    <li className={styles.nav_list_item} onClick={goChat}>챗봇<div className={styles.list_line}></div></li>
                    <li className={styles.nav_list_item} onClick={goNotice}>판매등록<div className={styles.list_line}></div></li>
                    <li className={styles.nav_list_item} onClick={goLogin}>로그인<div className={styles.list_line}></div></li>
                    <li className={styles.nav_list_item} onClick={goMypage}>마이페이지<div className={styles.list_line}></div></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
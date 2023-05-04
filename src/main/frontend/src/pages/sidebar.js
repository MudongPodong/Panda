import React, {useEffect, useRef, useState } from "react";
import logo from '../imgs/menu_logo.png';
import exit from '../imgs/close_logo.png';
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

    function gomypage()
    {
        movePage('/pages/OtherPage2');
    }

    return (
        <div className={styles.header} ref={sideClickRef}>
            <div className={styles.logo_box}>
                <img className={styles.logo} src={logo} width='35px' onClick={toggleMenu}></img>
                <img className={(isOpen ? `${styles.logo}` : `${styles.exit}`)} src={exit} width='35px' onClick={toggleMenu}></img>
                <img className={styles.exit} src={logo} width='35px' onClick={toggleMenu}></img>
            </div>
            <div className={(isOpen ? `${styles.show_menu}` : `${styles.hide_menu}`)}>
                <div className={styles.search_box}>
                    <form name='search' id='search_form_h' method='get'>
                        <input type='text' className={styles.search_input} placeholder='  검색' name='search'></input>
                    </form>
                    <button type='submit' form='search_form_h'
                            className={styles.search_input_btn}></button>
                </div>
                <div>
                    <br/><br/>
                    최근 검색 or 추천검색 등
                </div>
                <ul className={styles.nav_list}>
                    <li className={styles.nav_list_item}>카테고리</li>
                    <li className={styles.nav_list_item}>챗봇</li>
                    <li className={styles.nav_list_item} onClick={gonotice}>판매등록</li>
                    <li className={styles.nav_list_item} onClick={gologin}>로그인</li>
                    <li className={styles.nav_list_item} onClick={gomypage}>마이페이지</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
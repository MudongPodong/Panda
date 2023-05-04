import Login from './login';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Css_dir/login_mem.module.css";
import TopNav from "./top_navigation";

function LogInPage() {
    const movePage = useNavigate();
    
    function gohome(){
        movePage('/');
    }
    function gologin(){
        window.location.replace('/pages/loginpage');
    }
    function goMem(){
        movePage('/pages/joinmempage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.login_page}>
                <TopNav />
                <div className={styles.login_wrap}>
                    <div className={styles.login_box}>
                        <h1 className={styles.login_head}>LogIn</h1>
                        <div className={styles.login_input_form}>
                            <Login />
                            <div className={styles.login_btn_wrap}>
                                <button type="button" className={styles.mem_btn_under}>회원가입</button>
                                <button type="button" className={styles.mem_btn} onClick={goMem}>회원가입</button>
                            </div>
                        </div>
                        <div className={styles.login_setting}>
                            <p>
                                <a href=''>아이디 찾기</a>
                                <a href=''>비밀번호 찾기</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default LogInPage;

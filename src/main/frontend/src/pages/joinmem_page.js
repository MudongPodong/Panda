import Mem from './mem';
import styles from '../Css_dir/login_mem.module.css';
import logo from '../imgs/logo192_192.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from "./top_navigation";

function MemPage() {
    const movePage = useNavigate();
    
    function gohome(){
        movePage('/');
    }
    function gologin(){
        movePage('/pages/loginpage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.login_page}>
                <TopNav/>
                <div className={styles.login_wrap}>
                    <div className={styles.login_box}>
                        {/*<h1 className={styles.login_head}>Join Membership</h1>*/}
                        <h1>Join Membership</h1>
                        <div className={styles.login_input_form}>
                            <Mem />
                            <button type="button" className={styles.cancle_btn} onClick={gologin}>취소</button>
                        </div>
                    </div>
                </div>

            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default MemPage;

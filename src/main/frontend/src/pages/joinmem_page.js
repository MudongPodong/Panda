import Mem from './mem';
import styles from '../Css_dir/login_mem.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MemPage() {
    const movePage = useNavigate();

    function goLogin(){
        movePage('/pages/loginPage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.login_page}>
                <div className={styles.login_wrap}>
                    <div className={styles.login_box}>
                        <h1>Join Membership</h1>
                        <div className={styles.login_input_form}>
                            <Mem />
                            <div className={styles.login_btn_wrap}>
                                <button type="button" className={styles.cancel_btn_under}>취소</button>
                                <button type="button" className={styles.cancel_btn} onClick={goLogin}><span>취소</span></button>
                            </div>
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

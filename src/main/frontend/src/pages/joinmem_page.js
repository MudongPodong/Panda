import Mem from './mem';
import styles from '../Css_dir/login_mem.module.css';
import logo from '../imgs/logo192_192.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
                <div className={styles.login_wrap}>
                    <div className={styles.login_box}>
                        <h1>Join Membership</h1>
                        <div className={styles.login_input_form}>
                            <Mem />
                            <button type="submit" form='mem_form' className={styles.mem_btn} onClick={() => {
                                alert('회원가입 성공');
                                gologin();
                            }}>회원가입</button>

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

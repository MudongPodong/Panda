import Mem from './mem';
import styles from '../Css_dir/login_mem.module.css';
import navi from '../Css_dir/navigation.module.css';
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
        <div className={navi.App}>
            <div className={styles.login_page}>
                <div className={navi.black_nav}>
                    <h1 className={navi.logo}>
                        <a onClick={gohome} className={navi.home_link}>
                            <img src={logo} alt='panda' width={21} height={21}></img>
                            <span className={navi.need_img}>PANDA</span>
                        </a>
                    </h1>
                    <nav className={navi.left_nav}>
                        <ul className={navi.top_list}>
                            <li className={navi.tlist_item}>
                                <a className={navi.tlist_item_a} href="">
                                    <span className={navi.tlist_text}>리스트아이템</span>
                                </a>
                            </li>
                            <li className={navi.tlist_item}>
                                <a className={navi.tlist_item_a} href="">
                                    <span className={navi.tlist_text}>리스트아이템</span>
                                </a>
                            </li>
                            <li className={navi.tlist_item}>
                                <a className={navi.tlist_item_a} href="">
                                    <span className={navi.tlist_text}>리스트아이템</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav className={navi.right_nav}>
                        <ul className={navi.top_list}>
                            <li className={navi.tlist_item}>
                                <a className={navi.tlist_item_a} href="">
                                    <span className={navi.tlist_text}>123</span>
                                </a>
                            </li>
                            <li className={navi.tlist_item}>
                                <a className={navi.tlist_item_a} onClick={gologin}>
                                    <span className={navi.tlist_text}>LogIn</span>
                                </a>
                            </li>
                            <li className={navi.tlist_item}>
                                <a className={navi.tlist_item_a} href="">
                                    <span className={navi.tlist_text}>123</span>
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
            <footer className={navi.footer_div}>

            </footer>
        </div>
    );
}

export default MemPage;

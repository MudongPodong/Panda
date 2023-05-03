import styles from '../Css_dir/fixbar.module.css';
import React, {useEffect, useState} from 'react';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import OtherPage from "./OtherPage";
import OtherPage2 from "./OtherPage2";
import BoughtList from "./BoughtList";
import logo from "../logo192_192.png"
import profile from '../profileEx.PNG'
import SearchResult from "./SearchResult";

function FixBar() {
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <div className={styles.blackNav}>
                <h1 className={styles.logo}>
                    <a href="" className={styles.home_link}>
                        <img src={logo} width={21} height={21}/>
                        <span className={styles.need_img}>PANDA</span>
                    </a>
                </h1>

                {/*<nav className='left_nav'>*/}
                {/*  <ul className='top_list'>*/}
                {/*    <li className='tlist_item'>*/}
                {/*      <a className='tist_item_a' href="">*/}
                {/*        <span class="tlist_text">리스트아이템</span>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*    <li className='tlist_item'>*/}
                {/*      <a className='tist_item_a' href="">*/}
                {/*        <span className="tlist_text">리스트아이템</span>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*    <li className='tlist_item'>*/}
                {/*      <a className='tist_item_a' href="">*/}
                {/*        <span className="tlist_text">리스트아이템</span>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*  </ul>*/}
                {/*</nav>*/}

                {/*<nav className='right_nav'>*/}
                {/*  <ul className='top_list'>*/}
                {/*    <li className='tlist_item'>*/}
                {/*      <a className='tist_item_a' href="">*/}
                {/*        <span className="tlist_text">123</span>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*    <li className='tlist_item'>*/}
                {/*      <a className='tist_item_a' href="">*/}
                {/*        <span className="tlist_text">Login</span>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*    <li className='tlist_item'>*/}
                {/*      <a className='tist_item_a' href="">*/}
                {/*        <span className="tlist_text">123</span>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*  </ul>*/}
                {/*</nav>*/}
            </div>
            {/* black-nav */}

            {/* 마이페이지 */}
            <div className={styles.my_page}>
                <div className={styles.profile_background}>
                    <div className={styles.profile_image}>
                        <img src={profile} width="100%" height="100%"/>
                    </div>
                    <div className={styles.profile_content}>
                        <div className={styles.p_nickname}>
                            닉네임
                        </div>
                        <div className={styles.p_point}>
                            97명의 사람들이 당신을 추천합니다!
                        </div>
                    </div>
                </div>
                {/* <div className="my_page_text"> 마이페이지 </div> */}
                <div className={styles.my_page_tab}>
                    <ul>
                        <li><Link to="/pages/OtherPage">회원 정보</Link></li>
                        <li><Link to="/pages/OtherPage2">찜 목록</Link></li>
                        <li><Link to="/pages/BoughtList">구매 이력</Link></li>
                        <li><Link to="/pages/SearchResult">문의 내역</Link></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/pages/OtherPage" element={<OtherPage/>}></Route>
                <Route path="/pages/OtherPage2" element={<OtherPage2/>}></Route>
                <Route path="/pages/BoughtList" element={<BoughtList/>}></Route>
                <Route path="/pages/SearchResult" element={<SearchResult/>}></Route>
            </Routes>
        </div>
    );
}

export default FixBar;
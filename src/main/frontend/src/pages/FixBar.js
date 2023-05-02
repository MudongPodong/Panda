import '../Css_dir/fixbar.css';
import React, {useEffect, useState} from 'react';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import OtherPage from "./OtherPage";
import OtherPage2 from "./OtherPage2";
import BoughtList from "./BoughtList";

function FixBar() {
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <div className="black-nav">
                <h1 className="logo">
                    <a href="" className="home_link">
                        <img src=" http://placekitten.com/150/150" width={21} height={21}/>
                        <span className="need_img">PANDA</span>
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
            <div className="my_page">
                <div className="profile_background">
                    <div className="profile_image">
                        <img src=" http://placekitten.com/150/150" width="100%" height="100%"/>
                    </div>
                    <div className="profile_content">
                        <div className="p_nickname">
                            닉네임
                        </div>
                        <div className="p_point">
                            97명의 사람들이 당신을 추천합니다!
                        </div>
                    </div>
                </div>
                {/* <div className="my_page_text"> 마이페이지 </div> */}
                <div className="my_page_tab">
                    <ul>
                        <li><Link to="/pages/OtherPage">회원 정보</Link></li>
                        <li><Link to="/pages/OtherPage2">찜 목록</Link></li>
                        <li><Link to="/pages/BoughtList">구매 이력</Link></li>
                        <li><Link to="/pages/OtherPage2">문의 내역</Link></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/pages/OtherPage" element={<OtherPage/>}></Route>
                <Route path="/pages/OtherPage2" element={<OtherPage2/>}></Route>
                <Route path="/pages/BoughtList" element={<BoughtList/>}></Route>
            </Routes>
        </div>
    );
}

export default FixBar;
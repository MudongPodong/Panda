import styles from '../Css_dir/navigation.module.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import logo from '../imgs/logo192_192.png';
import green_logo from '../imgs/green_logo_192_192.png';
import Sidebar from "./sidebar";
import Searchbar from "./searchbar";
import axios from "axios";


function TopNav() {
    const movePage = useNavigate();

    function goHome() {
        movePage('/');
    }
    function goSearchResult(){   //입력해서 검색
        const query='input[id=search_input]';
        const searchElement=document.querySelector(query);
        const search_word=searchElement.value;

        // axios.post('/api/searchResult', searchdata,{     post방식
        //     headers: {
        //         'Content-Type' : 'multipart/form-data'
        //     }
        // }).then((response)=>{
        //     console.log('성공');
        // }).catch(error=>{
        //     console.error(error);
        // })

        if(searchElement.value.length >=2){
            const searchdata=new FormData();
            searchdata.append('word', search_word);
            movePage('/pages/SearchResult', {state:{word:search_word}});
        }
    }
    function goCategorySearch(event){    //카테고리 검색

        console.log(event.currentTarget.id);
        const searchdata=new FormData();
        searchdata.append('word', event.currentTarget.id);
        movePage('/pages/SearchResult?search='+event.currentTarget.id, {state:{word:event.currentTarget.id}});
        //movePage('/pages/SearchResult', {state:{word:event.currentTarget.id}});
    }

    function goLogin() {
        movePage('/pages/loginPage');
    }
    function logout(){
        //document.cookie = "JSESSIONID=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
        axios.get('/logout')
            .then((response)=> {
                if(response.status === 200) {
                    console.log('로그아웃 성공');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    alert('로그아웃 되었습니다.');
                    movePage('/');
                    window.location.reload();
                }
                else {
                    console.log('로그아웃 실패');
                    alert('로그아웃 실패');
                }
            })
            .catch(error => {
                console.error(error);
                console.log('로그아웃 실패');
                alert('로그아웃 실패');
            });
        //alert('로그아웃 되었습니다.');
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
                            <a className={styles.tlist_item_a}>
                                <span className={styles.tlist_text}>카테고리 ▼</span>
                            </a>
                        </li>
                        <div className={styles.category_content}>
                            {/*기타 (게임,중고차,여행용품)*/}
                            {/*<a onClick={goCategorySearch} id="의류"><div className={styles.line} onClick={goCategorySearch} id="의류"></div>의류</a>*/}
                            {/*<a onClick={goCategorySearch} id="뷰티"><div className={styles.line}></div>뷰티</a>*/}
                            {/*<a onClick={goCategorySearch} id="가구/인테리어"><div className={styles.line}></div>가구/인테리어</a>*/}
                            {/*<a onClick={goCategorySearch} id="가전제품"><div className={styles.line}></div>가전제품</a>*/}
                            {/*<a onClick={goCategorySearch} id="모바일/태블릿/PC"><div className={styles.line}></div>모바일/태블릿/PC</a>*/}
                            {/*<a onClick={goCategorySearch} id="생활용품"><div className={styles.line}></div>생활용품</a>*/}
                            {/*<a onClick={goCategorySearch} id="반려동물"><div className={styles.line}></div>반려동물</a>*/}
                            {/*<a onClick={goCategorySearch} id="문구/도서"><div className={styles.line}></div>문구/도서</a>*/}
                            {/*<a onClick={goCategorySearch} id="티켓/쿠폰"><div className={styles.line}></div>티켓/쿠폰</a>*/}
                            {/*<a onClick={goCategorySearch} id="스포츠"><div className={styles.line}></div>스포츠</a>*/}
                            {/*<a onClick={goCategorySearch} id="자동차용품"><div className={styles.line}></div>자동차용품</a>*/}
                            <a onClick={goCategorySearch} id="의류">
                                <div className={styles.line}></div>
                                <form name='search_clothes' id='search_clothes' method='get'>
                                    <input name='search_clothes' id='search_clothes' placeholder='  검색'value="의류" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_clothes" onClick={goCategorySearch} className={styles.category_btn}>의류</button>
                            </a>
                            <a onClick={goCategorySearch} id="뷰티">
                                <div className={styles.line}></div>
                                <form name='search_beauty' id='search_beauty' method='get'>
                                    <input name='search_beauty' id='search_beauty' placeholder='  검색'value="뷰티" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_beauty" onClick={goCategorySearch} className={styles.category_btn}>뷰티</button>
                            </a>
                            <a onClick={goCategorySearch} id="가구/인테리어">
                                <div className={styles.line}></div>
                                <form name='search_furniture' id='search_furniture' method='get'>
                                    <input name='search_furniture' id='search_furniture' placeholder='  검색'value="가구/인테리어" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_furniture" onClick={goCategorySearch} className={styles.category_btn}>가구/인테리어</button>
                            </a>
                            <a onClick={goCategorySearch} id="가전제품">
                                <div className={styles.line}></div>
                                <form name='search_eletronics' id='search_eletronics' method='get'>
                                    <input name='search_eletronics' id='search_eletronics' placeholder='  검색'value="가전제품" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_eletronics" onClick={goCategorySearch} className={styles.category_btn}>가전제품</button>
                            </a>
                            <a onClick={goCategorySearch} id="모바일/태블릿/PC">
                                <div className={styles.line}></div>
                                <form name='search_mobile' id='search_mobile' method='get'>
                                    <input name='search_mobile' id='search_mobile' placeholder='  검색'value="모바일/태블릿/PC" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_mobile" onClick={goCategorySearch} className={styles.category_btn}>모바일/태블릿/PC</button>
                            </a>
                            <a onClick={goCategorySearch} id="생활용품">
                                <div className={styles.line}></div>
                                <form name='search_life' id='search_life' method='get'>
                                    <input name='search_life' id='search_life' placeholder='  검색'value="생활용품" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_life" onClick={goCategorySearch} className={styles.category_btn}>생활용품</button>
                            </a>
                            <a onClick={goCategorySearch} id="반려동물">
                                <div className={styles.line}></div>
                                <form name='search_animal' id='search_animal' method='get'>
                                    <input name='search_animal' id='search_animal' placeholder='  검색'value="반려동물" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_animal" onClick={goCategorySearch} className={styles.category_btn}>반려동물</button>
                            </a>
                            <a onClick={goCategorySearch} id="문구/도서">
                                <div className={styles.line}></div>
                                <form name='search_book' id='search_book' method='get'>
                                    <input name='search_book' id='search_book' placeholder='  검색'value="문구/도서" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_book" onClick={goCategorySearch} className={styles.category_btn}>문구/도서</button>
                            </a>
                            <a onClick={goCategorySearch} id="티켓/쿠폰">
                                <div className={styles.line}></div>
                                <form name='search_ticket' id='search_ticket' method='get'>
                                    <input name='search_ticket' id='search_ticket' placeholder='  검색'value="티켓/쿠폰" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_ticket" onClick={goCategorySearch} className={styles.category_btn}>티켓/쿠폰</button>
                            </a>
                            <a onClick={goCategorySearch} id="스포츠">
                                <div className={styles.line}></div>
                                <form name='search_sports' id='search_sports' method='get'>
                                    <input name='search_sports' id='search_input' placeholder='  검색'value="스포츠" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_sports" onClick={goCategorySearch} className={styles.category_btn}>스포츠</button>
                            </a>
                            <a onClick={goCategorySearch} id="자동차용품">
                                <div className={styles.line}></div>
                                <form name='search_car' id='search_car' method='get'>
                                    <input name='search_car' id='search_input' placeholder='  검색'value="자동차용품" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_car" onClick={goCategorySearch} className={styles.category_btn}>자동차용품</button>
                            </a>
                            <a onClick={goCategorySearch} id="식품">
                                <div className={styles.line}></div>
                                <form name='search_food' id='search_food' method='get'>
                                    <input name='search_food' id='search_input' placeholder='  검색' value="식품" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_food" onClick={goCategorySearch} className={styles.category_btn}>식품</button>
                            </a>
                            <a onClick={goCategorySearch} id="기타">
                                <div className={styles.line}></div>
                                <form name='search_etc' id='search_etc' method='get'>
                                    <input name='search_etc' id='search_input' placeholder='  검색'  value="기타" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_etc" onClick={goCategorySearch} className={styles.category_btn}>기타</button>
                            </a>
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
                                <input type='text' minLength="2" id='search_input' className={`${styles.tlist_text} ${styles.search_input}`}
                                       placeholder='  검색' name='search' required></input>
                            </form>
                        </a>
                        <button type='submit' form='search_form' id='search_btn'
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
                    <li className={styles.tlist_item} onClick={document.cookie.match('isLogin' + '=([^;]*)(;|$)') ? logout:goLogin}>
                        <a className={styles.tlist_item_a}>
                            <span className={styles.tlist_text}>{(document.cookie.match('isLogin' + '=([^;]*)(;|$)')? 'LogOut' : 'LogIn')}</span>
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

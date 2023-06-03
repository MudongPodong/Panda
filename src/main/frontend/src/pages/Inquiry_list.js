import '../App.css';
import '../Css_dir/fixbar.module.css';
import styles from '../Css_dir/SearchResult.module.css'
import React, {useEffect, useState} from 'react';
import CommonTable from '../Tables/CommonTable';
import CommonTableColumn from '../Tables/CommonTableColumn';
import CommonTableRow from '../Tables/CommonTableRow';
import FixBar from "./FixBar";

import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Inquiry_list() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const movePage= (event)=>{
        const getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
        //document.location.href="/pages/OtherPage";
    }


    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");   //금액 1000단위 끊기
    }


    useEffect(() => {    //사용자 조회 글 찾아옴
        axios.get('/api/favoriteList')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <FixBar></FixBar>
                <br/>
                <div id='root'>
                    <br/>
                    <div className={styles.headTitle}>
                        <h1 className={styles.title}>찜 목록
                            <span>사용자가 선택한 찜 목록입니다..</span>
                        </h1>
                    </div>
                    <br/><br/>
                    <br/><br/>
                    <CommonTable headersName={['선택/제품id','사진', '상품명', '가격', '상품등록일']}>
                        {data.map(item=>(
                            <CommonTableRow>
                                <td className={styles.common_check_box}><input type="checkbox"  style={{left:"5%"}} name="likeList" value={item.price}/>{item.writing_id}</td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}><img src=" http://placekitten.com/150/150" alt=""/></td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}>{item.writing_name}</td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}><label name="price">{dividePriceUnit(item.price.toString())}</label></td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}>{item.regit_date}</td>
                            </CommonTableRow>
                        ))}
                    </CommonTable>

                </div>

            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default Inquiry_list;
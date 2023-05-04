import '../App.css';
import React, {useEffect, useState} from 'react';
import CommonTable from '../Tables/CommonTable';
import CommonTableColumn from '../Tables/CommonTableColumn';
import CommonTableRow from '../Tables/CommonTableRow';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import FixBar from "./FixBar";
import axios from 'axios';
import styles from "../Css_dir/SearchResult.module.css";


function BoughtList() {
    const [data, setData] = useState([])
    const movePage= ()=>{
        document.location.href="/pages/OtherPage2";
    }


    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <FixBar></FixBar>
            <br/>
            <br/>
            <div className={styles.headTitle}>
                <h1 className={styles.title}>구매 목록
                    <span>사용자가 구매한 중고물품 목록입니다..</span>
                </h1>
            </div>
            <br/><br/>

            <br/><br/>
            <CommonTable headersName={['사진', '상품명', '상품등록일', '구매완료일']}>
                {data.map(item=>(
                    <CommonTableRow>
                        <td><input type="checkbox" style={{left:"5%"}} name="likeList"/></td>
                        <CommonTableColumn><img src=" http://placekitten.com/150/150" alt=""/></CommonTableColumn>
                        <CommonTableColumn>{item}</CommonTableColumn>
                        <CommonTableColumn>2020-10-25</CommonTableColumn>
                        <CommonTableColumn>4</CommonTableColumn>
                    </CommonTableRow>
                ))}
            </CommonTable>

            <br/><br/>
            <button className={styles.changePage} onClick={ movePage }>마이페이지</button>
            <br/><br/><br/>
            <button className={styles.changePage} onClick={ movePage }>선택 구매</button>
            <br/><br/>


        </div>
    );
}

export default BoughtList;
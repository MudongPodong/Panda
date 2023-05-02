import '../App.css';
import React, {useEffect, useState} from 'react';
import CommonTable from '../Tables/CommonTable';
import CommonTableColumn from '../Tables/CommonTableColumn';
import CommonTableRow from '../Tables/CommonTableRow';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios';

function OtherPage() {
    const [data, setData] = useState([])
    const movePage= ()=>{
        document.location.href="/OtherPage";
    }



    useEffect(() => {
        axios.get('/api/hello')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div id='root'>
            <h1>찜 목록</h1>
            <p>사용자가 찜 등록한 상품들을 볼 수 있습니다!!</p>
            <br/>


            <br/><br/>
            <button className='changePage' onClick={ movePage }>이전페이지</button>
            <br/><br/>


        </div>
    );
}

export default OtherPage;
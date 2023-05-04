// import '../App.css';
// import React, {useEffect, useState} from 'react';
// import CommonTable from '../Tables/CommonTable';
// import CommonTableColumn from '../Tables/CommonTableColumn';
// import CommonTableRow from '../Tables/CommonTableRow';
// import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import FixBar from "./FixBar";
// import styles from '../Css_dir/SearchResult.module.css'
// import axios from 'axios';
//
//
// function BoughtList() {
//     const [data, setData] = useState([])
//     const movePage= ()=>{
//         document.location.href="/pages/OtherPage2";
//     }
//
//
//     useEffect(() => {
//         axios.get('/api/hello')
//             .then(response => setData(response.data))
//             .catch(error => console.log(error))
//     }, []);
//
//     return (
//         <div>
//             <FixBar></FixBar>
//             <br/>
//             <div className="headTitle">
//                 <h1 className={styles.title}>Search Result
//                     <span>다음 검색 결과입니다.</span>
//                 </h1>
//             </div>
//             <br/><br/>
//             <div className={styles.container}>
//                 {data.map(item=>(
//                     <div className={styles.resultMap} onClick={movePage}>
//
//                         <img src="http://placekitten.com/150/150" ></img>
//                         <p> <b>김치라면</b> <br/>
//                             [판매자]: 무동포동 <br/>
//                             가격: 10,000원 <br/>
//                             판매자 평점:*****</p>
//                     </div>
//                 ))}
//             </div>
//
//         </div>
//     );
// }
//
// export default BoughtList;
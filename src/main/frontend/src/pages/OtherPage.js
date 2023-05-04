// import '../App.css';
// import '../Css_dir/fixbar.module.css';
// import React, {useEffect, useState} from 'react';
// import CommonTable from '../Tables/CommonTable';
// import CommonTableColumn from '../Tables/CommonTableColumn';
// import CommonTableRow from '../Tables/CommonTableRow';
// import FixBar from "./FixBar";
// import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
//
// function OtherPage() {
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
//             <div id='root'>
//                 <h1>찜 목록</h1>
//                 <p>사용자가 찜 등록한 상품들을 볼 수 있습니다.</p>
//                 <br/>
//                 <div className="card" >
//                     <div className="card-header">
//                         찜 목록
//                     </div>
//                     <ul className="list-group list-group-flush">
//                         <li className="list-group-item">선택된 제품 수: </li>
//                         <li className="list-group-item">목록 내 모든 상품 가격: </li>
//                         <li className="list-group-item">선택한 상품 가격: </li>
//                     </ul>
//                 </div>
//                 <br/><br/>
//                 <CommonTable headersName={['','사진', '상품명', '상품등록일', '찜 등록일']}>
//                     {data.map(item=>(
//                         <CommonTableRow>
//                             <CommonTableColumn><input type="checkbox" name="likeList"/></CommonTableColumn>
//                             <CommonTableColumn><img src=" http://placekitten.com/150/150" alt=""/></CommonTableColumn>
//                             <CommonTableColumn>{item}</CommonTableColumn>
//                             <CommonTableColumn>2020-10-25</CommonTableColumn>
//                             <CommonTableColumn>4</CommonTableColumn>
//                         </CommonTableRow>
//                     ))}
//                 </CommonTable>
//
//
//                 <br/><br/>
//                 <button className='changePage' onClick={ movePage }>마이페이지</button>
//                 <br/><br/><br/>
//                 <button className='changePage' onClick={ movePage }>선택 구매</button>
//                 <br/><br/>
//             </div>
//
//         </div>
//     );
// }
//
// export default OtherPage;
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import FixBar from "./FixBar";
import styles from '../Css_dir/SearchResult.module.css'
import axios from 'axios';


function SearchResult() {
    const [data, setData] = useState([])
    const [sortFlag,setFlag] = useState(0)
    const location = useLocation();
    const navigate = useNavigate();

    const searchInfo = { ...location.state };
    const listdata=new FormData();
    listdata.append('search_word', location.search.toString().split("=").at(1));
    if(location.search.toString().includes("search_popularity")) listdata.append('sort','search_popularity');  //인기순 정렬
    else if(location.search.toString().includes("search_price")) listdata.append('sort','search_price'); //가격순 정렬
    else if(location.search.toString().includes("search_sell")) listdata.append('sort','search_sell');   //판매순 정렬
    else listdata.append('sort','search_normal');  //그냥 검색했을때 랜덤으로 뜨게함

    const movePage= (event)=>{       //일단 아이디만 받아서 넘겨서 게시물 상세 페이지에서 백엔드로 데베 불어오는게 나을듯(WritingConten 테이블이랑, Writing 테이블 개체 다불러야함)

        let getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
            word:getId
            }});
    }
    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");   //금액 1000단위 끊기
    }

    const divideStr=(str)=>{
        //str.includes('_')
        if( str.match(/[_.~]/)) return decodeURIComponent(location.search.toString().split("=").at(1).split(/[_.~]/));
        else return decodeURIComponent(location.search.toString().split("=").at(1));
    }


    useEffect(() => {

        axios.post('/api/searchResult',listdata,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <br/><br/><br/><br/><br/>
                <div className={styles.headTitle}>
                    <h1 className={styles.title}>검색 결과
                        <span>'{divideStr(location.search.toString().split("=").at(1)) }' 과 관련된 다음 검색 결과입니다..</span>
                    </h1>
                </div>
                <br/><br/>
                <div className={styles.btn_center}>
                    <form name='search_popularity' id='search_popularity' method='get'>
                        <input name='search_popularity' id='search_popularity' placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString().split("=").at(1))}
                               style={{ display: 'none' }}></input>
                    </form>
                    <button type="submit" form="search_popularity" id='search_popularity' className={styles.btn_5} >인기순</button>

                    <form name='search_price' id='search_price' method='get'>
                        <input name='search_price' id='search_price' placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString().split("=").at(1))}
                               style={{ display: 'none' }}></input>
                    </form>
                    <button type="submit" form="search_price" className={styles.btn_5} id='search_price' >가격순</button>

                    <form name='search_sell' id='search_sell' method='get'>
                        <input name='search_sell' id='search_sell' placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString().split("=").at(1))}
                               style={{ display: 'none' }}></input>
                    </form>
                    <button type="submit" form="search_sell" className={styles.btn_5} id='search_sell'>판매순</button>
                </div>
                <br/>
                <div className={styles.container}>
                    {data.length === 0 ? (
                        <p style={{ fontSize: '25px' }}>받아온 데이터가 없습니다.</p>
                    ):(
                        <div>
                            {data.map(item=>(
                                <div className={styles.resultMap} onClick={movePage} id={item.writing_Id}>
                                    <img className={styles.content_picture} src="http://placekitten.com/150/150"></img>
                                    <div> <b>{item.writing_name}</b></div>
                                    <div>  [판매자]: {item.user_name} </div>
                                    <div>    가격: {dividePriceUnit(item.price.toString())} </div>
                                    <div>    판매자 평점:{item.user_point}</div>
                                </div>
                            ))}
                        </div>
                    )

                    }
                </div>
                <br/><br/>
                <hr/>
                <div className={styles.board_wraping}>
                    <div className={styles.board_paging}>
                        <a href="#" className={styles.num}><b>〈〈</b></a>
                        <a href="#" className={styles.num}><b>〈</b></a>
                        <a href="#" className={styles.num}>1</a>
                        <a href="#" className={styles.num}>2</a>
                        <a href="#" className={styles.num}>3</a>
                        <a href="#" className={styles.num}>4</a>
                        <a href="#" className={styles.num}>5</a>
                        <a href="#" className={styles.num}><b>〉</b></a>
                        <a href="#" className={styles.num}><b>〉〉</b></a>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>

        </div>
    );
}

export default SearchResult;
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from '../Css_dir/SearchResult.module.css'
import FixBar from "./FixBar";
import CommonTable from "../Tables/CommonTable";
import CommonTableRow from "../Tables/CommonTableRow";
import {Link, useNavigate} from "react-router-dom";

function ListViewADs() {

    const [advertise, setAdvertise] = useState([]);
    const navigate = useNavigate();

    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    const movePage= (event)=>{       //일단 아이디만 받아서 넘겨서 게시물 상세 페이지에서 백엔드로 데베 불어오는게 나을듯(WritingConten 테이블이랑, Writing 테이블 개체 다불러야함)

        let getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
    }

    useEffect(() => {   //정렬할거 있으면 정렬해서 가져오기

        axios.post('/api/todayAds',null,{

        })
            .then(response => {setAdvertise(response.data)
                console.log(advertise)
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.advertise_box}>
            <div className={styles.container}>
            {advertise.map(item => (
                <div className={styles.resultMap} onClick={movePage} name="spam" id={item.writing_Id}>
                    <img className={styles.content_picture} src="http://placekitten.com/150/150"></img>
                    <div> <b>{item.writing_name}</b></div>
                    <div>  [판매자]: {item.user_name} </div>
                    <div>    가격: {dividePriceUnit(item.price.toString())} </div>
                    <div>    판매자 평점:{item.user_point}</div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default ListViewADs;
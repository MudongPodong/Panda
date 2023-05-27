import React, {useEffect, useRef, useState } from "react";
import style from "../Css_dir/sidebarCategory.module.css"
import TopNav from "./top_navigation";
const DetailedSideCategory = () =>{
    return (
        <div className={style.sideCategory}>
            <ul className={style.sideCategory_list}>
                <li className={style.sideCategory_list_item}>
                    <div>의류</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>모자</li>
                            <li className={style.sideCategory_list_item_d}>상의</li>
                            <li className={style.sideCategory_list_item_d}>하의</li>
                            <li className={style.sideCategory_list_item_d}>신발</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>뷰티</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>공용 화장품</li>
                            <li className={style.sideCategory_list_item_d}>남자 화장품</li>
                            <li className={style.sideCategory_list_item_d}>여자 화장품</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>가구/인테리어</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>침대</li>
                            <li className={style.sideCategory_list_item_d}>소파</li>
                            <li className={style.sideCategory_list_item_d}>책상</li>
                            <li className={style.sideCategory_list_item_d}>의자</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>가전</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>냉장고</li>
                            <li className={style.sideCategory_list_item_d}>TV</li>
                            <li className={style.sideCategory_list_item_d}>청소기</li>
                            <li className={style.sideCategory_list_item_d}>에어컨</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>모바일/태블릿/PC</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>스마트폰</li>
                            <li className={style.sideCategory_list_item_d}>태블릿</li>
                            <li className={style.sideCategory_list_item_d}>노트북</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>생활용품</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>생필용품</li>
                            <li className={style.sideCategory_list_item_d}>욕실용품</li>
                            <li className={style.sideCategory_list_item_d}>주방용품</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>반려동물</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>사료</li>
                            <li className={style.sideCategory_list_item_d}>toy</li>
                            <li className={style.sideCategory_list_item_d}>의류</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>문구/도서</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>책</li>
                            <li className={style.sideCategory_list_item_d}>볼펜</li>
                            <li className={style.sideCategory_list_item_d}>샤프/연필</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>스포츠</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>축구</li>
                            <li className={style.sideCategory_list_item_d}>야구</li>
                            <li className={style.sideCategory_list_item_d}>농구</li>
                            <li className={style.sideCategory_list_item_d}>웨이트</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>자동차용품</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>방향제</li>
                            <li className={style.sideCategory_list_item_d}>엑세서리</li>
                            <li className={style.sideCategory_list_item_d}>블랙박스</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>식품</div>
                    <div>
                        <ul>
                            <li className={style.sideCategory_list_item_d}>생수</li>
                            <li className={style.sideCategory_list_item_d}>라면</li>
                            <li className={style.sideCategory_list_item_d}>과자</li>
                            <li className={style.sideCategory_list_item_d}>빵</li>
                            <li className={style.sideCategory_list_item_d}>기타</li>
                        </ul>
                    </div>
                </li>
                <li className={style.sideCategory_list_item}>
                    <div>기타</div>
                </li>
            </ul>
        </div>
    )
}
export default DetailedSideCategory;
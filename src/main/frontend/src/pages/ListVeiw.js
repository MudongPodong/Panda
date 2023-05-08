import React from 'react';
import styles from '../Css_dir/listVeiw.module.css';
import {Link} from "react-router-dom";

class ListVeiw extends React.Component {
    state = {
        slideSpot: 0,
        //현재 화면에 보이고 있는 슬라이드의 시작점
    };

    imgQuantity = this.props.imagesData.length;
    //데이터로 들어오는 총 이미지 수가 항상 다르기 때문에 총 이미지 수를 구해준다.
    slideWidth =
        IMG_WIDTH * (this.imgQuantity + 1) + (this.imgQuantity) * SLIDE_GAP * 2;
    //슬라이드 내부 컨텐츠의 전체 길이를 구해준다.
    inner_len = window.innerWidth;
    hiddenedSlideWidth = (this.inner_len < 210 ? this.slideWidth - 100:
        (this.inner_len < 430 ? this.slideWidth - 300:
            (this.inner_len < 650 ? this.slideWidth - 500 :
                (this.inner_len < 870 ? this.slideWidth - 700:
                    (this.inner_len < 1310 ? this.slideWidth - 900:
                        (this.inner_len < 1310 ? this.slideWidth - 1000:this.slideWidth - 1100))))));
    //슬라이드 내부 컨텐츠 전체 길이에서 윈도우의 innerWidth 값을 빼 남아있는 슬라이드의 길이를 구한다.
    slideEnd;
    //슬라이드의 끝부분에 갔을 때 next 버튼이 없어지도록 만들 때 사용할 변수이다.

    handlePrevBtn = () => {
        const { slideSpot } = this.state;
        if (Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
            //슬라이드 왼쪽으로 남은 값이 한 번에 이동하는 값보다 작으면

            this.setState({
                slideSpot: 0,
                //0까지만 이동

            });
        } else {
            //그 외의 경우

            this.setState({
                slideSpot: slideSpot + SLIDE_MOVING_UNIT,
                //현재 위치에서 한 번에 이동해야 하는 값만큼 이동

            });
        }
    };

    handleNextBtn = () => {
        const { slideSpot } = this.state;

        if (this.hiddenedSlideWidth - Math.abs(slideSpot) <= SLIDE_MOVING_UNIT) {
            //남아있는 슬라이드의 길이에서 현재 슬라이드의 위치값을 뺀 값이 한 번에 움직여야 하는 값보다 작으면

            this.setState({
                slideSpot: slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot)),
                //남은 길이만큼만 이동하고

            });
            this.slideEnd =
                slideSpot - (this.hiddenedSlideWidth - Math.abs(slideSpot));
            //slideEnd의 값을 slideSpot의 값과 동일하게 만들어 nextBtn을 보이지 않게 한다

        } else {
            //남아있는 슬라이드의 길이가 한 번에 움직여야 하는 값보다 크면

            this.setState({
                slideSpot: slideSpot - SLIDE_MOVING_UNIT,
                //한 번에 움직여야 하는 만큼 값을 빼준다

            });
        }
    };

    render() {
        const { slideSpot } = this.state;
        const { imagesData, pname, price, addr, count } = this.props;

        return (
            <div className={styles.list_view_wrap}>
                <button onClick={this.handlePrevBtn} className={(!!slideSpot ? `${styles.left_btn}` : `${styles.left_btn_hidden}`)}>
                    <img src={'/imgs/left_btn.png'} width={100}/>
                </button>
            <div className={styles.list_view_box}>
                <ul className={styles.list}>
                    <div style={{ transform: `translateX(${slideSpot}px)`}} className={styles.slide_item}>
                        {imagesData&&imagesData.map((img, i) => (
                            <li key={i} className={styles.list_item}>
                                <Link to={`/pages/noticeConfirm#`} style={{ textDecoration: "none" }}>
                                    {/*to안에 해당 상품 페이지로 이동하게 하면됨*/}
                                    <div className={styles.list_container}>
                                        <div className={styles.item_img}>
                                            <img width={200} src={img} className={styles.list_img}/>
                                        </div>
                                        <div className={styles.item_desc}>
                                            <h2 className={styles.item_name}>{pname[i]}</h2>
                                            <p className={styles.item_price}>{`${price[i]} 원`}</p>
                                            <p className={styles.item_addr}>{addr[i]}</p>
                                            <p className={styles.item_count}>{`${count[i]}회 검색`}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
                <button onClick={this.handleNextBtn} className={(slideSpot !== this.slideEnd ? `${styles.right_btn}` : `${styles.right_btn_hidden}`)}>
                    <img src={'/imgs/right_btn.png'} width={100}/>
                </button>
            </div>
        );
    }
}
ListVeiw.defaultProps = {
    //원래 백에서 이미지 받아와야 되는데 일단 임시로 이미지 넣음
    imagesData: ['imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png', 'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png',
        'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png', 'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png',
        'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png', 'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png',
        'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png', 'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png'],
    pname: ['귀여운 판다','판다','안판다','맛있어 보이는 판다','과제 언제끝남','집에 보내줘',
        '귀여운 판다','판다','안판다','맛있어 보이는 판다','과제 언제끝남','집에 보내줘',
        '귀여운 판다','판다','안판다','맛있어 보이는 판다','과제 언제끝남','집에 보내줘',
        '귀여운 판다','판다','안판다','맛있어 보이는 판다','과제 언제끝남','집에 보내줘'],
    price : ['20,000','1,000','500,000','20,000,000','1','2,500',
        '20,000','1,000','500,000','20,000,000','1','2,500',
        '20,000','1,000','500,000','20,000,000','1','2,500',
        '20,000','1,000','500,000','20,000,000','1','2,500'],
    addr : ['경북 경산시 대학로 280','대구 남구 현충로 170','대구 북구 대학로 80','경북 상주시 경상대로 2559','대구 북구 호국로 807','대구 중구 국채보상로 680',
        '경북 경산시 대학로 280','대구 남구 현충로 170','대구 북구 대학로 80','경북 상주시 경상대로 2559','대구 북구 호국로 807','대구 중구 국채보상로 680',
        '경북 경산시 대학로 280','대구 남구 현충로 170','대구 북구 대학로 80','경북 상주시 경상대로 2559','대구 북구 호국로 807','대구 중구 국채보상로 680',
        '경북 경산시 대학로 280','대구 남구 현충로 170','대구 북구 대학로 80','경북 상주시 경상대로 2559','대구 북구 호국로 807','대구 중구 국채보상로 680'],
    count : ['1,000','10','0','1,000,000,000','100','99',
        '1,000','10','0','1,000,000,000','100','99',
        '1,000','10','0','1,000,000,000','100','99',
        '1,000','10','0','1,000,000,000','100','99']
}

const SLIDE_GAP = 14;  //각 슬라이드 사이 간격
const SLIDE_MOVING_UNIT = 228;  //슬라이드 버튼 클릭 시 움직일 길이
const IMG_WIDTH = 200;  //이미지 가로 길이

export default ListVeiw;
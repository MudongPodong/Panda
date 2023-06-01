import React from 'react';
import styles from '../Css_dir/listVeiw.module.css';
import {Link} from "react-router-dom";

class ListVeiw extends React.Component {
    state = {
        slideSpot: 0,
        //현재 화면에 보이고 있는 슬라이드의 시작점
    };

    imgQuantity = 15;
    slideWidth =
        IMG_WIDTH * (this.imgQuantity + 1) + (this.imgQuantity) * SLIDE_GAP * 2;
    //슬라이드 내부 컨텐츠의 전체 길이를 구해준다.
    inner_len = window.innerWidth;
    hiddenedSlideWidth = (this.inner_len < 210 ? this.slideWidth:
        (this.inner_len < 430 ? this.slideWidth - (IMG_WIDTH + SLIDE_GAP):
            (this.inner_len < 650 ? this.slideWidth - 2*(IMG_WIDTH + SLIDE_GAP):
                (this.inner_len < 870 ? this.slideWidth - 3*(IMG_WIDTH + SLIDE_GAP):
                    (this.inner_len < 1310 ? this.slideWidth - 4*(IMG_WIDTH + SLIDE_GAP):
                        (this.inner_len < 1310 ? this.slideWidth - 5*(IMG_WIDTH + SLIDE_GAP):this.slideWidth - 6*(IMG_WIDTH + SLIDE_GAP)))))));
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
        const { list } = this.props;

        const dividePriceUnit=(price)=>{
            return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        return (
            <div className={styles.list_view_wrap}>
                <button onClick={this.handlePrevBtn} className={(!!slideSpot ? `${styles.left_btn}` : `${styles.left_btn_hidden}`)}>
                    <img src={'/imgs/left_btn.png'} width={100}/>
                </button>
            <div className={styles.list_view_box}>
                <ul className={styles.list}>
                    <div style={{ transform: `translateX(${slideSpot}px)`}} className={styles.slide_item}>
                        {list&&list.map((item,i) => (
                            <li key={i} className={styles.list_item}>
                                <Link to={`/pages/noticeConfirm#`} style={{ textDecoration: "none" }} id={item.writingId}>
                                    {/*to안에 해당 상품 페이지로 이동하게 하면됨*/}
                                    <div className={styles.list_container}>
                                        <div className={styles.item_img}>
                                            <img width={200} height={200} src={"data:image/png;base64," + item.writingImg} className={styles.list_img}/>
                                        </div>
                                        <div className={styles.item_desc}>
                                            <h2 className={styles.item_name}>{item.ad ? "[광고]" + item.writingName : item.writingName}</h2>
                                            <p>{`${dividePriceUnit(item.price.toString())} 원`}</p>
                                            <p>{item.addr}</p>
                                            <p>{`${item.userPoint} 점`}</p>
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
    list:[{"writingId":123, "writingImg":"imgs/logo192_192.png", "writingName":"귀여운 판다", "price":123, "addr":"경북 경산시 대학로 280", "userPoint":50, "ad":true},
    {"writingId":123, "writingImg":"imgs/logo192_192.png", "writingName":"귀여운 판다", "price":123, "addr":"경북 경산시 대학로 280", "userPoint":50, "ad":true},
    {"writingId":123, "writingImg":"imgs/logo192_192.png", "writingName":"귀여운 판다", "price":123, "addr":"경북 경산시 대학로 280", "userPoint":50, "ad":true},
    {"writingId":123, "writingImg":"imgs/logo192_192.png", "writingName":"귀여운 판다", "price":123, "addr":"경북 경산시 대학로 280", "userPoint":50, "ad":false},
    {"writingId":123, "writingImg":"imgs/logo192_192.png", "writingName":"귀여운 판다", "price":123, "addr":"경북 경산시 대학로 280", "userPoint":50, "ad":false},
    {"writingId":123, "writingImg":"imgs/logo192_192.png", "writingName":"귀여운 판다", "price":123, "addr":"경북 경산시 대학로 280", "userPoint":50, "ad":false},],
    len:15};

const SLIDE_GAP = 14;  //각 슬라이드 사이 간격
const SLIDE_MOVING_UNIT = 228;  //슬라이드 버튼 클릭 시 움직일 길이
const IMG_WIDTH = 200;  //이미지 가로 길이
export default ListVeiw;
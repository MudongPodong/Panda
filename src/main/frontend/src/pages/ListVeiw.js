import React from 'react';
import styles from '../Css_dir/listVeiw.module.css';
import image from "../imgs/logo192_192.png";
class ListVeiw extends React.Component {
    state = {
        slideSpot: 0,
        //현재 화면에 보이고 있는 슬라이드의 시작점
    };

    imgQuantity = this.props.imagesData.length;
    //데이터로 들어오는 총 이미지 수가 항상 다르기 때문에 총 이미지 수를 구해준다.
    slideWidth =
        IMG_WIDTH * this.imgQuantity + (this.imgQuantity - 1) * SLIDE_GAP;
    //슬라이드 내부 컨텐츠의 전체 길이를 구해준다.
    hiddenedSlideWidth = this.slideWidth - window.innerWidth;
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

        if (this.hiddenedSlideWidth - Math.abs(slideSpot) < SLIDE_MOVING_UNIT) {
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
            <div className={styles.ListViewBox}>
                {!!slideSpot && (
                    <button onClick={this.handlePrevBtn} className={`${styles.slideArrow} ${styles.arrowLeft}`}>
                        ❮
                        <i className={`${styles.fas} ${styles.fa_chevron_left}`}></i>
                    </button>
                )}
                <ul className={styles.storeImgUl}>
                    <div
                        style={{ transform: `translateX(${slideSpot}px)` }}
                        className={styles.slideInner}
                    >
                        {imagesData&&imagesData.map((img, i) => (
                            <li key={i} className={styles.storeImgLi}>
                                <div className={styles.list_container}>
                                    <div className={styles.item_img}>
                                        <img width={300} src={img} className={styles.list_img}/>
                                    </div>
                                    <div className={styles.item_desc}>
                                        <h2>{pname[i]}</h2>
                                        <p>{price[i]}</p>
                                        <p>{addr[i]}</p>
                                        <p>{count[i]}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
                {slideSpot !== this.slideEnd && (
                    <button
                        onClick={this.handleNextBtn}
                        className={`${styles.slideArrow} ${styles.arrowRight}`}
                    >
                        ❯
                        <i className={`${styles.fas} ${styles.fa_chevron_right}`}></i>
                    </button>
                )}
            </div>    );
    }
}
ListVeiw.defaultProps = {
    //원래 백에서 이미지 받아와야 되는데 일단 임시로 이미지 넣음
    imagesData: ['imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png', 'imgs/logo192_192.png', 'imgs/menu_logo.png', 'imgs/close_logo.png'],
    pname: ['제목','제목','제목','제목','제목','제목'],
    price : ['000','000','000','000','000','000'],
    addr : ['aaa','aaa','aaa','aaa','aaa','aaa'],
    count : ['100','100','100','100','100','100']
}

const SLIDE_GAP = 14;  //각 슬라이드 사이 간격
const SLIDE_MOVING_UNIT = 500;  //슬라이드 버튼 클릭 시 움직일 길이
const IMG_WIDTH = 400;  //이미지 가로 길이

export default ListVeiw;
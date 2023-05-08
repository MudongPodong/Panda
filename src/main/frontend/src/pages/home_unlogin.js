import styles from '../Css_dir/home_un.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';

function HomeUn() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState('');
    function goMem(){
        movePage('/pages/joinMemPage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>
                        <section className={styles.top_section}>
                            <div className={styles.home_top}>
                                <div className={styles.home_img_box}>
                                    <img src={'/imgs/logo512_512.png'} className={styles.home_top_img}/>
                                </div>
                                <div className={styles.home_text}>
                                    <h1 className={styles.home_top_title}>
                                        중고거래 마켓
                                    </h1>
                                    <h1 className={`${styles.home_top_title} ${styles.home_top_panda}`}>
                                        PANDA
                                    </h1>
                                    <p>판다처럼 따뜻한 이웃들과의 거래</p>
                                    <p>지금 판다를 통한 중고거래를 이용해 보세요.</p>
                                    <div className={styles.home_mem}>
                                        <button className={styles.home_mem_btn_under}>지금 회원가입</button>
                                        <button className={styles.home_mem_btn} onClick={goMem}><span>지금 회원가입</span></button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className={styles.mid_section}>
                            <div className={styles.home_mid}>
                                <div className={styles.home_mid_text}>
                                    <h1 className={styles.home_mid_title}>
                                        똑똑한
                                    </h1>
                                    <h1 className={`${styles.home_mid_title} ${styles.home_mid_panda}`}>
                                        PANDA
                                    </h1>
                                    <p>AI를 활용한 빠른 등록</p>
                                    <p>나를 위한 맞춤형 추천</p>
                                    <ul className={styles.home_mid_list}>
                                        <li><img src={'/imgs/logo192_192.png'} width={81}/><br/>AI를 통한<br/>판매 등록</li>
                                        <li><img src={'/imgs/logo192_192.png'} width={81}/><br/>챗봇</li>
                                        <li><img src={'/imgs/logo192_192.png'} width={81}/><br/>데이터 분석을 통한<br></br> 제품 추천</li>
                                    </ul>
                                </div>
                                <div className={styles.home_img_box}>
                                    <img src={'/imgs/logo512_512.png'} className={styles.home_mid_img}/>
                                </div>
                            </div>
                        </section>
                        <section className={styles.bottom_section}>
                        <div className={styles.home_bottom}>
                            <div className={styles.home_img_box}>
                                <img src={'/imgs/logo512_512.png'} className={styles.home_bottom_img}/>
                            </div>
                            <div className={styles.home_text}>
                                <h1 className={styles.home_bottom_title}>
                                    경매도 하는
                                </h1>
                                <h1 className={`${styles.home_bottom_title} ${styles.home_bottom_panda}`}>
                                    PANDA
                                </h1>
                                <p>더 높은 가격으로 판매하고 싶나요?</p>
                                <p>경매 시스템을 통한 더 편한 판매</p>
                            </div>
                        </div>
                        </section>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>
        </div>
    );
}

export default HomeUn;

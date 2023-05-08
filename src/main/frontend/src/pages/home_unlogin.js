import styles from '../Css_dir/home_un.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';

function HomeUn() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState('');
    function goSearchResult(){
        movePage('/pages/SearchResult');
    }
    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>
                        <section className={styles.top_section}>
                            <div className={styles.home_top}>
                                <div className={styles.home_top_img_box}>
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
                                </div>
                            </div>
                        </section>
                        <section className={styles.bottom_section}>
                        <div className={styles.home_bottom}>
                            <div className={styles.home_text}>
                                <h1 className={styles.home_bottom_title}>
                                    중고거래 마켓
                                </h1>
                                <h1 className={`${styles.home_bottom_title} ${styles.home_bottom_panda}`}>
                                    PANDA
                                </h1>
                                <p>판다처럼 따뜻한 이웃들과의 거래</p>
                                <p>지금 판다를 통한 중고거래를 이용해 보세요.</p>
                            </div>
                            <div>
                                <img src={'/imgs/logo512_512.png'} className={styles.home_top_img}/>
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

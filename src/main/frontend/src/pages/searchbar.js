import React, {useEffect, useRef, useState } from "react";
import styles from "../Css_dir/searchbar.module.css";

const Searchbar = () => {
    const [isOpenTop, setIsOpenTop] = useState(false);
    const outClickRef = useRef(null);

    const toggleMenu = () => {
        setIsOpenTop(!isOpenTop);
    };


    useEffect(()=> {
        function handleClose(e){
            if (isOpenTop === true && (outClickRef.current && !outClickRef.current.contains(e.target))) {
                console.log("out click, close searchbar");
                setIsOpenTop(false);
            }
        }
        window.addEventListener('mousedown', handleClose);
        return () => {
            window.removeEventListener('mousedown', handleClose);
        };
    }, [isOpenTop]);

    return (
        <div className={styles.header} ref={outClickRef}>
            <div className={styles.logo_box}>
                <button className={styles.logo} width='35px'></button>
                <button className={(!isOpenTop ? `${styles.logo}` : `${styles.exit}`)} width='35px' onClick={toggleMenu}></button>
            </div>
            <div className={(isOpenTop ? `${styles.show_menu}` : `${styles.hide_menu}`)}>
                <div className={styles.search_box}>
                    <form name='search' id='search_form_h' method='get'>
                        <input type='text' minLength='2' className={styles.search_input} placeholder='  검색' name='search'></input>
                    </form>
                    <div className={styles.search_btn_wrap}>
                        <button type='submit' form='search_form_h' className={styles.search_input_btn}></button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Searchbar;
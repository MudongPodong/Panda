import React, {useState} from "react";
import styles from '../Css_dir/login_mem.module.css';
import {useNavigate} from "react-router-dom";

const email_regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const pw_regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
const phone_regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

function Mem() {
    let [email, setEmail] = useState('');
    let [pw, setPw] = useState('');
    let [pw_ch, setPw_check] = useState('');
    let [phone, setPhone] = useState('');
    const changeEmail = (e) =>{
        const {value, emal} = e.target;
        setEmail(value);
    }
    const changePw = (e) => {
        const { value, pw } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setPw(value);
    };
    const changePw_check = (e) => {
        const { value, pwch } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setPw_check(value);
    };
    const changePhone = (e) => {
        const { value, phone_num} = e.target;
        const num = value.replace(/[^0-9]/g, '');
        if(num.length < 11){
            setPhone(value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        }
        else{
            setPhone(value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        }
    }
    const email_error = '***올바른 이메일 형식이 아닙니다.***';
    const pw_error = '***비밀번호는 영어, 숫자 포함 8자리 이상이어야 합니다.***';
    const pwch_error = '***비밀번호가 일치하지 않습니다.***';
    const phone_error = '***정확한 전화번호를 입력해 주십시오.***';
    const movePage = useNavigate();
    function gologin(){
        movePage('/pages/loginpage');
    }

    return (
        <>
        <div>
            <form name='mem_form' id='mem_form' method='post'>
                <input type='text' className={`${styles.input} ${styles.input_id}`} placeholder='E-mail' name='user_id' onChange={changeEmail} value={email}></input>
                {!email_regex.test(email) ? <div className={styles.error_message}>{email_error}</div>:<div className={styles.error_message}></div>}
                <input type='password' className={`${styles.input} ${styles.input_pw}`} placeholder='Password : 영어, 숫자 포함 8자리 이상' name='pw' onChange={changePw} value={pw}></input>
                {!pw_regex.test(pw) ? <div className={styles.error_message}>{pw_error}</div>:<div className={styles.error_message}></div>}
                <input type='password' className={`${styles.input} ${styles.input_pw_ch}`} placeholder='Password 확인 : Password를 한번 더 입력' name='pw_ch' onChange={changePw_check} value={pw_ch}></input>
                {pw !== pw_ch ? <div className={styles.error_message}>{pwch_error}</div>:<div className={styles.error_message}></div>}
                <input type='text' className={`${styles.input} ${styles.input_name}`} placeholder='닉네임' name='name'></input>
                <div className={styles.error_message}></div>
                <input type='text' className={`${styles.input} ${styles.input_phone}`} placeholder='휴대폰 : 숫자만 입력(- 자동 입력)' name='phone' onChange={changePhone} value={phone}></input>
                {!phone_regex.test(phone) ? <div className={styles.error_message}>{phone_error}</div>:<div className={styles.error_message}></div>}
                <input type='text' className={`${styles.input} ${styles.input_addr}`} placeholder='주소' name='address'></input>
                <div className={styles.error_message}></div>
                <button type="submit" className={styles.mem_btn} onClick={() => {
                    // 회원가입
                    alert('회원가입 성공');
                    gologin();
                }}>회원가입</button>
            </form>
        </div>
        </>
    )
}

export default Mem;
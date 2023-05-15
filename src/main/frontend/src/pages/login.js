import React, {useState} from "react";
import styles from '../Css_dir/login_mem.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const email_regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const pw_regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
function Login() {
    let [email, setEmail] = useState('');
    let [pw, setPw] = useState('');
    const changeEmail = (e) =>{
        const value = e.target.value;
        setEmail(value);
    }
    const changePw = (e) => {
        const value = e.target.value; // 우선 e.target 에서 name 과 value 를 추출
        setPw(value);
    };
    const email_error = '***올바른 이메일 형식이 아닙니다.***';
    const pw_error = '***비밀번호는 영어, 숫자 포함 8자리 이상이어야 합니다.***';
    const movePage = useNavigate();

    function goHome(){
        movePage('/');
        window.location.reload();
    }
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     let body = {
    //         email: email,
    //         password: pw,
    //     };
    //     axios
    //         .post("http://localhost:3000/api/login", body)
    //         .then((res) => console.log(res));
    // }
    return (
        <>
        <div>
            <form name='login_form' method='post'>
                {/*<input type='hidden' name={_csrf.parameterName} value={_csrf.token}/>*/}
                <input type='text' className={styles.input} placeholder='E-mail' name='email' onChange={changeEmail} value={email}></input>
                {!email_regex.test(email) && email != '' ? <div className={styles.error_message}>{email_error}</div>:<div className={styles.error_message}></div>}
                <input type='password' className={styles.input} placeholder='Password : 영어, 숫자 포함 8자리 이상' name='pw' onChange={changePw} value={pw}></input>
                {!pw_regex.test(pw) && pw != '' ? <div className={styles.error_message}>{pw_error}</div>:<div className={styles.error_message}></div>}
                <div className={styles.login_btn_wrap}>
                    <button type="submit" className={styles.login_btn_under}>LogIn</button>
                    <button type="submit" className={styles.login_btn} onClick={() => {
                        document.cookie = "name=login; path=/;";
                        goHome();
                    }}><span>LogIn</span></button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login;
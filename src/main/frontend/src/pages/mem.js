import React, {useState} from "react";
import styles from '../Css_dir/login_mem.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const email_regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const pw_regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
const phone_regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

function Mem() {
    let [email, setEmail] = useState('');
    let [pw, setPw] = useState('');
    let [pw_ch, setPw_check] = useState('');
    let [nickname, setNickname] = useState('');
    let [phone, setPhone] = useState('');
    let [addr, setAddr] = useState('');
    const changeEmail = (e) =>{
        const {value, email} = e.target;
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
    const changeNickname = (e) => {
        const { value, nickname } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setNickname(value);
    };
    const changePhone = (e) => {
        const { value, phone_num} = e.target;
        const num = value.replace(/[^0-9]/g, '');
        if(num.length < 11){
            setPhone(value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        }
        else {
            setPhone(value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        }
    }
    const changeAddr = (e) => {
        const { value, addr } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setAddr(value);
    };
    const email_error = '***올바른 이메일 형식이 아닙니다.***';
    const pw_error = '***비밀번호는 영어, 숫자 포함 8자리 이상이어야 합니다.***';
    const pwch_error = '***비밀번호가 일치하지 않습니다.***';
    const phone_error = '***정확한 전화번호를 입력해 주십시오.***';
    const movePage = useNavigate();
    function goLogin(){
        movePage('/pages/loginpage');
    }

    const join_mem = () => {
        console.log(email, pw, pw_ch, nickname, phone, addr);
        if(!email_regex.test(email)){
            alert('정확한 이메일을 입력해 주세요.');
            return false;
        }
        if(email == ''){
            alert('이메일을 입력해 주세요.');
            return false;
        }
        if(!pw_regex.test(pw)){
            alert('알파벳과 숫자가 포함된 8자리 이상 25자리 이하 비밀번호를 입력해 주세요.');
            return false;
        }
        if(pw == ''){
            alert('비밀번호를 입력해 주세요.');
            return false;
        }
        if(pw !== pw_ch){
            alert('비밀번호 확인이 잘못되었습니다.');
            return false;
        }
        if(pw_ch == ''){
            alert('비밀번호 확인을 입력해 주세요.');
            return false;
        }
        if(nickname == ''){
            alert('닉네임을 입력해 주세요.');
            return false;
        }
        if(!phone_regex.test(phone)){
            alert('정확한 전화번호를 입력해 주세요.');
            return false;
        }
        if(phone == ''){
            alert('전화번호를 입력해 주세요.');
            return false;
        }
        if(addr == ''){
            alert('주소를 입려해 주세요.');
            return false;
        }
        const form_data = new FormData();

        form_data.append('email', email);
        form_data.append('password', pw);
        form_data.append('nickname', nickname);
        form_data.append('Phone_number', phone);
        form_data.append('address', addr);

        axios.post('/api/join_mem', form_data)
            .then((response)=> {
                if(response.data)
                    console.log('회원가입 성공');
                else
                    console.log('회원가입 실패');
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
        <div>
            <form name='mem_form' id='mem_form' method='post'>
                <input type='text' className={styles.input} placeholder='E-mail' name='user_id' onChange={changeEmail} value={email}></input>
                {!email_regex.test(email) && email != '' ? <div className={styles.error_message}>{email_error}</div>:<div className={styles.error_message}></div>}
                <input type='password' className={styles.input} placeholder='Password : 영어, 숫자 포함 8자리 이상' name='pw' onChange={changePw} value={pw}></input>
                {!pw_regex.test(pw) && pw != '' ? <div className={styles.error_message}>{pw_error}</div>:<div className={styles.error_message}></div>}
                <input type='password' className={styles.input} placeholder='Password 확인 : Password를 한번 더 입력' name='pw_ch' onChange={changePw_check} value={pw_ch}></input>
                {pw !== pw_ch ? <div className={styles.error_message}>{pwch_error}</div>:<div className={styles.error_message}></div>}
                <input type='text' className={styles.input} placeholder='닉네임' name='name' onChange={changeNickname} value={nickname}></input>
                <div className={styles.error_message}></div>
                <input type='text' className={styles.input} placeholder='휴대폰 : 숫자만 입력(- 자동 입력)' name='phone' onChange={changePhone} value={phone}></input>
                {!phone_regex.test(phone) && phone != '' ? <div className={styles.error_message}>{phone_error}</div>:<div className={styles.error_message}></div>}
                <input type='text' className={styles.input} placeholder='주소' name='address' onChange={changeAddr} value={addr}></input>
                <div className={styles.error_message}></div>
                <div className={styles.login_btn_wrap}>
                    <button type="submit" className={styles.mem_btn_under}>회원가입</button>
                    <button type="submit" className={styles.mem_btn} onClick={() => {
                        join_mem();
                        // 회원가입
                        alert('회원가입 성공');
                        goLogin();
                    }}><span>회원가입</span></button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Mem;
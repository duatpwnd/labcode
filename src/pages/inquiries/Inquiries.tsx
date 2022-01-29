import { useState } from "react"
import axios from "axios";
import apiUrl from "src/utils/api";
import "./inquiries.scoped.scss"
import { useNavigate } from "react-router-dom";
import { phoneRegExp, emailRegExp } from 'src/utils/common';
import _ from 'lodash'
const debounce = _.debounce;
const Help = () => {
    const navigate = useNavigate();
    const [phoneMsg, setPhoneMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        title: "",
        description: ""
    });
    const onChange = (e: { [key: string]: any }) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value
        })
    };
    const phoneValueCheck = (e) => {
        const data = { ...inputs, [e.target.id]: e.target.value }
        phoneRegExp(data, "phone", setInputs, setPhoneMsg);
    }
    const emailValueCheck = (e) => {
        const data = { ...inputs, [e.target.id]: e.target.value }
        emailRegExp(data, "email", setInputs, setEmailMsg);
    };
    const send = () => {
        const phoneCheck = phoneRegExp(inputs, "phone", setInputs, setPhoneMsg);
        const emailCheck = emailRegExp(inputs, "email", setInputs, setEmailMsg);
        if (phoneCheck && emailCheck) {
            console.log("트루다");
            axios
                .post(apiUrl.createInquiries, inputs)
                .then((result: any) => {
                    console.log("문의생성결과", result);
                    navigate("/");
                }).catch((err: any) => {
                    console.log("문의생성에러", err);
                })
        }
    }
    return (
        <div className="wrap">
            <h2 className="h2-title">문의하기</h2>
            <form>
                <fieldset></fieldset>
                <legend>문의하기</legend>
                <div className="row1">
                    <span className="row-span name-field">
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" placeholder="이름 입력" onChange={onChange} />
                    </span>
                    <span className="row-span email-field">
                        <label htmlFor="phone">연락처</label>
                        <input type="text" id="phone" placeholder="“-” 없이 전화번호 입력" onChange={debounce((e) => phoneValueCheck(e), 500)} />
                        <p className="warn-message">{phoneMsg}</p>
                    </span>
                </div>
                <div className="row2">
                    <label htmlFor="email">이메일</label>
                    <input type="text" id="email" placeholder="이메일 입력" onChange={debounce((e) => emailValueCheck(e), 500)} />
                    <p className="email-warn-message">{emailMsg}</p>
                </div>
                <div className="row3">
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" placeholder="제목 입력" onChange={onChange} />
                </div>
                <div className="row4">
                    <label htmlFor="description">문의 내용</label>
                    <textarea id="description" onChange={onChange}></textarea>
                </div>
                <div className="row5">
                    <button type="button" className="cancel-btn" onClick={() => navigate("/")
                    }>취소</button>
                    <button type="button" className="submit-btn" onClick={send}>문의하기</button>
                </div>
            </form>
        </div>
    )
}
export default Help

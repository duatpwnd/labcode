import { ManagerInfo, CompanyInfo } from "./Team"
import axios from "axios";
import apiUrl from "src/utils/api";
import "./Team.scoped.scss"
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { phoneRegExp, emailRegExp, numberRegExp, homePageRegExp } from 'src/utils/common';
import _ from 'lodash'
const CreateTeam = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<{ [key: string]: any }>({});
    const [phoneMsg, setPhoneMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [numberMsg, setNumberMsg] = useState("");
    const [link, setLinkMsg] = useState("");
    const [businessImage, setBusinessImage] = useState("");
    const create = () => {
        const businessNumberCheck = numberRegExp(inputs, 'businessNumber', setInputs, setNumberMsg);
        const homepageCheck = homePageRegExp(inputs, 'homepage', setInputs, setLinkMsg);
        const phoneCheck = phoneRegExp(inputs, 'managerPhone', setInputs, setPhoneMsg);
        const emailCheck = emailRegExp(inputs, 'managerEmail', setInputs, setEmailMsg);
        if (inputs.businessImage == null) {
            setBusinessImage("사업자 등록증을 첨부해주세요.")
            return;
        }
        if (businessNumberCheck && homepageCheck && phoneCheck && emailCheck) {
            console.log("생성요청", inputs);
            axios
                .post(apiUrl.team, inputs)
                .then((result: any) => {
                    console.log("팀생성결과:", result);
                    navigate("/");
                }).catch((err: any) => {
                    console.log('팀생성에러:', err);
                });
        }
    }
    return (
        <main>
            <h2 className="h2-title">신청하기</h2>
            <CompanyInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ link: link, setLinkMsg: setLinkMsg, numberMsg: numberMsg, setNumberMsg: setNumberMsg, businessImage: businessImage, setBusinessImage: setBusinessImage }} />
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ setEmailMsg: setEmailMsg, emailMsg: emailMsg, phoneMsg: phoneMsg, setPhoneMsg: setPhoneMsg }} children={<div className="row">
                <label htmlFor="managerPassword">비밀번호</label>
                <input type="password" defaultValue={inputs.managerEmail} id="managerPassword" onChange={(e) => setInputs({ ...inputs, [e.target.id]: e.target.value })} />
            </div>} />
            <div className="btn-wrap">
                <button type="button" className="cancel-btn" >취소</button>
                <button type="button" className="submit-btn" onClick={create}>신청</button>
            </div>
        </main>
    )
}
export default CreateTeam;
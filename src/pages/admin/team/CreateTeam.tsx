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
    const [phoneMessage, setPhoneMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [businessNumberMessage, setBusinessNumberMessage] = useState("");
    const [homePageMessage, setHomePageMessage] = useState("");
    const [businessImage, setBusinessImage] = useState("");
    const create = () => {
        console.log(inputs);
        if (numberRegExp(inputs.businessNumber) == false) {
            setBusinessNumberMessage("올바른 번호의 형식이 아닙니다.")
        }
        if (homePageRegExp(inputs.homepage) == false) {
            setHomePageMessage("올바른 번호의 형식이 아닙니다.")
        }
        if (phoneRegExp(inputs.managerPhone) == false) {
            setPhoneMessage("올바른 번호의 형식이 아닙니다.")
        }
        if (emailRegExp(inputs.managerEmail) == false) {
            setEmailMessage("올바른 형식의 이메일 주소가 아닙니다.")
        }
        if (inputs.businessImage == null) {
            setBusinessImage("사업자 등록증을 첨부해주세요.")
        }
        if (numberRegExp(inputs.businessNumber) && homePageRegExp(inputs.homepage) && phoneRegExp(inputs.managerPhone) && emailRegExp(inputs.managerEmail) && inputs.businessImage != null) {
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
            <CompanyInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ homePageMessage: homePageMessage, setHomePageMessage: setHomePageMessage, businessNumberMessage: businessNumberMessage, setBusinessNumberMessage: setBusinessNumberMessage, businessImage: businessImage, setBusinessImage: setBusinessImage }} />
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ setEmailMessage: setEmailMessage, emailMessage: emailMessage, phoneMessage: phoneMessage, setPhoneMessage: setPhoneMessage }} children={<div className="row">
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
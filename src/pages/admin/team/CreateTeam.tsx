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
    const create = () => {
        console.log(inputs);
        if (numberRegExp(inputs.businessNumber) == false) {
            alert("올바른 번호의 형식이 아닙니다.")
        } else if (homePageRegExp(inputs.homepage) == false) {
            alert("올바른 주소의 형식이 아닙니다.")
        } else if (phoneRegExp(inputs.managerPhone) == false) {
            alert("올바른 번호의 형식이 아닙니다.")
        } else if (emailRegExp(inputs.managerEmail) == false) {
            alert("올바른 형식의 이메일 주소가 아닙니다.")
        } else if (inputs.businessImage == null) {
            alert("사업자 등록증을 첨부해주세요.")
        } else {
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
            <CompanyInfo useStateProperty={inputs} stateHandler={setInputs} />
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} children={<div className="row">
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
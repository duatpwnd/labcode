import { ManagerInfo, CompanyInfo, InputComponent } from "./Team"
import axios from "axios";
import apiUrl from "src/utils/api";
import "./Team.scoped.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { phoneRegExp, emailRegExp, numberRegExp, homePageRegExp } from 'src/utils/common';
const CreateTeam = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<{ [key: string]: any }>({ managerName: "", managerEmail: "snaptag@gmail.com", managerPhone: "010-0000-0000", title: "", description: "", businessNumber: "0000-0000", businessImage: {}, homepage: "https://snaptag.co.kr/", managerId: "", managerPassword: "" });
    const create = () => {
        if (emailRegExp(inputs.managerEmail) && phoneRegExp(inputs.managerPhone) && homePageRegExp(inputs.homepage) && numberRegExp(inputs.businessNumber)) {
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
            <section>
                <h3 className="h3-title">로그인 정보</ h3>
                <InputComponent title="아이디" id="managerId" useStateProperty={inputs} stateHandler={setInputs} />
                <InputComponent title="비밀번호" id="managerPassword" useStateProperty={inputs} stateHandler={setInputs} />
            </section>
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} />
            <div className="btn-wrap">
                <button type="button" className="cancel-btn" >취소</button>
                <button type="button" className="submit-btn" onClick={create}>신청</button>
            </div>
        </main>
    )
}
export default CreateTeam;
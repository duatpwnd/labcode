import axios from "axios";
import apiUrl from "src/utils/api";
import { useState } from "react"
import "./Team.scoped.scss"
const Team = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        businessNumber: "",
        logoImage: null,
        businessImage: {} as { [key: string]: any },
        homepage: "",
        managerName: "",
        managerEmail: "",
        managerPhone: ""
    });
    const onChange = (e: { [key: string]: any }) => {
        if (e.target.id == "logoImage" || e.target.id == "businessImage") {
            setInputs({
                ...inputs,
                logoImage: e.target.files[0],
                businessImage: e.target.files[0]
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.id]: e.target.value,
            })
        }
    };
    const modify = () => {
        console.log("body", inputs);
        const formData = new FormData();
        for (let key in inputs) {
            formData.append(key, inputs[key as never]);
        }
        axios
            .patch(apiUrl.team, formData)
            .then((result: any) => {
                console.log("수정결과:", result);
            }).catch((err: any) => {
                console.log('수정에러:', err);
            });
    }
    return (
        <main>
            <h2 className="h2-title">정보 입력</h2>
            <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>
            <section className="section1">
                <h3 className="h3-title">회사 정보</ h3>
                <div className="row">
                    <label htmlFor="title">회사명</label>
                    <input type="text" id="title" placeholder="회사명을 입력해주세요." onChange={onChange} />
                </div>
                <div className="row">
                    <label htmlFor="description">팀소개</label>
                    <input type="text" id="description" placeholder="팀소개를 입력해주세요." onChange={onChange} />
                </div>
                <div className="row">
                    <label htmlFor="businessNumber">사업자등록번호</label>
                    <input type="text" id="businessNumber" placeholder="사업자등록번호를 입력해주세요." onChange={onChange} />
                </div>
                <div className="row">
                    <label >사업자등록증</label>
                    <input type="text" className="input-file" value={inputs.businessImage.name || ""} placeholder="사업자등록증을 첨부해주세요." readOnly />
                    <input type="file" id="businessImage" onChange={onChange} />
                    <label htmlFor="businessImage" className="file">찾아보기</label>
                </div>
                <div className="row">
                    <label htmlFor="homepage">홈페이지 주소</label>
                    <input type="text" id="homepage" placeholder="홈페이지 주소를 입력해주세요." onChange={onChange} />
                </div>
            </section>
            <section>
                <h3 className="h3-title">담당자 정보</ h3>
                <div className="row">
                    <label htmlFor="managerName">담당자명</label>
                    <input type="text" id="managerName" placeholder="담당자명을 입력해주세요." onChange={onChange} />
                </div>
                <div className="row">
                    <label htmlFor="managerEmail">메일 주소</label>
                    <input type="text" id="managerEmail" placeholder="메일주소를 입력해주세요." onChange={onChange} />
                </div>
                <div className="row">
                    <label htmlFor="managerPhone">전화번호</label>
                    <input type="text" id="managerPhone" placeholder="전화번호를 입력해주세요." onChange={onChange} />
                </div>
            </section>
            <button type="button" onClick={modify}>수정</button>
        </main >
    )
}
export default Team
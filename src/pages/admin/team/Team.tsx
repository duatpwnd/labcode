import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState } from "react"
import _ from 'lodash'
import { convertURLtoFile } from "src/utils/common";
import "./Team.scoped.scss"
const Team = () => {
    console.log("리랜");
    const debounce = _.debounce;
    const [businessImageLink, setBusinessImageLink] = useState("");
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
    const inputDebounce = debounce((e) => {
        onChange(e);
    }, 500);
    const onChange = (e: { [key: string]: any }) => {
        let body;
        if (e.target.id == "logoImage" || e.target.id == "businessImage") {
            console.log(e.target.files[0]);
            body = {
                ...inputs,
                businessImage: e.target.files[0]
            }
        } else {
            body = {
                ...inputs,
                [e.target.id]: e.target.value
            }
        }
        modify(body);
    };
    const modify = (body) => {
        console.log("body", body);
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .patch(apiUrl.team, formData)
            .then((result: any) => {
                console.log("수정결과:", result);
                getTeamList();
            }).catch((err: any) => {
                console.log('수정에러:', err);
            });
    }
    const getTeamList = () => {
        axios
            .get(apiUrl.team)
            .then((result: any) => {
                console.log("팀리스트조회결과:", result);
                setBusinessImageLink(result.data.data.businessImage)
                convertURLtoFile(result.data.data.businessImage).then((fileObj) => {
                    setInputs({
                        ...result.data.data,
                        businessImage: fileObj,
                    })
                })

            });
    }
    useEffect(() => {
        getTeamList();
    }, [])
    return (
        <main>
            <h2 className="h2-title">정보 입력</h2>
            <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>
            <section className="section1">
                <h3 className="h3-title">회사 정보</ h3>
                <div className="row">
                    <label htmlFor="title">회사명</label>
                    <input type="text" defaultValue={inputs.title} id="title" placeholder="회사명을 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
                <div className="row">
                    <label htmlFor="description">팀소개</label>
                    <input type="text" defaultValue={inputs.description} id="description" placeholder="팀소개를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
                <div className="row">
                    <label htmlFor="businessNumber">사업자등록번호</label>
                    <input type="text" defaultValue={inputs.businessNumber} id="businessNumber" placeholder="사업자등록번호를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
                <div className="row">
                    <label >사업자등록증</label>
                    <input type="text" className="input-file" defaultValue={inputs.businessImage.name || ""} placeholder="사업자등록증을 첨부해주세요." onClick={() => window.open(businessImageLink, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400")} readOnly />
                    <input type="file" id="businessImage" onChange={(e) => inputDebounce(e)} />
                    <label htmlFor="businessImage" className="file">찾아보기</label>
                </div>
                <div className="row">
                    <label htmlFor="homepage">홈페이지 주소</label>
                    <input type="text" defaultValue={inputs.homepage} id="homepage" placeholder="홈페이지 주소를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
            </section>
            <section>
                <h3 className="h3-title">담당자 정보</ h3>
                <div className="row">
                    <label htmlFor="managerName">담당자명</label>
                    <input type="text" defaultValue={inputs.managerName} id="managerName" placeholder="담당자명을 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
                <div className="row">
                    <label htmlFor="managerEmail">메일 주소</label>
                    <input type="text" defaultValue={inputs.managerEmail} id="managerEmail" placeholder="메일주소를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
                <div className="row">
                    <label htmlFor="managerPhone">전화번호</label>
                    <input type="text" defaultValue={inputs.managerPhone} id="managerPhone" placeholder="전화번호를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                </div>
            </section>
        </main >
    )
}
export default Team
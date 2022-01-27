import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState, useMemo } from "react"
import _ from 'lodash'
import { convertURLtoFile } from "src/utils/common";
import {
    useLocation
} from "react-router-dom";
import "./Team.scoped.scss"
import { phoneRegExp, emailRegExp, numberRegExp, homePageRegExp } from 'src/utils/common';
export const InputComponent = ({ title, id, useStateProperty, stateHandler }) => {
    const [a, b] = useState<{ [key: string]: any }>({});
    const [isActive, setActive] = useState(false)
    const { pathname } = useLocation();
    const debounce = _.debounce;
    const modify = (body) => {
        delete body['link'];
        if (emailRegExp(body.managerEmail) && phoneRegExp(body.managerPhone) && homePageRegExp(body.homepage) && numberRegExp(body.businessNumber)) {
            const formData = new FormData();
            for (let key in body) {
                formData.append(key, body[key as never]);
            }
            axios
                .patch(apiUrl.team, formData)
                .then((result: any) => {
                    console.log("수정결과:", result);
                }).catch((err: any) => {
                    console.log('수정에러:', err);
                });
        }
    }
    const inputDebounce = debounce((e) => {
        const body = { ...a, [e.target.id]: e.target.id == "businessImage" ? e.target.files[0] : e.target.value }
        stateHandler(body);
        // 수정하기 페이지일때만 
        if (pathname == "/team") {
            modify(body)
        }
    }, 400);
    const emailCheck = useMemo(() => {
        return emailRegExp(a[id]);
    }, [a.managerEmail])
    const phoneCheck = useMemo(() => {
        return phoneRegExp(a[id]);
    }, [a.managerPhone])
    const urlCheck = useMemo(() => {
        return homePageRegExp(a[id]);
    }, [a.homepage])
    const businessNumberCheck = useMemo(() => {
        return numberRegExp(a[id]);
    }, [a.businessNumber])
    useEffect(() => {
        b(useStateProperty);
    }, [useStateProperty])
    return (
        <div className="row">
            {
                isActive && <img src={a.link} onClick={() => setActive(false)} className="modal-image" />
            }
            <label htmlFor={id}>{title}</label>
            {

                id == "businessImage" ?
                    <div className="business-image-area">
                        <div className="attach">
                            <a href={a.link} onClick={() => setActive(true)} className="input-file" download="newfilename">{a.businessImage == null ? "사업자등록증을 첨부해주세요." : a.businessImage?.name}</a>
                            <input type="file" id="businessImage" onChange={(e) => inputDebounce(e)} />
                            <button className="delete-btn"></button>
                        </div>
                        <label htmlFor="businessImage" className="file">찾아보기</label>
                    </div> : <input type={id == "managerPassword" ? "password" : "text"} defaultValue={a[id]} id={id} onChange={(e) => inputDebounce(e)} />
            }
            {id == "businessNumber" && businessNumberCheck == false && <p className="warn-message">올바른 번호의 형식이 아닙니다.</p>}
            {id == "homepage" && urlCheck == false && <p className="warn-message">올바른 주소의 형식이 아닙니다.</p>}
            {id == "managerPhone" && phoneCheck == false && <p className="warn-message">올바른 번호의 형식이 아닙니다.</p>}
            {id == "managerEmail" && emailCheck == false && <p className="warn-message">올바른 형식의 이메일 주소가 아닙니다.</p>}
        </div>
    )
}

export const ManagerInfo = ({ useStateProperty, stateHandler }) => {
    const arr = [{ title: "담당자명", id: "managerName" }, { title: "메일 주소", id: "managerEmail" }, { title: "전화번호", id: "managerPhone" }]
    return (
        <section>
            <h3 className="h3-title">담당자 정보</ h3>
            {
                arr.map((list, index) => <InputComponent key={index} title={list.title} id={list.id} useStateProperty={useStateProperty} stateHandler={stateHandler} />
                )
            }
        </section>
    )
}
export const CompanyInfo = ({ useStateProperty, stateHandler }) => {
    const arr = [{ title: "회사명", id: "title" }, { title: "팀소개", id: "description" }, { title: "사업자등록번호", id: "businessNumber" }, { title: "사업자등록증", id: "businessImage" }, { title: "홈페이지 주소", id: "homepage" }]
    return (
        <section className="section1">
            <h3 className="h3-title">회사 정보</ h3>
            {
                arr.map((list, index) => <InputComponent key={index} title={list.title} id={list.id} useStateProperty={useStateProperty} stateHandler={stateHandler} />
                )
            }
        </section>
    )
}
const Team = () => {
    const [inputs, setInputs] = useState({});
    const getTeamList = () => {
        axios
            .get(apiUrl.team)
            .then((result: any) => {
                console.log("팀리스트조회결과:", result);
                convertURLtoFile(result.data.data.businessImage).then((fileObj) => {
                    setInputs({
                        ...result.data.data,
                        link: result.data.data.businessImage,
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
            <CompanyInfo useStateProperty={inputs} stateHandler={setInputs} />
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} />
        </main >
    )
}
export default Team
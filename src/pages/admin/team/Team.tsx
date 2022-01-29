import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState, useMemo } from "react"
import _ from 'lodash'
import {
    useLocation
} from "react-router-dom";
import "./Team.scoped.scss"
import { phoneRegExp, emailRegExp, numberRegExp, homePageRegExp } from 'src/utils/common';
const debounce = _.debounce;
const modify = (body) => {
    console.log(body);
    const formData = new FormData();
    if (phoneRegExp(body.managerPhone) && emailRegExp(body.managerEmail) && numberRegExp(body.businessNumber) && homePageRegExp(body.homepage) && body.businessImage != null) {
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
export const ManagerInfo = ({ useStateProperty, stateHandler, validationCheck, children }: { [key: string]: any }) => {
    const { pathname } = useLocation();

    const phoneValueCheck = (e) => {
        const data = { ...useStateProperty, [e.target.id]: e.target.value }
        stateHandler(data);
        if (phoneRegExp(e.target.value) == false) {
            validationCheck.setPhoneMsg("올바른 번호의 형식이 아닙니다.");
        } else {
            validationCheck.setPhoneMsg("");
            if (pathname == "/team") {
                modify(data)
            }
        }
    }
    const emailValueCheck = (e) => {
        const data = { ...useStateProperty, [e.target.id]: e.target.value }
        stateHandler(data);
        if (emailRegExp(e.target.value) == false) {
            validationCheck.setEmailMsg("올바른 형식의 이메일 주소가 아닙니다.");
        } else {
            validationCheck.setEmailMsg("");
            if (pathname == "/team") {
                modify(data)
            }
        }
    };
    const notCheck = (e) => {
        const data = { ...useStateProperty, [e.target.id]: e.target.value }
        stateHandler(data);
        if (pathname == "/team") {
            modify(data)
        }
    }
    return (
        <section>
            <h3 className="h3-title">담당자 정보</ h3>
            <div className="row">
                <label htmlFor="managerName">담당자명</label>
                <input type="text" defaultValue={useStateProperty.managerName} id="managerName" onChange={debounce((e) => notCheck(e), 500)} />
            </div>
            <div className="row">
                <label htmlFor="managerPhone">연락처</label>
                <input type="text" defaultValue={useStateProperty.managerPhone} id="managerPhone" onChange={debounce((e) => phoneValueCheck(e), 500)} />
                <p className="warn-message">{validationCheck.phoneMsg}</p>
            </div>
            <div className="row">
                <label htmlFor="managerEmail">이메일</label>
                <input type="text" defaultValue={useStateProperty.managerEmail} id="managerEmail" onChange={debounce((e) => emailValueCheck(e), 500)} />
                <p className="warn-message">{validationCheck.emailMsg}</p>
            </div>
            {children}
        </section>
    )
}
export const CompanyInfo = ({ useStateProperty, stateHandler, validationCheck }) => {
    const [isActive, setActive] = useState(false);
    const [link, fileLink] = useState("");
    const { pathname } = useLocation();
    const businessNumberValueCheck = (e) => {
        const data = { ...useStateProperty, [e.target.id]: e.target.value }
        stateHandler(data);
        if (numberRegExp(e.target.value) == false) {
            validationCheck.setNumberMsg("올바른 번호의 형식이 아닙니다.");
        } else {
            validationCheck.setNumberMsg("");
            if (pathname == "/team") {
                modify(data)
            }
        }
    }
    const homePageValueCheck = (e) => {
        const data = { ...useStateProperty, [e.target.id]: e.target.value }
        stateHandler(data);
        if (homePageRegExp(e.target.value) == false) {
            validationCheck.setLinkMsg("올바른 주소의 형식이 아닙니다.");
        } else {
            validationCheck.setLinkMsg("");
            if (pathname == "/team") {
                modify(data)
            }
        }
    }
    const notCheck = (e) => {
        const idType = e.target.id == "businessImage" ? e.target.files[0] : e.target.value;
        const data = { ...useStateProperty, [e.target.id]: idType };
        if (e.target.id == "businessImage") {
            validationCheck.setBusinessImage("");
            fileLink(URL.createObjectURL(e.target.files[0]))
        }
        stateHandler(data);
        if (pathname == "/team") {
            modify(data)
        }
    }
    const getFileName = useMemo(() => {
        if (typeof useStateProperty.businessImage == "object") {
            return useStateProperty.businessImage.name
        } else {
            if (useStateProperty.businessImage != undefined) {
                return useStateProperty.businessImage.replace(/^.*\//, '')
            }
        }
    }, [useStateProperty.businessImage])
    return (
        <section className="section1">
            <h3 className="h3-title">회사 정보</ h3>
            <div className="row">
                <label htmlFor="title">회사명</label>
                <input type="text" defaultValue={useStateProperty.title} id="title" onChange={debounce((e) => notCheck(e), 500)} />
            </div>

            <div className="row">
                <label htmlFor="businessNumber">사업자등록번호</label>
                <input type="text" defaultValue={useStateProperty.businessNumber} id="businessNumber" onChange={debounce((e) => businessNumberValueCheck(e), 500)} />
                <p className="warn-message">{validationCheck.numberMsg}</p>
            </div>
            <div className="row">
                {
                    isActive && <img src={link || useStateProperty.businessImage} onClick={() => setActive(false)} className="modal-image" />
                }
                <label htmlFor="businessImage">사업자등록증</label>
                <div className="business-image-area">
                    <div className="attach">
                        <a href={link || useStateProperty.businessImage} onClick={() => useStateProperty.businessImage == null ? "" : setActive(true)} className="input-file" download="newfilename">{useStateProperty.businessImage == null ? "사업자등록증을 첨부해주세요." : getFileName}</a>
                        <input type="file" defaultValue={useStateProperty.businessImage} id="businessImage" onChange={(e) => notCheck(e)} />
                        <button className="delete-btn"></button>
                    </div>
                    <label htmlFor="businessImage" className="file">찾아보기</label>
                </div>
                <p className="warn-message">{validationCheck.businessImage}</p>
            </div>

            <div className="row">
                <label htmlFor="homepage">홈페이지 주소</label>
                <input type="text" defaultValue={useStateProperty.homepage} id="homepage" onChange={debounce((e) => homePageValueCheck(e), 500)} />
                <p className="warn-message">{validationCheck.link}</p>
            </div>
        </section>
    )
}
const Team = () => {
    const [inputs, setInputs] = useState({});
    const [phoneMsg, setPhoneMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [numberMsg, setNumberMsg] = useState("");
    const [link, setLinkMsg] = useState("");
    const [businessImage, setBusinessImage] = useState("");
    const getTeamList = () => {
        axios
            .get(apiUrl.team)
            .then((result: any) => {
                console.log('조회결과:', result);
                setInputs({
                    ...result.data.data,
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
            <CompanyInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ link: link, setLinkMsg: setLinkMsg, numberMsg: numberMsg, setNumberMsg: setNumberMsg, businessImage: businessImage, setBusinessImage: setBusinessImage }} />
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ setEmailMsg: setEmailMsg, emailMsg: emailMsg, phoneMsg: phoneMsg, setPhoneMsg: setPhoneMsg }} />
        </main >
    )
}
export default Team
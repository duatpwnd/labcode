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
export const ManagerInfo = (props) => {
    const { pathname } = useLocation();

    const phoneValueCheck = (e) => {
        if (phoneRegExp(e.target.value) == false) {
            props.stateHandler({ ...props.useStateProperty, [e.target.id]: e.target.value });
            props.validationCheck.setPhoneMessage("올바른 번호의 형식이 아닙니다.");
        } else {
            props.validationCheck.setPhoneMessage("");
            props.stateHandler({ ...props.useStateProperty, [e.target.id]: e.target.value });
            if (pathname == "/team") {
                modify({ ...props.useStateProperty, [e.target.id]: e.target.value })
            }
        }
    }
    const emailValueCheck = (e) => {
        if (emailRegExp(e.target.value) == false) {
            props.stateHandler({ ...props.useStateProperty, [e.target.id]: e.target.value });
            props.validationCheck.setEmailMessage("올바른 형식의 이메일 주소가 아닙니다.");
        } else {
            props.validationCheck.setEmailMessage("");
            props.stateHandler({ ...props.useStateProperty, [e.target.id]: e.target.value });
            if (pathname == "/team") {
                modify({ ...props.useStateProperty, [e.target.id]: e.target.value })
            }
        }
    };
    const notCheck = (e) => {
        props.stateHandler({ ...props.useStateProperty, [e.target.id]: e.target.value });
        if (pathname == "/team") {
            modify({ ...props.useStateProperty, [e.target.id]: e.target.value })
        }
    }
    return (
        <section>
            <h3 className="h3-title">담당자 정보</ h3>
            <div className="row">
                <label htmlFor="managerName">담당자명</label>
                <input type="text" defaultValue={props.useStateProperty.managerName} id="managerName" onChange={debounce((e) => notCheck(e), 500)} />
            </div>
            <div className="row">
                <label htmlFor="managerPhone">연락처</label>
                <input type="text" defaultValue={props.useStateProperty.managerPhone} id="managerPhone" onChange={debounce((e) => phoneValueCheck(e), 500)} />
                <p className="warn-message">{props.validationCheck.phoneMessage}</p>
            </div>
            <div className="row">
                <label htmlFor="managerEmail">이메일</label>
                <input type="text" defaultValue={props.useStateProperty.managerEmail} id="managerEmail" onChange={debounce((e) => emailValueCheck(e), 500)} />
                <p className="warn-message">{props.validationCheck.emailMessage}</p>
            </div>
            {props.children}
        </section>
    )
}
export const CompanyInfo = ({ useStateProperty, stateHandler, validationCheck }) => {
    const [isActive, setActive] = useState(false);
    const [link, fileLink] = useState("");
    const { pathname } = useLocation();
    const businessNumberValueCheck = (e) => {
        if (numberRegExp(e.target.value) == false) {
            stateHandler({ ...useStateProperty, [e.target.id]: e.target.value });
            validationCheck.setBusinessNumberMessage("올바른 번호의 형식이 아닙니다.");
        } else {
            validationCheck.setBusinessNumberMessage("");
            stateHandler({ ...useStateProperty, [e.target.id]: e.target.value });
            if (pathname == "/team") {
                modify({ ...useStateProperty, [e.target.id]: e.target.value })
            }
        }
    }
    const homePageValueCheck = (e) => {
        if (homePageRegExp(e.target.value) == false) {
            stateHandler({ ...useStateProperty, [e.target.id]: e.target.value });
            validationCheck.setHomePageMessage("올바른 주소의 형식이 아닙니다.");
        } else {
            validationCheck.setHomePageMessage("");
            stateHandler({ ...useStateProperty, [e.target.id]: e.target.value });
            if (pathname == "/team") {
                modify({ ...useStateProperty, [e.target.id]: e.target.value })
            }
        }
    }
    const notCheck = (e) => {
        if (e.target.id == "businessImage") {
            validationCheck.setBusinessImage("");
            fileLink(URL.createObjectURL(e.target.files[0]))
        }
        stateHandler({ ...useStateProperty, [e.target.id]: e.target.id == "businessImage" ? e.target.files[0] : e.target.value });
        if (pathname == "/team") {
            modify({ ...useStateProperty, [e.target.id]: e.target.id == "businessImage" ? e.target.files[0] : e.target.value })
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
                <p className="warn-message">{validationCheck.businessNumberMessage}</p>
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
                <p className="warn-message">{validationCheck.homePageMessage}</p>
            </div>
        </section>
    )
}
const Team = () => {
    const [inputs, setInputs] = useState({});
    const [phoneMessage, setPhoneMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [businessNumberMessage, setBusinessNumberMessage] = useState("");
    const [homePageMessage, setHomePageMessage] = useState("");
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
            <CompanyInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ homePageMessage: homePageMessage, setHomePageMessage: setHomePageMessage, businessNumberMessage: businessNumberMessage, setBusinessNumberMessage: setBusinessNumberMessage, businessImage: businessImage, setBusinessImage: setBusinessImage }} />
            <ManagerInfo useStateProperty={inputs} stateHandler={setInputs} validationCheck={{ setEmailMessage: setEmailMessage, emailMessage: emailMessage, phoneMessage: phoneMessage, setPhoneMessage: setPhoneMessage }} />
        </main >
    )
}
export default Team
import axios from "axios";
import apiUrl from "src/utils/api";
import "./Team.scoped.scss"
import toast from 'react-hot-toast';
import { useEffect, useState, useMemo } from "react"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import _ from 'lodash'
import {
    useLocation
} from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { checkCorporateRegistrationNumber, homePageReg, phoneReg, emailReg } from 'src/utils/common';
import ConfirmModal from "src/components/common/confirm-modal/ConfirmModal";
const debounce = _.debounce;

const Team = () => {
    const [isActiveCancelApplyModal, setActiveCancelApplyModal] = useState(false); // 신청 취소 모달
    const [isActiveApplyModal, setActiveApplyModal] = useState(false); // 신청 모달
    const [inputs, setInputs] = useState<{ [key: string]: any }>({}); // 기본값
    const [numberMsg, setNumberMsg] = useState(""); // 사업자 등록번호 유효성 메세지
    const [link, setLinkMsg] = useState(""); // 홈페이지 주소 유효성 메세지
    const [businessImage, setBusinessImage] = useState(""); // 사업자 등록증 유효성 메세지
    const [isActiveImageModal, setActiveImageModal] = useState(false);
    const [fileLink, setFileLink] = useState("");
    const [phoneMsg, setPhoneMsg] = useState(""); // 연락처 유효성 메세지
    const [emailMsg, setEmailMsg] = useState(""); // 이메일 유효성 메세지
    const { pathname } = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    // 팀수정
    const modify = (body, teamId) => {
        console.log(body, teamId);
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .patch(apiUrl.team + `/${teamId}`, formData)
            .then((result: any) => {
                console.log("수정결과:", result);
            }).catch((err: any) => {
                console.log('수정에러:', err);
            });

    }
    // 팀생성
    const createTeam = (inputs) => {
        console.log(inputs);
        const phoneCheck = phoneReg.test(inputs.managerPhone)
        const emailCheck = emailReg.test(inputs.managerEmail)
        const numberCheck = checkCorporateRegistrationNumber((inputs.businessNumber || "").replaceAll("-", ""))
        const homepageCheck = homePageReg.test(inputs.homepage);
        if (phoneCheck == false) {
            setPhoneMsg("올바른 번호의 형식이 아닙니다.");
        }
        if (emailCheck == false) {
            setEmailMsg("올바른 형식의 이메일 주소가 아닙니다.");
        }
        if (numberCheck == false) {
            setNumberMsg("올바른 번호의 형식이 아닙니다.");
        }
        if (homepageCheck == false) {
            setLinkMsg("올바른 주소가 아닙니다.")
        }
        if (phoneCheck && emailCheck && numberCheck && homepageCheck) {
            const formData = new FormData();
            for (let key in inputs) {
                formData.append(key, inputs[key as never]);
            }
            console.log("팀생성:", inputs);
            axios
                .post(apiUrl.team, formData)
                .then((result: any) => {
                    console.log("팀생성결과:", result);
                    navigate("/");
                }).catch((err: any) => {
                    console.log('팀생성에러:', err);
                });
        } else {
            setActiveApplyModal(false)
        }
    }
    // 팀조회
    const getTeamList = (teamId) => {
        axios
            .get(apiUrl.team + `/${teamId}`)
            .then((result: any) => {
                console.log('조회결과:', result);
                setInputs({
                    ...result.data.data,
                })
            });
    }
    const phoneValueCheck = (e) => {
        const data = { ...inputs, [e.target.id]: e.target.value }
        const result = phoneReg.test(e.target.value);
        setInputs(data);
        if (result && pathname != "/teams/create") {
            setPhoneMsg("");
            modify(data, params.teamId)
        } else if (result == false) {
            setPhoneMsg("올바른 번호의 형식이 아닙니다.");
        } else {
            setPhoneMsg("");
        }
    }
    const emailValueCheck = (e) => {
        const data = { ...inputs, [e.target.id]: e.target.value }
        const result = emailReg.test(e.target.value);
        setInputs(data);
        if (result && pathname != "/teams/create") {
            setEmailMsg("");
            modify(data, params.teamId)
        } else if (result == false) {
            setEmailMsg("올바른 형식의 이메일 주소가 아닙니다.");
        } else {
            setEmailMsg("");
        }
    };
    const businessNumberValueCheck = (e) => {
        const data = { ...inputs, [e.target.id]: e.target.value }
        const result = checkCorporateRegistrationNumber(e.target.value.replaceAll("-", ""))
        setInputs(data);
        if (result && pathname != "/teams/create") {
            setNumberMsg("");
            modify(data, params.teamId)
        } else if (result == false) {
            setNumberMsg("올바른 번호의 형식이 아닙니다.");
        } else {
            setNumberMsg("");
        }
    }
    const homePageValueCheck = (e) => {
        const data = { ...inputs, [e.target.id]: e.target.value }
        const result = homePageReg.test(e.target.value);
        setInputs(data);
        if (result && pathname != "/teams/create") {
            setLinkMsg("");
            modify(data, params.teamId)
        } else if (result == false) {
            setLinkMsg("올바른 주소가 아닙니다.")
        } else {
            setLinkMsg("");
        }
    }
    const notCheck = (e) => {
        let data = { ...inputs, [e.target.id]: e.target.id == "businessImage" ? e.target.files[0] : e.target.value }
        if (e.target.id == "businessImageUrl") {
            data = {
                ...data,
                businessImage: null
            }
        }
        if (e.target.id == "businessImage" && e.target.files[0] != "") {
            setBusinessImage("");
            setFileLink(URL.createObjectURL(e.target.files[0]))
        }
        setInputs(data);

        if (pathname != "/teams/create") {
            modify(data, params.teamId)
        }
    }
    const fileCheck = useMemo(() => {
        if (inputs.businessImage != undefined) {
            let fileLength = (inputs.businessImage.name || inputs.businessImage).length;
            let fileDot = (inputs.businessImage.name || inputs.businessImage).lastIndexOf(".");
            let fileType = (inputs.businessImage.name || inputs.businessImage).substring(fileDot + 1, fileLength);
            return fileType;
        }
    }, [inputs.businessImage])
    // 신청 완료 모달
    const submit = () => {
        createTeam(inputs)
    }
    // 신청 취소 모달
    const ok = () => {
        setActiveCancelApplyModal(false);
        navigate(-1);
    }
    const copy = () => {
        toast.dismiss();
        toast.success('복사되었습니다.')
    }
    useEffect(() => {
        // 수정페이지만 조회
        if (pathname != "/teams/create") {
            getTeamList(params.teamId);
        }
    }, [])
    return (
        <>
            {
                isActiveApplyModal && <ConfirmModal title="신청 완료" contents="담당자가 2~3일 내 연락드릴 예정입니다." cancelEvent={() => setActiveApplyModal(false)} okEvent={submit} />
            }
            {
                isActiveCancelApplyModal && <ConfirmModal title="신청 취소" contents="취소하시겠습니까?" cancelEvent={() => setActiveCancelApplyModal(false)} okEvent={ok} />
            }
            <main>
                <h2 className="h2-title">{pathname == "/teams/create" ? "신청하기" : "상세 정보"}</h2>
                {pathname != "/teams/create" && <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>}
                <section className="section1">
                    <h3 className="h3-title">회사 정보</ h3>
                    <div className="row">
                        <label htmlFor="title">회사명</label>
                        <input type="text" placeholder="회사명 입력" defaultValue={inputs.title} id="title" onChange={debounce((e) => notCheck(e), 500)} />
                    </div>

                    <div className="row">
                        <label htmlFor="businessNumber">사업자등록번호</label>
                        <input type="text" placeholder="사업자등록번호 입력" defaultValue={inputs.businessNumber} id="businessNumber" onChange={debounce((e) => businessNumberValueCheck(e), 500)} />
                        <p className="warn-message">{numberMsg}</p>
                    </div>
                    <div className="row">
                        {
                            isActiveImageModal && <>
                                <div className="mask" onClick={() => setActiveImageModal(false)}>
                                </div>
                                {
                                    fileCheck == "PDF" || fileCheck == "pdf" ? <embed src={fileLink || inputs.businessImage} width="90%" height="90%" /> : <img src={fileLink || inputs.businessImage} className="image-modal" />

                                }
                            </>

                        }
                        <label htmlFor="businessImage">사업자등록증
                        </label>
                        <div className="business-image-area">
                            <div className="attach">
                                {
                                    inputs.businessImage == null || inputs.businessImage == "" ? <span className="input-file" >사업자등록증 첨부</span> : <span onClick={() => setActiveImageModal(true)} className="input-file" >{inputs.businessImage.name || inputs.businessImageTitle + " (" + inputs.businessImageSize + ")"}</span>

                                }
                                <input type="file" defaultValue={inputs.businessImage} id="businessImage" onChange={(e) => notCheck(e)} />
                                {
                                    inputs.businessImage != null && inputs.businessImage != "" && <button className="delete-btn" onClick={() => { notCheck({ target: { id: "businessImageUrl", value: "" } }); }}></button>

                                }
                            </div>
                            <label htmlFor="businessImage" className="file">찾아보기</label>
                        </div>
                        <p className="warn-message">{businessImage}</p>
                    </div>

                    <div className="row">
                        <label htmlFor="homepage">홈페이지 주소</label>
                        <input type="text" placeholder="홈페이지 주소 입력" defaultValue={inputs.homepage} id="homepage" onChange={debounce((e) => homePageValueCheck(e), 500)} />
                        <p className="warn-message">{link}</p>
                    </div>
                </section>
                <section>
                    <h3 className="h3-title">담당자 정보</ h3>
                    <div className="row">
                        <label htmlFor="managerName">담당자명</label>
                        <input type="text" placeholder="담당자명 입력" defaultValue={inputs.managerName} id="managerName" onChange={debounce((e) => notCheck(e), 500)} />
                    </div>
                    <div className="row">
                        <label htmlFor="managerPhone">연락처</label>
                        <input type="text" placeholder="연락처 입력" defaultValue={inputs.managerPhone} id="managerPhone" onChange={debounce((e) => phoneValueCheck(e), 500)} />
                        <p className="warn-message">{phoneMsg}</p>
                    </div>
                    <div className="row">
                        <label htmlFor="managerEmail">이메일</label>
                        <input type="text" placeholder="이메일 입력" defaultValue={inputs.managerEmail} id="managerEmail" onChange={debounce((e) => emailValueCheck(e), 500)} />
                        <p className="warn-message">{emailMsg}</p>
                    </div>
                    {

                        pathname != "/teams/create" &&
                        <>
                            <div className="row">
                                <label htmlFor="apiKey">Key</label>
                                <div className="key-area">
                                    <input type="text" readOnly defaultValue={inputs.apiKey} id="apiKey" onChange={debounce((e) => notCheck(e), 500)} />
                                    <CopyToClipboard text={inputs.apiKey}>
                                        <button className="copy-btn" onClick={copy}></button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="apiSecret">Secret</label>
                                <div className="secret-area">
                                    <input type="text" readOnly defaultValue={inputs.apiSecret} id="apiSecret" onChange={debounce((e) => notCheck(e), 500)} />
                                    <CopyToClipboard text={inputs.apiSecret}>
                                        <button className="copy-btn" onClick={copy}></button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </>
                    }
                    {/* 팀생성일때만 존재 */}
                    {
                        pathname == "/teams/create" &&
                        <div className="row">
                            <label htmlFor="managerPassword">비밀번호</label>
                            <input type="password" placeholder="8~16자, 소문자, 숫자 입력" id="managerPassword" onChange={debounce((e) => notCheck(e), 500)} />
                        </div>
                    }
                </section>
                {/* 팀생성일때만 존재 */}
                {
                    pathname == "/teams/create" && <div className="btn-wrap">
                        <button type="button" className="cancel-btn" onClick={() => setActiveCancelApplyModal(true)}>취소</button>
                        <button type="button" className="submit-btn" onClick={() => setActiveApplyModal(true)}>신청</button>
                    </div>
                }
            </main>
        </>
    )
}
export default Team
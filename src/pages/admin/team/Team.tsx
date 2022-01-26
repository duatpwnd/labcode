import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState, useMemo } from "react"
import _ from 'lodash'
import { convertURLtoFile } from "src/utils/common";
import "./Team.scoped.scss"
const InputComponent = ({ title, id, value, eventHandler }) => {
    const [a, b] = useState<{ [key: string]: any }>({});
    const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/; // 전화번호
    const homePageRegExp = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/; //홈페이지
    const numberRegExp = /[0-9]/;  // 숫자만
    const [isActive, setActive] = useState(false)
    const debounce = _.debounce;
    const modify = (body) => {
        delete body['link'];
        console.log('수정요청', body);
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
    const inputDebounce = debounce((e) => {
        const body = { ...a, [e.target.id]: e.target.id == "businessImage" ? e.target.files[0] : e.target.value }
        eventHandler(body);
        if (e.target.id == "managerEmail") {
            if (emailRegExp.test(e.target.value)) {
                modify(body)
            }
        } else if (e.target.id == "managerPhone") {
            if (phoneRegExp.test(e.target.value)) {
                modify(body)
            }
        } else if (e.target.id == "homepage") {
            if (homePageRegExp.test(e.target.value)) {
                modify(body)
            }
        } else if (e.target.id == "businessNumber") {
            if (numberRegExp.test(e.target.value)) {
                modify(body)
            }
        } else {
            modify(body)
        }
    }, 400);
    const emailCheck = useMemo(() => {
        const test = emailRegExp.test(a[id]);
        return test;
    }, [a.managerEmail])
    const phoneCheck = useMemo(() => {
        const test = phoneRegExp.test(a[id]);
        return test;
    }, [a.managerPhone])
    const urlCheck = useMemo(() => {
        const test = homePageRegExp.test(a[id]);
        return test;
    }, [a.homepage])
    const businessNumberCheck = useMemo(() => {
        const test = numberRegExp.test(a[id]);
        return test;
    }, [a.businessNumber])
    useEffect(() => {
        b(value);
        console.log("aaa", id);
    }, [value])
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
                    </div> : <input type="text" defaultValue={a[id]} id={id} onChange={(e) => inputDebounce(e)} />
            }
            {id == "businessNumber" && businessNumberCheck == false && <p className="warn-message">올바른 번호의 형식이 아닙니다.</p>}
            {id == "homepage" && urlCheck == false && <p className="warn-message">올바른 주소의 형식이 아닙니다.</p>}
            {id == "managerPhone" && phoneCheck == false && <p className="warn-message">올바른 번호의 형식이 아닙니다.</p>}
            {id == "managerEmail" && emailCheck == false && <p className="warn-message">올바른 형식의 이메일 주소가 아닙니다.</p>}
        </div>
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
            <section className="section1">
                <h3 className="h3-title">회사 정보</ h3>
                <InputComponent title="회사명" id="title" value={inputs} eventHandler={setInputs} />
                <InputComponent title="팀소개" id="description" value={inputs} eventHandler={setInputs} />
                <InputComponent title="사업자등록번호" id="businessNumber" value={inputs} eventHandler={setInputs} />
                <InputComponent title="사업자등록증" id="businessImage" value={inputs} eventHandler={setInputs} />
                <InputComponent title="홈페이지 주소" id="homepage" value={inputs} eventHandler={setInputs} />
            </section>
            <section>
                <h3 className="h3-title">담당자 정보</ h3>
                <InputComponent title="담당자명" id="managerName" value={inputs} eventHandler={setInputs} />
                <InputComponent title="메일 주소" id="managerEmail" value={inputs} eventHandler={setInputs} />
                <InputComponent title="전화번호" id="managerPhone" value={inputs} eventHandler={setInputs} />
            </section>
        </main >
    )
}
export default Team
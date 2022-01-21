import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState, useMemo } from "react"
import _ from 'lodash'
import { convertURLtoFile } from "src/utils/common";
import "./Team.scoped.scss"
const debounce = _.debounce;
const modify = (body) => {
    console.log("수정요청", body);
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

const InputComponent = ({ title, id, value }) => {
    const [a, b] = useState<{ [key: string]: any }>({});
    const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일
    const phoneRegExp = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/; // 전화번호
    const homePageRegExp = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/; //홈페이지
    const numberRegExp = /[0-9]/;  // 숫자만

    const inputDebounce = debounce((e) => {
        b({ ...a, [e.target.id]: e.target.value })
        console.log(e.target.id, e.target.value)
        console.log(emailRegExp.test(e.target.value), phoneRegExp.test(e.target.value), homePageRegExp.test(e.target.value), numberRegExp.test(e.target.value));
        if (emailRegExp.test(e.target.value) && phoneRegExp.test(e.target.value) && homePageRegExp.test(e.target.value) && numberRegExp.test(e.target.value)) {
            modify({ ...a, [e.target.id]: e.target.value })
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
    }, [value])
    return (
        <div className="row">
            <label htmlFor={id}>{title}</label>
            <input type="text" defaultValue={a[id]} id={id} onChange={(e) => inputDebounce(e)} />
            {id == "businessNumber" && businessNumberCheck == false && <p className="warn-message">올바른 번호의 형식이 아닙니다.</p>}
            {id == "homepage" && urlCheck == false && <p className="warn-message">올바른 주소의 형식이 아닙니다.</p>}
            {id == "managerPhone" && phoneCheck == false && <p className="warn-message">올바른 번호의 형식이 아닙니다.</p>}
            {id == "managerEmail" && emailCheck == false && <p className="warn-message">올바른 형식의 이메일 주소가 아닙니다.</p>}
        </div>
    )
}
const Team = () => {
    const [isActive, setActive] = useState(false)
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
            {

                isActive && <div className="link-modal" onClick={() => setActive(false)}>
                    <img src={businessImageLink} />
                </div>
            }
            <h2 className="h2-title">정보 입력</h2>
            <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>
            <section className="section1">
                <h3 className="h3-title">회사 정보</ h3>
                <InputComponent title="회사명" id="title" value={inputs} />
                <InputComponent title="팀소개" id="description" value={inputs} />
                <InputComponent title="사업자등록번호" id="businessNumber" value={inputs} />
                {/* <div className="row">
                    <label >사업자등록증</label>
                    <input type="text" onClick={() => setActive(true)} className="input-file" defaultValue={inputs.businessImage.name || ""} placeholder="사업자등록증을 첨부해주세요." readOnly />
                    <input type="file" id="businessImage" onChange={(e) => inputDebounce(e)} />
                    <label htmlFor="businessImage" className="file">찾아보기</label>
                </div> */}
                <InputComponent title="홈페이지 주소" id="homepage" value={inputs} />
            </section>
            <section>
                <h3 className="h3-title">담당자 정보</ h3>
                <InputComponent title="담당자명" id="managerName" value={inputs} />
                <InputComponent title="메일 주소" id="managerEmail" value={inputs} />
                <InputComponent title="전화번호" id="managerPhone" value={inputs} />
                {/* <div className="row">
                    <label htmlFor="managerEmail">메일 주소</label>
                    <input type="text" defaultValue={inputs.managerEmail} id="managerEmail" placeholder="메일주소를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                    {emailCheck == false && <p className="warn-message">올바른 형식의 이메일 주소가 아닙니다.</p>
                    }
                </div>
                <div className="row">
                    <label htmlFor="managerPhone">전화번호</label>
                    <input type="text" defaultValue={inputs.managerPhone} id="managerPhone" placeholder="전화번호를 입력해주세요." onChange={(e) => inputDebounce(e)} />
                    {phoneCheck == false && <p className="warn-message">올바른 형식의 번호가 아닙니다.</p>
                    }
                </div> */}
            </section>
        </main >
    )
}
export default Team
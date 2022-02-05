import "./DefaultInfo.scoped.scss"
import DragDrop from "components/common/drag-drop/DragDrop";
import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
const ControlButton = ({ arr, inputs, eventHandler, id }) => {
    const [scale, setScale] = useState(0);
    const [position, setPosition] = useState(-100);
    const onChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        const toNumber = Number(e.target.value);
        if (toNumber >= 2 && toNumber <= 4) {
            setPosition((toNumber - 2) * 10)
        } else if (toNumber >= 5 && toNumber <= 12) {
            setPosition(toNumber * 5)
        } else if (toNumber >= 13 && toNumber <= 20) {
            setPosition((((toNumber - 12) * 2.5) + 60));
        } else {
            setPosition(-100);
        }
        setScale(toNumber);
        eventHandler({ ...inputs, [id]: toNumber })

    }
    useEffect(() => {
    }, [])
    return (
        <div className="control-btn-wrap">
            {arr.length == 5 && <input type="tel" className="numeric-input" value={inputs[id]} maxLength={2} onChange={(e) => onChange(e)} />}
            <div className="control">
                <span style={{ left: position + "%" }}>{scale}</span>
                {
                    arr.map((el, index) => <button style={{ width: arr.length == 5 ? "20%" : "33.333%" }} onClick={() => { eventHandler({ ...inputs, [id]: el.size }); setPosition(-100); }} key={index} className={el.size == inputs[id] ? "selected" : ""}>{el.text}{el.size}</button>)
                }
            </div>
        </div>
    )
}
const DefaultInfo = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [scaleArr, setScaleArr] = useState<{ [key: string]: any }[]>([]);
    const [alphaArr, setAlphaArr] = useState<{ [key: string]: any }[]>([]);
    const [inputs, setInputs] = useState({
        projectId: "",
        embedding: "2.5",
        channel: "lab_rgb",
        title: "",
        description: "",
        labcodeImage: "",
        sourceImage: params.type == "1" ? null : {} as { [key: string]: any },
        url: "",
        scale: 4,
        alpha: 8
    });
    const onChange = (e: { [key: string]: any }) => {
        if (e.target == undefined) {
            setInputs({
                ...inputs,
                sourceImage: e,
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.id]: e.target.value,
            })
        }
    };
    const apply = (body) => {
        console.log("body", body);
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .post(apiUrl.products, formData)
            .then((result: any) => {
                console.log("기본정보적용결과:", result);
                getProductDetail();
            }).catch((err: any) => {
                console.log('기본정보적용에러:', err);
            });
    }
    const getProductDetail = () => {
        axios
            .get(apiUrl.products + `/${params.id}`)
            .then((result: any) => {
                console.log('제품 상세 조회:', result.data.data);

                setInputs({
                    ...result.data.data
                })
            }).catch((err) => {
                console.log("제품 상세 조회 에러:", err);
            })
    }
    useEffect(() => {
        // 외부용일경우
        const externalUseScale = [{ size: 4, text: "작게" }, { size: 8, text: "중간" }, { size: 12, text: "크게" }];
        // 내부용일경우
        const internalUseScale = [{ size: 2, text: '매우 작게' }, ...externalUseScale, { size: 20, text: "매우 크게" }];
        setScaleArr(internalUseScale)

        // 수정페이지일때
        if (params.type == "0") {
            getProductDetail();
        }
    }, [])
    return (
        <section>
            <h3 className="h3-title">기본 정보</h3>
            <div className="form">
                <div className="row">
                    <label htmlFor="title" className="title" >제목</label>
                    <input type="text" id="title" defaultValue={inputs.title} placeholder="제목을 입력해주세요." onChange={(e) => onChange(e)} />
                </div>
                <div className="row">
                    <label htmlFor="description">설명</label>
                    <textarea id="description" defaultValue={inputs.description} placeholder="버스 기사가 승객을 태우고 주행을 하면서 휴대폰 게임을 해 버스 승객이 불안에 떠는 일이 벌어졌다.23일 연합뉴스 보도에 따르면 지난 20일 서울 시내의 한 버스에서 기사가 휴대폰 게임을 켜놓은 채 주행을 했고 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다." onChange={(e) => onChange(e)}>
                    </textarea>
                </div>
                <div className="row">
                    <label htmlFor="url" className="link">링크</label>
                    <input type="text" id="url" defaultValue={inputs.url} placeholder="링크를 입력해주세요." onChange={(e) => onChange(e)} />
                </div>
                <div className="row">
                    <label className="source-image">원본 이미지</label>
                    <DragDrop link={inputs.sourceImage} eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "459px" }} />
                </div>
                <div className="row">
                    <label htmlFor="scale" className="scale">코드 크기</label>
                    <ControlButton inputs={inputs} id="scale" eventHandler={setInputs} arr={scaleArr} />
                </div>
                <div className="row">
                    <label htmlFor="alpha" className="alpha">적용 세기</label>
                    <ControlButton inputs={inputs} id="alpha" eventHandler={setInputs} arr={[{ size: 4, text: "약하게" }, { size: 8, text: "중간" }, { size: 12, text: "세게" }]} />
                </div>
                {/* 수정페이지에만 존재 */}
                {
                    params.type == "0" &&
                    <div className="row">
                        <label>변경 이미지</label>
                        <img src={inputs.labcodeImage} alt="labcodeImage" title="labcodeImage" className="labcodeImage" />
                    </div>
                }
                <div className="btn-wrap">
                    <button className="cancel-btn">취소</button>
                    <button type="button" className="submit-btn" onClick={() => { apply({ ...inputs }) }}>기술 적용하기</button>
                </div>
            </div>
        </section>
    )
}
export default DefaultInfo
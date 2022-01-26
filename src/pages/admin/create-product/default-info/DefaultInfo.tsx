import "./DefaultInfo.scoped.scss"
import DragDrop from "components/common/drag-drop/DragDrop";
import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
const ControlButton = ({ arr, inputs, eventHandler, id }) => {
    useEffect(() => {
    }, [])
    return (
        <div className="control">
            {
                arr.map((el, index) => <button onClick={() => eventHandler({ ...inputs, [id]: el.size })} key={index} className={el.size == inputs[id] ? "selected" : ""}>{el.text}{el.size}</button>)
            }
        </div>
    )
}
const DefaultInfo = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        projectId: params.id,
        typeEmbedding: "2.5",
        typeChannel: "lab_rgb",
        title: "",
        description: "",
        sourceImage: {} as { [key: string]: any },
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
                navigate(`/product/${params.id}`)
            }).catch((err: any) => {
                console.log('기본정보적용에러:', err);
            });
    }
    return (
        <section>
            <h3 className="h3-title">기본 정보</h3>
            <div className="form">
                <div className="row">
                    <label htmlFor="title" className="title">제목</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요." onChange={(e) => onChange(e)} />
                </div>
                <div className="row">
                    <label htmlFor="description">설명</label>
                    <textarea id="description" placeholder="버스 기사가 승객을 태우고 주행을 하면서 휴대폰 게임을 해 버스 승객이 불안에 떠는 일이 벌어졌다.23일 연합뉴스 보도에 따르면 지난 20일 서울 시내의 한 버스에서 기사가 휴대폰 게임을 켜놓은 채 주행을 했고 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다." onChange={(e) => onChange(e)}>
                    </textarea>
                </div>
                <div className="row">
                    <label htmlFor="url" className="link">링크</label>
                    <input type="text" id="url" placeholder="링크를 입력해주세요." onChange={(e) => onChange(e)} />
                </div>
                <div className="row">
                    <label>배너</label>
                    <DragDrop eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "459px" }} />
                </div>
                <div className="row">
                    <label htmlFor="scale" className="scale">코드 크기</label>
                    <ControlButton inputs={inputs} id="scale" eventHandler={setInputs} arr={[{ size: 4, text: "작게" }, { size: 8, text: "중간" }, { size: 12, text: "크게" }]} />
                </div>
                <div className="row">
                    <label htmlFor="alpha" className="alpha">적용 세기</label>
                    <ControlButton inputs={inputs} id="alpha" eventHandler={setInputs} arr={[{ size: 4, text: "약하게" }, { size: 8, text: "중간" }, { size: 12, text: "세게" }]} />
                </div>
                <div className="row btn-area">
                    <label className="except"></label>
                    <div className="btn-wrap">
                        <button className="cancel-btn">취소</button>
                        <button type="button" className="submit-btn" onClick={() => { apply({ ...inputs }) }}>기술 적용하기</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default DefaultInfo
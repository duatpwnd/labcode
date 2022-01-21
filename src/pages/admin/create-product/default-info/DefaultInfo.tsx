import "./DefaultInfo.scoped.scss"
import DragDrop from "components/common/drag-drop/DragDrop";
import { useEffect, useState } from "react"
const ControlButton = ({ arr }) => {
    const [btnObj, setBtn] = useState({
        index: 1,
        arr: arr
    })
    useEffect(() => {
    }, [])
    return (
        <div className="control">
            {
                btnObj.arr.map((el, index) => <button onClick={() => setBtn({ ...btnObj, index: index })} key={index} className={index == btnObj.index ? "selected" : ""}>{el}</button>)
            }
        </div>
    )
}
const DefaultInfo = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        bannerImage: {} as { [key: string]: any },
        homepage: ""
    });
    const onChange = (e: { [key: string]: any }) => {
        if (e.target == undefined) {
            setInputs({
                ...inputs,
                bannerImage: e,
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.id]: e.target.value,
            })
        }
    };
    return (
        <section>
            <h3 className="h3-title">기본 정보</h3>
            <div className="form">
                <div className="row">
                    <label htmlFor="title" className="hompage-link">제목</label>
                    <input type="text" id="title" placeholder="제목을 입력해주세요.  " />
                </div>
                <div className="row">
                    <label htmlFor="description">설명</label>
                    <textarea id="description" placeholder="버스 기사가 승객을 태우고 주행을 하면서 휴대폰 게임을 해 버스 승객이 불안에 떠는 일이 벌어졌다.23일 연합뉴스 보도에 따르면 지난 20일 서울 시내의 한 버스에서 기사가 휴대폰 게임을 켜놓은 채 주행을 했고 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다.">
                    </textarea>
                </div>
                <div className="row">
                    <label htmlFor="homepage" className="hompage-link">링크</label>
                    <input type="text" id="homepage" placeholder="링크를 입력해주세요." />
                </div>
                <div className="row">
                    <label>배너</label>
                    <DragDrop eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "459px" }} />
                </div>
                <div className="row">
                    <label htmlFor="homepage" className="hompage-link">코드 크기</label>
                    <ControlButton arr={["작게", "중간", "크게"]} />
                </div>
                <div className="row">
                    <label htmlFor="homepage" className="hompage-link">적용 세기</label>
                    <ControlButton arr={["약하게", "중간", "세게"]} />
                </div>
                <div className="row btn-area">
                    <label className="except"></label>
                    <div className="btn-wrap">
                        <button className="cancel-btn">취소</button>
                        <button type="button" className="submit-btn" >기술 적용하기</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default DefaultInfo
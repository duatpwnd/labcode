import { useEffect } from "react"
import { useParams } from "react-router";
import { useLocation } from "react-router"
import styled from "styled-components";
import axios from "axios";
import DragDrop from "components/common/drag-drop/DragDrop";
import "./ProjectDetail.scoped.scss"
const SelectBox = styled.select`
    width:${(props) => props.width};
    border: 1px solid #E6E8EB;
    box-sizing: border-box; 
    padding:12px 10px;
    margin-right:20px;
    border-radius: 8px;
    color: #79828A;
    background: url(${require('images/arrow_bottom1.svg').default}) no-repeat right 10px center /
    12px 7px;
`
const BackButton = styled.button`
    width:13px;
    height:24px;
    background: url(${require('images/back_btn.svg').default})  no-repeat center /
    13px 24px
`
const ProjectDetail = () => {
    const location = useLocation();
    const params = useParams();
    useEffect(() => {
        console.log("프로젝트 상세페이지 노출", location, params);
        axios.post("", { id: params.id }).then((result: { [key: string]: any }) => {
            console.log("프로젝트 상세페이지 결과:", result);
        })
    }, [])
    return (
        <main>
            <BackButton />
            <div className="form">
                <SelectBox width="160px">
                    <option>V1</option>
                </SelectBox>
                <SelectBox width="240px">
                    <option>대한민국</option>
                </SelectBox>
                <SelectBox width="240px">
                    <option>서비스업</option>
                </SelectBox>
                <h2 className="h2-title">프로젝트명</h2>
                <div className="row">
                    <label>배너</label>
                    <DragDrop />
                </div>
                <div className="row">
                    <label>설명</label>
                    <textarea defaultValue={" 버스 기사가 승객을 태우고 주행을 하면서 휴대폰 게임을 해 버스 승객이 불안에 떠는 일이 벌어졌다.23일 연합뉴스 보도에 따르면 지난 20일 서울 시내의 한 버스에서 기사가 휴대폰 게임을 켜놓은 채 주행을 했고 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다."}>
                    </textarea>
                </div>
                <div className="row">
                    <label>홈페이지 주소</label>
                    <input type="text" />
                </div>
                <div className="row">
                    <label>Access Token</label>
                </div>
                <div className="row">
                    <label>Refresh Token</label>
                </div>
            </div>
        </main>
    )
}
export default ProjectDetail
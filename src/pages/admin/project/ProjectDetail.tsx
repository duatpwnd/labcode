import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import apiUrl from "src/utils/api";
import DragDrop from "components/common/drag-drop/DragDrop";
import "./ProjectDetail.scoped.scss"
import history from "src/utils/history";
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

const ProjectDetail = (props) => {
    const params = useParams();
    const [inputs, setInputs] = useState({
        teamId: params.id,
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
    const createProject = () => {
        console.log("inputs", inputs);
        const formData = new FormData();
        for (let key in inputs) {
            formData.append(key, inputs[key as never]);
        }
        axios
            .post(apiUrl.project, formData)
            .then((result: any) => {
                console.log("프로젝트생성결과:", result);
                history.push("/")
            }).catch((err: any) => {
                console.log('프로젝트생성에러:', err);
            });
    }
    useEffect(() => {
        console.log("프로젝트 생성페이지");
    }, [])
    return (
        <main>
            <BackButton />
            <div className="form">
                {/* <SelectBox width="160px">
                    <option>V1</option>
                </SelectBox>
                <SelectBox width="240px">
                    <option>대한민국</option>
                </SelectBox>
                <SelectBox width="240px">
                    <option>서비스업</option>
                </SelectBox> */}
                <h2 className="h2-title">프로젝트명</h2>
                <div className="row">
                    <label>배너</label>
                    <DragDrop eventHandler={onChange} />
                </div>
                <div className="row">
                    <label htmlFor="description">설명</label>
                    <textarea id="description" onChange={onChange} placeholder="버스 기사가 승객을 태우고 주행을 하면서 휴대폰 게임을 해 버스 승객이 불안에 떠는 일이 벌어졌다.23일 연합뉴스 보도에 따르면 지난 20일 서울 시내의 한 버스에서 기사가 휴대폰 게임을 켜놓은 채 주행을 했고 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다.">
                    </textarea>
                </div>
                <div className="row">
                    <label htmlFor="homepage" className="hompage-link">홈페이지 주소</label>
                    <input type="text" id="homepage" placeholder="홈페이지 주소를 입력해주세요." onChange={onChange} />
                </div>
                {/* <div className="row">
                    <label>Access Token</label>
                </div>
                <div className="row">
                    <label>Refresh Token</label>
                </div> */}
                <button type="button" onClick={createProject}>생성버튼</button>
            </div>
        </main>
    )
}
export default ProjectDetail
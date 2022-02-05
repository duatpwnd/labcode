import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import apiUrl from "src/utils/api";
import DragDrop from "components/common/drag-drop/DragDrop";
import "./ModifyProject.scoped.scss"
import history from "src/utils/history";
import _ from 'lodash'
import Classification from "pages/admin/project/project-classification/Classification";
const BackButton = styled.button`
    width:13px;
    height:24px;
    background: url(${require('images/back_btn.svg').default})  no-repeat center /
    13px 24px
`
const ProjectDetail = (props) => {
    const params = useParams();
    const debounce = _.debounce;
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        bannerImage: "",
        homepage: ""
    });
    const inputDebounce = debounce((e) => {
        onChange(e);
    }, 500);
    const onChange = (e: { [key: string]: any }) => {
        const data = { ...inputs, [e.target == undefined ? "bannerImage" : e.target.id]: e.target == undefined ? e : e.target.value }
        setInputs({
            ...data
        })
        modify({ ...data });
    };
    const getProject = () => {
        axios
            .get(apiUrl.project + `/${params.id}`)
            .then((result: { [key: string]: any }) => {
                console.log(result);
                const { title, bannerImage, description, homepage } = result.data.data
                setInputs({
                    title: title,
                    description: description,
                    homepage: homepage,
                    bannerImage: bannerImage,
                })
            }).catch((err: any) => {
                console.log('프로젝트조회에러:', err);
            });
    }
    const modify = (body) => {
        console.log("inputs", body);
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .patch(apiUrl.project + `/${params.id}`, formData)
            .then((result: any) => {
                console.log("프로젝트수정결과:", result);
            }).catch((err: any) => {
                console.log('프로젝트수정에러:', err);
            });
    }
    useEffect(() => {
        getProject();
    }, [])
    return (
        <main>
            {/* <BackButton /> */}
            <div className="wrap">
                <h2 className="h2-title">프로젝트 관리</h2>
                <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>
                {/* 내부용 프로젝트 분류 */}
                <Classification />
                {/* 외부용 프로젝트 분류 */}
                <section className="section1">
                    <h2 className="h3-title">프로젝트 정보</h2>
                    <div className="row">
                        <label htmlFor="title" className="title">프로젝트 명</label>
                        <input type="text" id="title" defaultValue={inputs.title} onKeyUp={(e) => inputDebounce(e)} />
                    </div>
                    <div className="row">
                        <label className="top">배너</label>
                        <DragDrop link={inputs.bannerImage} eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "220px" }} />
                    </div>
                    <div className="row">
                        <label className="top" htmlFor="description">설명</label>
                        <textarea id="description" defaultValue={inputs.description} onKeyUp={(e) => inputDebounce(e)} placeholder="버스 기사가 승객을 태우고 주행을 하면서 휴대폰 게임을 해 버스 승객이 불안에 떠는 일이 벌어졌다.23일 연합뉴스 보도에 따르면 지난 20일 서울 시내의 한 버스에서 기사가 휴대폰 게임을 켜놓은 채 주행을 했고 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다. 이 장면을 승객들이 직접 목격했다.">
                        </textarea>
                    </div>
                    <div className="row">
                        <label htmlFor="homepage" className="homepage-link">홈페이지 주소</label>
                        <input type="text" defaultValue={inputs.homepage} id="homepage" onKeyUp={(e) => inputDebounce(e)} />
                    </div>
                    {/* <div className="row">
                    <label>Access Token</label>
                </div>
                <div className="row">
                    <label>Refresh Token</label>
                </div> */}
                </section>
            </div>
        </main>
    )
}
export default ProjectDetail
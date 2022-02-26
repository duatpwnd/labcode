import { useEffect, useState, createContext } from "react"
import {
    useParams, useLocation
} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import axios from "axios";
import apiUrl from "src/utils/api";
import DragDrop from "components/common/drag-drop/DragDrop";
import "./ModifyProject.scoped.scss"
import _ from 'lodash'
import Classification from "src/pages/admin/project/projects-classification/Classification";
export const ProjectContext = createContext<{ [key: string]: any }>({})
const ProjectDetail = (props) => {
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    const { pathname } = useLocation();
    const params = useParams();
    const debounce = _.debounce;
    const [inputs, setInputs] = useState<{ [key: string]: any }>({
        versionId: 1
    });
    const inputDebounce = debounce((e) => {
        onChange(e);
    }, 500);
    const onChange = (e: { [key: string]: any }) => {
        if (pathname == "/projects/create") {
            setInputs((prev) => ({ ...prev, [e.target == undefined ? "bannerImage" : e.target.id]: e.target == undefined ? e : e.target.value }))
        } else {
            modify({ [e.target == undefined ? "bannerImage" : e.target.id]: e.target == undefined ? e : e.target.value });
        }
    };
    const createProject = () => {
        const formData = new FormData();
        const body = {
            ...inputs,
            isActive: true
        }
        console.log("body", body);
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .post(apiUrl.project, formData)
            .then((result: any) => {
                console.log("프로젝트생성결과:", result);
            }).catch((err: any) => {
                console.log('프로젝트생성에러:', err);
            });
    }
    const getProject = () => {
        axios
            .get(apiUrl.project + `/${params.projectId}`)
            .then((result: { [key: string]: any }) => {
                console.log(result);
                setInputs(result.data.data)
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
            .patch(apiUrl.project + `/${params.projectId}`, formData)
            .then((result: any) => {
                console.log("프로젝트수정결과:", result);
                getProject();
            }).catch((err: any) => {
                console.log('프로젝트수정에러:', err);
            });
    }
    useEffect(() => {
        if (pathname != "/projects/create") {
            getProject();
        }
    }, [])
    return (
        <main>
            <div className="wrap">
                <h2 className="h2-title">{pathname == "/projects/create" ? "프로젝트 등록" : "프로젝트 수정"}</h2>
                {
                    pathname != "/projects/create" && <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>
                }
                {/* 내부용 프로젝트 분류 */}
                {
                    isAdmin && <Classification inputs={inputs} eventHandler={onChange} />

                }
                {/* 외부용 프로젝트 분류 */}
                <section className="section1">
                    <h2 className="h3-title">프로젝트 정보</h2>
                    <div className="row">
                        <label htmlFor="title" className="title">프로젝트 명</label>
                        <input type="text" placeholder="프로젝트 명 입력" id="title" defaultValue={inputs.title} onKeyUp={(e) => inputDebounce(e)} />
                    </div>
                    <div className="row">
                        <label className="top">배너</label>
                        <DragDrop link={inputs.bannerImage} eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "495px" }} />
                    </div>
                    <div className="row">
                        <label className="top" htmlFor="description">설명</label>
                        <textarea id="description" defaultValue={inputs.description} onKeyUp={(e) => inputDebounce(e)} placeholder="최소 10자 ~ 최대 1000자 입력">
                        </textarea>
                    </div>
                    <div className="row">
                        <label htmlFor="homepage" className="homepage-link">홈페이지 주소</label>
                        <input type="text" placeholder="홈페이지 주소 입력" defaultValue={inputs.homepage} id="homepage" onKeyUp={(e) => inputDebounce(e)} />
                    </div>
                    {
                        pathname == "/projects/create" && <div className="approve-btn-area">
                            <button className="approve-btn" onClick={createProject}>승인</button>
                        </div>
                    }
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
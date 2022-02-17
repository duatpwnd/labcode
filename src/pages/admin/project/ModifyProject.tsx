import { useEffect, useState, createContext } from "react"
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import axios from "axios";
import apiUrl from "src/utils/api";
import DragDrop from "components/common/drag-drop/DragDrop";
import "./ModifyProject.scoped.scss"
import _ from 'lodash'
import Classification from "pages/admin/project/project-classification/Classification";
export const ProjectContext = createContext<{ [key: string]: any }>({})
const ProjectDetail = (props) => {
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    const params = useParams();
    const debounce = _.debounce;
    const [inputs, setInputs] = useState<{ [key: string]: any }>({
    });
    const inputDebounce = debounce((e) => {
        onChange(e);
    }, 500);
    const onChange = (e: { [key: string]: any }) => {
        console.log("EEe", e);
        const data = { ...inputs, [e.target == undefined ? "bannerImage" : e.target.id]: e.target == undefined ? e : e.target.value }
        setInputs({
            ...data
        })
        modify({ ...data });
    };
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
            }).catch((err: any) => {
                console.log('프로젝트수정에러:', err);
            });
    }
    useEffect(() => {
        getProject();
    }, [])
    return (
        <main>
            <div className="wrap">
                <h2 className="h2-title">프로젝트 수정</h2>
                <p className="message">정보를 변경하면 자동으로 저장됩니다.</p>
                {/* 내부용 프로젝트 분류 */}
                {
                    isAdmin && <Classification inputs={inputs} eventHandler={onChange} />

                }
                {/* 외부용 프로젝트 분류 */}
                <section className="section1">
                    <h2 className="h3-title">프로젝트 정보</h2>
                    <div className="row">
                        <label htmlFor="title" className="title">프로젝트 명</label>
                        <input type="text" id="title" defaultValue={inputs.title} onKeyUp={(e) => inputDebounce(e)} />
                    </div>
                    <div className="row">
                        <label className="top">배너</label>
                        <DragDrop link={inputs.bannerImage} eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "495px" }} />
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

                    <div className="approve-btn-area">
                        {
                            inputs.isActive == false && inputs.mainCategoryId != undefined && inputs.subCategoryId != undefined && <button className="approve-btn" onClick={() => onChange({ target: { id: "isActive", value: true } })}>승인</button>
                        }
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
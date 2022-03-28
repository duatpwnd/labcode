import { useEffect, useState, createContext } from "react"
import {
    useNavigate, useParams, useLocation
} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import axios from "axios";
import apiUrl from "src/utils/api";
import DragDrop from "components/common/drag-drop/DragDrop";
import "./ModifyProject.scoped.scss"
import _ from 'lodash'
import SelectBox from "src/components/common/base-select/SelectBox";
import Classification from "src/pages/admin/project/projects-classification/Classification";
import toast from 'react-hot-toast';
import { homePageReg } from 'src/utils/common';
export const ProjectContext = createContext<{ [key: string]: any }>({})
const ProjectDetail = () => {
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    const navigate = useNavigate();
    const [link, setLinkMsg] = useState(""); // 홈페이지 주소 유효성 메세지
    const [businessImage, setBusinessImage] = useState(""); // 사업자 등록증 유효성 메세지
    const { pathname } = useLocation();
    const params = useParams();
    const debounce = _.debounce;
    const [inputs, setInputs] = useState<{ [key: string]: any }>({
        versionId: 1,
        countryId: 1
    });
    const inputDebounce = debounce((e) => {
        onChange(e);
    }, 500);
    const onChange = (e: { [key: string]: any }) => {
        if (pathname == "/projects/create") {
            if (e.target == undefined) {
                setInputs((prev) => ({ ...prev, bannerImage: e }))
            } else {
                setInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }))
                if (e.target.id == "team") {
                    setInputs((prev) => ({ ...prev, teamId: e.target.value.id, mainCategory: null, subCategory: null, mainCategoryId: null, subCategoryId: null }))
                }
                if (e.target.id == "versionId") {
                    setInputs((prev) => ({ ...prev, ...{ countryId: null, industryId: null, mainCategoryId: null, subCategoryId: null } }));
                } else if (e.target.id == "industryId") {
                    setInputs((prev) => ({ ...prev, ...{ mainCategory: null, subCategory: null, mainCategoryId: null, subCategoryId: null } }));
                } else if (e.target.id == "mainCategoryId") {
                    setInputs((prev) => ({ ...prev, ...{ mainCategory: e.target.value, mainCategoryId: e.target.value.id, subCategoryId: null, subCategory: null } }));
                }
                else if (e.target.id == "subCategoryId") {
                    setInputs((prev) => ({ ...prev, ...{ subCategory: e.target.value, subCategoryId: e.target.value.id } }));
                }
            }
        } else {
            let data;
            if (e.target == undefined) {
                data = {
                    bannerImage: e
                }
            }
            else if (e.target.id == "team") {
                data = {
                    teamId: e.target.value.id
                }
            }
            else if (e.target.id == "mainCategoryId" || e.target.id == "subCategoryId") {
                data = {
                    [e.target.id]: e.target.value.id
                }
            } else {
                data = {
                    [e.target.id]: e.target.value
                }
            }
            modify(data);
        }
    };
    const createProject = () => {
        const formData = new FormData();
        const body = {
            ...inputs,
            isActive: isAdmin
        }
        console.log(body, "관리자계졍인지?:", isAdmin);
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        const homepageCheck = homePageReg.test(inputs.homepage);

        // 외부용 내부용일때 공통
        if (inputs.bannerImage == null) {
            setBusinessImage("이미지를 첨부해주세요.")
        } else {
            setBusinessImage("")
        }
        if (inputs.bannerImage != null) {
            const callMyFunction = axios
                .post(apiUrl.project, formData)
                .then((result: any) => {
                    console.log("프로젝트생성결과:", result);
                }).catch((err: any) => {
                    console.log('프로젝트생성에러:', err);
                });
            toast.promise(callMyFunction, {
                loading: "Loading...",
                success: "프로젝트가 등록되었습니다.",
                error: "프로젝트등록에 실패하였습니다.",
            });
        }
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
        console.log("body", body);
        toast.dismiss();
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        if (body.homepage != undefined) {
            const homepageCheck = homePageReg.test(body.homepage);
            // 외부용 내부용일때 공통
            if (homepageCheck == false) {
                setLinkMsg("올바른 주소가 아닙니다.");
                return false;
            } else {
                setLinkMsg("")
            }
        }
        const callMyFunction = axios
            .patch(apiUrl.project + `/${params.projectId}`, formData)
            .then((result: any) => {
                console.log("프로젝트수정결과:", result);
                getProject();
            }).catch((err: any) => {
                console.log('프로젝트수정에러:', err);
            });
        toast.promise(callMyFunction, {
            loading: "Loading...",
            success: "프로젝트가 수정되었습니다.",
            error: "프로젝트 수정에 실패하였습니다.",
        });
    }
    useEffect(() => {
        if (pathname == "/projects/create") {
            setInputs({
                versionId: 1,
                countryId: 1,
                title: "",
                teamId: null,
                team: {
                    id: null,
                    title: null,
                },
                bannerImage: null,
                description: "",
                homepage: ""
            });
        } else {
            getProject();
        }
    }, [pathname])

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
                        <label className="top">썸네일 이미지</label>
                        <DragDrop link={inputs.bannerImage} eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "495px" }} />
                        <p className="warn-message">{businessImage}</p>
                    </div>
                    <div className="row">
                        <label className="top" htmlFor="description">설명</label>
                        <textarea id="description" defaultValue={inputs.description} onKeyUp={(e) => inputDebounce(e)} placeholder="최소 10자 ~ 최대 1000자 입력">
                        </textarea>
                    </div>
                    <div className="row">
                        <label htmlFor="homepage" className="homepage-link">홈페이지 주소</label>
                        <input type="text" placeholder="홈페이지 주소 입력" defaultValue={inputs.homepage} id="homepage" onKeyUp={(e) => inputDebounce(e)} />
                        <p className="warn-message">{link}</p>
                    </div>
                    {
                        <div className="approve-btn-area">
                            {
                                isAdmin && inputs.isActive == false && <button className="approve-btn" onClick={pathname == "/projects/create" ? createProject : () => { onChange({ target: { id: "isActive", value: true } }) }}>승인</button>
                            }
                            {
                                isAdmin && inputs.isActive == undefined && <button className="approve-btn" onClick={createProject}>등록</button>
                            }
                            {
                                isAdmin == false && pathname == "/projects/create" && <button className="approve-btn" onClick={createProject}>등록</button>
                            }
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
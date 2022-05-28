import "./DefaultInfo.scoped.scss"
import VariableRangeSetting from "./variable-range-setting/VariableRangeSetting";
import DragDrop from "components/common/drag-drop/DragDrop";
import axios from "axios";
import apiUrl from "src/utils/api";
import MultipleSet from "./internal/MultipleSet";
import SingleSet from "./internal/SingleSet";
import Classification from "../../project/projects-classification/Classification";
import SelectBox from "src/components/common/base-select/SelectBox";
import toast from 'react-hot-toast';
import _ from 'lodash'
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { homePageReg } from 'src/utils/common';
const DefaultInfo = () => {
    const { pathname } = useLocation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    const params = useParams();
    const navigate = useNavigate();
    const [link, setLinkMsg] = useState(""); // 홈페이지 주소 유효성 메세지
    const [businessImage, setBusinessImage] = useState(""); // 사업자 등록증 유효성 메세지
    const [isSelectTeam, setSelectTeam] = useState(""); // 팀 선택 여부
    const [isSelectProject, setSelectProject] = useState(""); // 프로젝트 선택 여부
    const [scales, setScales] = useState<{ [key: string]: any }[]>([]);
    const [alphas, setAlphas] = useState<{ [key: string]: any }[]>([]);
    const [embeddingTypes, setEmbeddingTypes] = useState<{ [key: string]: any }[]>([]);
    const [channelTypes, setChannelTypes] = useState<{ [key: string]: any }[]>([]);
    const [applyName, setApplyName] = useState("single1");
    // 가변 산업군 id
    const varIndustryId = [14, 16, 20, 23, 29];
    const [inputs, setInputs] = useState<{ [key: string]: any }>({
        project: {
            title: "",
            team: {
                title: ""
            }
        },
        projectId: null,
        teamId: null,
        embedding: null,
        channel: null,
        title: "",
        description: "",
        labcodeImage: null,
        sourceImage: null,
        url: "",
        scale: 4,
        alpha: 8,
        dpi: 300,
        applyValue: "single"
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
    const modify = () => {
        console.log("modify", inputs);
        toast.dismiss();
        const formData = new FormData();
        for (let key in inputs) {
            formData.append(key, inputs[key as never]);
        }
        const homepageCheck = homePageReg.test(inputs.url);
        if (homepageCheck == false) {
            setLinkMsg("올바른 주소가 아닙니다.")
            return false;
        } else {
            setLinkMsg("")
        }
        const callMyFunction = axios
            .patch(apiUrl.products + `/${params.productId}`, formData)
            .then((result: any) => {
                console.log("수정결과:", result);
                getProductDetail()
            })
        toast.promise(callMyFunction, {
            loading: "Loading...",
            success: "제품이 수정되었습니다.",
            error: "제품수정에 실패하였습니다.",
        });
    }
    const apply = () => {
        console.log("inputs", inputs);
        toast.dismiss();
        const formData = new FormData();
        for (let key in inputs) {
            formData.append(key, inputs[key as never]);
        }
        const homepageCheck = homePageReg.test(inputs.url);
        if (inputs.project.id == null) {
            setSelectProject("프로젝트를 선택해주세요.");
        } else {
            setSelectProject("");
        }
        if (homepageCheck == false) {
            setLinkMsg("올바른 주소가 아닙니다.")
        } else {
            setLinkMsg("")
        }
        if (inputs.sourceImage == null) {
            setBusinessImage("원본 이미지를 첨부해주세요.")
        } else {
            setBusinessImage("")
        }
        // 가변 산업군일때마 유효성 체크
        if ((pathname.startsWith("/products/create") && inputs.applyValue == "multiple") && (inputs.project.industryId == 14 || inputs.project.industryId == 16 || inputs.project.industryId == 20 || inputs.project.industryId == 23 || inputs.project.industryId == 29)) {
            if (inputs.unit == undefined || inputs.unit == 0) {
                setInputs({
                    ...inputs,
                    unit: null,
                })
                return false;
            }
            if (inputs.amount == undefined) {
                setInputs({
                    ...inputs,
                    amount: null,
                })
                return false;
            }
            if (inputs.unit > inputs.amount) {
                setInputs({
                    ...inputs,
                    amount: null,
                })
                return false;
            }
        }
        if (homepageCheck && inputs.project.id != null && homepageCheck && inputs.sourceImage != null) {
            if (inputs.applyValue == "multiple") {
                if (inputs.alphaMin == undefined || inputs.alphaMax == undefined || inputs.scaleMin == undefined || inputs.scaleMax == undefined || inputs.scaleSkip == undefined || inputs.alphaSkip == undefined) {
                    return false;
                }
            }
            const callMyFunction = axios
                .post(inputs.applyValue == "single" ? apiUrl.products : apiUrl.productsBulk, formData)
                .then((result: any) => {
                    console.log("적용결과", result);
                    if (inputs.applyValue == "single") {
                        navigate(`/products/edit/${result.data.data.id}/${result.data.data.project.teamId}/${result.data.data.project.industryId}/defaultInfo`)
                    } else {
                        navigate(`/products/list?projectId=${projectId}&currentPage=1&search=`)
                    }
                })
            toast.promise(callMyFunction, {
                loading: "Loading...",
                success: "제품이 등록되었습니다.",
                error: "제품등록에 실패하였습니다.",
            });
        }
    }
    const getProductDetail = () => {
        axios
            .get(apiUrl.products + `/${params.productId}`)
            .then((result: any) => {
                console.log('제품 상세 조회:', result);
                setInputs((prev) => ({ ...prev, ...result.data.data }))
            }).catch((err) => {
                console.log("제품 상세 조회 에러:", err);
            })
    }
    // 프로젝트 리스트 조회
    const getProjectList = (page, search) => {
        return axios
            .get(apiUrl.project + `?search=${search}&page=${page}&limit=20&isActive=true&teamId=${inputs.project.team.id}`)
            .then((result: any) => {
                console.log('프로젝트 리스트조회결과:', result);
                return result.data
            })
    }
    const getProject = () => {
        axios
            .get(apiUrl.project + `/${projectId}`)
            .then((result: { [key: string]: any }) => {
                console.log(result);
                setInputs((prev) => ({ ...prev, project: result.data.data, projectId: result.data.data.id }))
            }).catch((err: any) => {
                console.log('프로젝트조회에러:', err);
            });
    }
    // 팀 리스트 조회
    const getTeamList = (page, search) => {
        return axios
            .get(apiUrl.team + `?page=${page}&search=${search}&limit=20`)
            .then((result: any) => {
                console.log('팀리스트조회결과:', result);
                return result.data
            });
    }
    useEffect(() => {
        axios.all([axios.get(apiUrl.scales), axios.get(apiUrl.alphas), axios.get(apiUrl.channelTypes), axios.get(apiUrl.embeddingTypes)]).then(axios.spread((res1, res2, res3, res4) => {
            console.log("코드크기,적용세기,채널조회", res3.data.data, res4.data.data);
            setScales(res1.data.data);
            setAlphas(res2.data.data);
            setChannelTypes(res3.data.data);
            setEmbeddingTypes(res4.data.data);
            const defaultChannelTypes = res3.data.data.filter((el, index) => el.default == true);
            const defaultEmbeddingTypes = res4.data.data.filter((el, index) => el.default == true);
            setInputs((prev) => ({
                ...prev, ...{
                    channel: defaultChannelTypes[0].value,
                    embedding: defaultEmbeddingTypes[0].value
                }
            }))

        }))
            .catch((err) => {
                console.log("조회에러", err);
            })
    }, [pathname])
    useEffect(() => {
        // 수정페이지일때
        if (pathname.startsWith("/products/edit")) {
            getProductDetail();
        } else {
            if (projectId != undefined) {
                getProject();
            } else {
                setInputs({
                    projectId: null,
                    project: {
                        title: "",
                        versionId: 1,
                        team: {
                            title: ""
                        }
                    },
                    teamId: null,
                    title: "",
                    description: "",
                    labcodeImage: null,
                    sourceImage: null,
                    url: "",
                    scale: 4,
                    dpi: 300,
                    alpha: 8
                });
            }
        }
    }, [pathname]);
    const classificationId = useMemo(() => {
        console.log(inputs.project);
        return {
            versionId: inputs.project?.versionId,
            countryId: inputs.project?.countryId,
            industryId: inputs.project?.industryId,
            teamId: inputs.project?.team && inputs.project?.team.id,
            mainCategoryId: inputs.project?.mainCategoryId,
            mainCategory: inputs.project?.mainCategory,
            subCategoryId: inputs.project?.subCategoryId,
            subCategory: inputs.project?.subCategory
        }
    }, [inputs.project])
    const selectBoxStyle = {
        padding: '16px 0',
    }

    return (
        <>
            <Classification isActive={false} inputs={{ ...classificationId }} />
            <section>
                <h3 className="h3-title">기본 정보</h3>
                <div className="form">
                    <div className="row">
                        <label htmlFor="teamId" className="team">팀</label>
                        <div className="select-box-wrap" style={pathname.includes('/defaultInfo') ? { pointerEvents: "none", background: "#E6E8EB", color: "#9EA7AD", borderRadius: "4px" } : { pointerEvents: "auto" }}>
                            <SelectBox
                                property="title"
                                value="id"
                                style={selectBoxStyle}
                                defaultValue={inputs.project && inputs.project.team && inputs.project.team.title}
                                eventHandler={(value) => setInputs((prev) => {
                                    return { ...prev, project: { ...prev.project, team: { ...value } } }
                                })} getList={getTeamList} />
                        </div>
                        <p className="warn-message">{isSelectTeam}</p>
                    </div>
                    {
                        inputs.project && inputs.project.team &&
                        inputs.project.team.id != undefined && <div className="row">
                            <label htmlFor="projectId" className="project">프로젝트</label>
                            <div className="select-box-wrap" style={pathname.includes('/defaultInfo') ? { pointerEvents: "none", background: "#E6E8EB", color: "#9EA7AD", borderRadius: "4px" } : { pointerEvents: "auto" }}>
                                <SelectBox
                                    property="title"
                                    value="id"
                                    inputs={inputs}
                                    style={selectBoxStyle}
                                    defaultValue={inputs.project.title}
                                    eventHandler={(value) => setInputs((prev) => {
                                        return ({ ...prev, projectId: value.id, project: { ...value, team: { ...prev.project.team } } })
                                    })} getList={getProjectList} />
                            </div>
                            <p className="warn-message">{isSelectProject}</p>
                        </div>

                    }
                    <div className="row">
                        <label htmlFor="title" className="title" >제목</label>
                        <input type="text" id="title" defaultValue={inputs.title} placeholder="제목을 입력해주세요." onChange={(e) => onChange(e)} />
                    </div>
                    <div className="row">
                        <label htmlFor="description">설명</label>
                        <textarea placeholder="최소 10자 ~ 최대 1000자 입력" id="description" defaultValue={inputs.description} onChange={(e) => onChange(e)}>
                        </textarea>
                    </div>
                    <div className="row">
                        <label htmlFor="url" className="link">링크</label>
                        <input type="text" id="url" defaultValue={inputs.url} placeholder="링크를 입력해주세요." onChange={(e) => onChange(e)} />
                        <p className="warn-message">{link}</p>
                    </div>
                    <div className="row">
                        <label className="source-image">원본 이미지</label>
                        <DragDrop link={inputs.sourceImage} eventHandler={onChange} style={{ width: "calc(100% - 180px)", height: "459px" }} />
                        <p className="warn-message">{businessImage}</p>
                    </div>
                    {isAdmin &&
                        <>
                            <div className="row">
                                <label htmlFor="embedding">임베딩 버전</label>
                                <div className="select-box-wrap">
                                    <SelectBox
                                        property="label"
                                        value="value"
                                        style={selectBoxStyle}
                                        list={embeddingTypes}
                                        defaultValue={inputs.embedding}
                                        eventHandler={(value) => setInputs((prev) => ({ ...prev, embedding: value }))} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="channel">적용 기술</label>
                                <div className="select-box-wrap">
                                    <SelectBox
                                        property="label"
                                        value="value"
                                        style={selectBoxStyle}
                                        list={channelTypes}
                                        defaultValue={inputs.channel}
                                        eventHandler={(value) => setInputs((prev) => ({ ...prev, channel: value }))} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="dpi">dpi</label>
                                <input type="text" id="dpi" value={inputs.dpi} onChange={(e) => onChange({ target: { id: "dpi", value: e.target.value.replace(/[^0-9.]/g, '') } })} />
                            </div>
                        </>
                    }
                    <div className="row apply-method-row">
                        <label>적용 방법</label>
                        <div className="apply-method-area">
                            <input type="radio" checked={applyName == "single1"} id="single1" value="single" name="apply-method" data-value="single1"
                                onChange={(e) => { setApplyName("single1"); setInputs((prev) => ({ ...prev, applyValue: "single" })) }} />
                            <label htmlFor="single1"><span className="ball"></span><span className="title">단일 설정</span></label>
                            {
                                (pathname.startsWith("/products/create") && inputs.project.versionId == 1) && <>
                                    <input type="radio" checked={applyName == "multiple"} id="multiple" value="multiple" name="apply-method" onChange={(e) => { setApplyName("multiple"); setInputs((prev) => ({ ...prev, applyValue: "multiple" })) }} />
                                    <label htmlFor="multiple"><span className="ball"></span><span className="title">복수 설정</span></label>
                                </>
                            }
                            {
                                pathname.startsWith("/products/create") && varIndustryId.includes(inputs.project.industryId) && <>
                                    <input type="radio" checked={applyName == "single2"} id="single2" value="single" name="apply-method" data-value="single2" onChange={(e) => { setApplyName("single2"); setInputs((prev) => ({ ...prev, applyValue: "single" })) }} />
                                    <label htmlFor="single2"><span className="ball"></span><span className="title">가변 설정</span></label>

                                </>
                            }
                        </div>
                    </div>
                    {/* 가변 범위 설정 */}
                    {
                        (pathname.startsWith("/products/create") && applyName == "single2") && varIndustryId.includes(inputs.project.industryId) && <VariableRangeSetting inputs={inputs} eventHandler={onChange} />
                    }
                    {
                        inputs.applyValue == "multiple" && inputs.project.industryId != 29 && <MultipleSet eventHandler={setInputs} />
                    }
                    <SingleSet isAdmin={isAdmin} inputs={inputs} scales={scales} alphas={alphas} eventHandler={setInputs} />
                    {
                        inputs.labcodeImage !== null && <div className="row">
                            <label>변경 이미지</label>
                            <a href={inputs.labcodeImage} target="_blank"><img src={inputs.labcodeImage} alt="labcodeImage" title="labcodeImage" className="labcodeImage" /></a>
                        </div>

                    }
                    <div className="btn-wrap">
                        <button className="cancel-btn" onClick={() => navigate(-1)}>취소</button>
                        <button className="submit-btn" onClick={() => inputs.labcodeImage == null ? apply() : modify()}>기술 적용</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default DefaultInfo

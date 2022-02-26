import "./DefaultInfo.scoped.scss"
import DragDrop from "components/common/drag-drop/DragDrop";
import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import InternalUse from "./internal/InternalUse";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import Classification from "../../project/project-classification/Classification";
import _ from 'lodash'
import SelectBox from "src/components/common/base-select/SelectBox";
const SlideBar = ({ inputs, id, scales, eventHandler, isAdmin }) => {
    const [message, setMessage] = useState("");
    const onChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (Number(e.target.value) > scales.range.max || Number(e.target.value) < scales.range.min) {
            setMessage(scales.range.min + " 이상 " + scales.range.max + " 이하의 숫자를 입력해주세요.")
        } else {
            setMessage("");
        }
        eventHandler({ ...inputs, [id]: e.target.value })
    }
    useEffect(() => {
        console.log("scales", inputs[id], scales);
    }, [])
    return (
        <div className="slide-bar-container">
            {
                isAdmin &&
                <input type="tel" className="numeric-input" value={inputs[id]} maxLength={3} onChange={(e) => onChange(e)} />
            }
            <div className="slide-bar">
                {
                    scales.options && scales.options.map((obj, index) => {
                        return (
                            (() => {
                                if (index === 0)
                                    return (
                                        <button key={index}
                                            onClick={() => { eventHandler({ ...inputs, [id]: obj.value }); }}
                                            className={inputs[id] >= scales.range.min && inputs[id] <= obj.value ? "selected" : ""}>
                                            {obj.label}{obj.value}
                                        </button>
                                    );
                                else if (index > 0 && index < scales.options.length - 1)
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => { eventHandler({ ...inputs, [id]: obj.value }); }}
                                            className={inputs[id] >= ((scales.options[index - 1].value + obj.value) / 2) && inputs[id] < ((scales.options[index + 1].value + obj.value) / 2) ? "selected" : ""}>
                                            {obj.label}{obj.value}
                                        </button>
                                    )
                                else {
                                    return (
                                        <button key={index} onClick={() => { eventHandler({ ...inputs, [id]: obj.value }); }}
                                            className={inputs[id] >= ((scales.options[index - 1].value + obj.value) / 2) && inputs[id] <= scales.range.max ? "selected" : ""}>
                                            {obj.label}{obj.value}
                                        </button>
                                    )
                                }
                            })()
                        )
                    })
                }
            </div>
            <p className="message">{message}</p>
        </div>
    )
}
const DefaultInfo = () => {
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    const params = useParams();
    const navigate = useNavigate();
    const [scales, setScales] = useState<{ [key: string]: any }[]>([]);
    const [alphas, setAlphas] = useState<{ [key: string]: any }[]>([]);
    const [embeddingTypes, setEmbeddingTypes] = useState<{ [key: string]: any }[]>([]);
    const [channelTypes, setChannelTypes] = useState<{ [key: string]: any }[]>([]);
    const [inputs, setInputs] = useState({
        projectId: null,
        teamId: null,
        embedding: "2.5",
        channel: "lab_rgb",
        title: "",
        description: "",
        labcodeImage: null,
        sourceImage: params.productId == undefined ? null : {} as { [key: string]: any },
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
    const modify = () => {
        console.log("modify", inputs);
        if (inputs.sourceImage == null) {
            alert("이미지를 첨부해주세요.")
        } else {
            const formData = new FormData();
            for (let key in inputs) {
                formData.append(key, inputs[key as never]);
            }
            axios
                .patch(apiUrl.products + `/${params.productId}`, formData)
                .then((result: any) => {
                    console.log("수정결과:", result);
                    getProductDetail();
                }).catch((err: any) => {
                    console.log('수정에러:', err);
                });
        }

    }
    const apply = () => {
        console.log("inputs", inputs);
        const formData = new FormData();
        for (let key in inputs) {
            formData.append(key, inputs[key as never]);
        }
        axios
            .post(apiUrl.products, formData)
            .then((result: any) => {
                console.log("적용결과", result);
                // navigate(`/products/edit/${products.id}/${result.data.data.id}/defaultInfo`)}

            }).catch((err: any) => {
                console.log('기본정보적용에러:', err);
            });
    }
    const getProductDetail = () => {
        axios
            .get(apiUrl.products + `/${params.productId}`)
            .then((result: any) => {
                console.log('제품 상세 조회:', result);

                setInputs({
                    ...result.data.data
                })
            }).catch((err) => {
                console.log("제품 상세 조회 에러:", err);
            })
    }
    // 프로젝트 리스트 조회
    const getProjectList = (page, search) => {
        return axios
            .get(apiUrl.project + `?search=${search}&page=${page}&limit=20&isActive=true`)
            .then((result: any) => {
                console.log('프로젝트 리스트조회결과:', result);
                return result.data
            })
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
        }))
            .catch((err) => {
                console.log("조회에러", err);
            })
        // 수정페이지일때
        if (params.productId != undefined) {
            getProductDetail();
        } else {
        }
    }, [params.productId])
    const selectBoxStyle = {
        padding: '16px 0',
    }
    return (
        <>
            <Classification isActive={false} inputs={{ versionId: 1, countryId: 1, industryId: 1, mainCategoryId: 1 }} />
            <section>
                <h3 className="h3-title">기본 정보</h3>
                <div className="form">
                    <div className="row">
                        <label htmlFor="teamId" className="team" >팀</label>
                        <div className="select-box-wrap">
                            <SelectBox style={selectBoxStyle} id="teamId" defaultValue={inputs.teamId} eventHandler={(id, value) => setInputs((prev) => ({ ...prev, [id]: value }))} getList={getTeamList} />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="projectId" className="project" >프로젝트</label>
                        <div className="select-box-wrap">
                            <SelectBox style={selectBoxStyle} id="projectId" defaultValue={inputs.projectId} eventHandler={(id, value) => setInputs((prev) => ({ ...prev, [id]: value }))} getList={getProjectList} />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="title" className="title" >제목</label>
                        <input type="text" id="title" defaultValue={inputs.title} placeholder="제목을 입력해주세요." onChange={(e) => onChange(e)} />
                    </div>
                    <div className="row">
                        <label htmlFor="description">설명</label>
                        <textarea id="description" defaultValue={inputs.description} onChange={(e) => onChange(e)}>
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
                    {isAdmin &&
                        <div className="row">
                            <label htmlFor="embedding">임베딩 버전</label>
                            <div className="select-box-wrap">
                                <SelectBox style={selectBoxStyle} id="embedding" list={embeddingTypes} defaultValue={inputs.embedding} eventHandler={(id, value) => setInputs((prev) => ({ ...prev, [id]: value }))} />
                            </div>
                        </div>
                    }
                    {isAdmin &&
                        <div className="row">
                            <label htmlFor="channel">적용 기술</label>
                            <div className="select-box-wrap">
                                <SelectBox style={selectBoxStyle} id="channel" list={channelTypes} defaultValue={inputs.channel} eventHandler={(id, value) => setInputs((prev) => ({ ...prev, [id]: value }))} />
                            </div>
                        </div>
                    }
                    <div className="row">
                        <label htmlFor="scale" className="scale">코드 크기</label>
                        <SlideBar id="scale" isAdmin={isAdmin} inputs={inputs} scales={scales} eventHandler={setInputs} />
                    </div>
                    <div className="row">
                        <label htmlFor="alpha" className="alpha">적용 세기</label>
                        <SlideBar id="alpha" isAdmin={isAdmin} inputs={inputs} scales={alphas} eventHandler={setInputs} />
                    </div>
                    {/* 수정페이지에만 존재 */}
                    <InternalUse />
                    {
                        inputs.labcodeImage !== null && <div className="row">
                            <label>변경 이미지</label>
                            <img src={inputs.labcodeImage} alt="labcodeImage" title="labcodeImage" className="labcodeImage" />
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
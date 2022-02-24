import "./DefaultInfo.scoped.scss"
import DragDrop from "components/common/drag-drop/DragDrop";
import axios from "axios";
import apiUrl from "src/utils/api";
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom";
import InternalUse from "./internal/InternalUse";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import Classification from "../../project/project-classification/Classification";
import _ from 'lodash'
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


const SelectBox = ({ id, eventHandler, getList, data, defaultValue }: any) => {
    const [list, setList] = useState<{ [key: string]: any }[]>([]);
    const [currentPage, setPage] = useState(1); // 페이징
    const [selectedIndex, setIndex] = useState(null);
    const [isActiveModal, setModal] = useState(false);
    const selectBox = useRef<HTMLDivElement>(null);
    const [isLastPage, setLastPage] = useState(false); // 마지막 페이지 유무
    const [title, setTitle] = useState(""); // 팀, 프로젝트 제목
    const debounce = _.debounce;
    // 무한스크롤
    const infiniteScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && isLastPage == false) {
            setPage(currentPage + 1);
            getList(currentPage + 1, "").then((result) => {
                if (result.data.length == 0) {
                    setLastPage(true);
                    return;
                }
                setList([...list, ...result.data]);
            });;
        }
    }
    // 모달 영역 이외 클릭시 모달창 닫기
    const handleCloseModal = (e) => {
        if (isActiveModal && (!selectBox.current?.contains(e.target))) setModal(false);
    }
    // 리스트 선택
    const select = (value) => {
        setModal(false) // 모달닫기
        // 현재 선택되어있는데 또다시 선택했을때 호출못하게
        if (selectedIndex != value) {
            setIndex(value); // 모달안에 선택된 리스트 활성화
            eventHandler((prev) => {
                return ({ ...prev, [id]: value })
            })
        }
    };
    // 검색하기
    const search = (search) => {
        getList(1, search).then((result) => {
            setList(result.data);
        });
    }
    useEffect(() => {
        window.addEventListener("click", handleCloseModal)
        return () => {
            window.removeEventListener("click", handleCloseModal);
        }
    }, [isActiveModal])
    useEffect(() => {
        if (getList != undefined) {
            getList(1, "").then((result) => {
                setList([...list, ...result.data]);
            });
        }
    }, [])
    return (
        <div className="select-box">
            <div className={isActiveModal ? "tab active-tab" : "tab"} onClick={() => setModal(!isActiveModal)} style={{ backgroundImage: isActiveModal ? `url(${require("images/active_arrow_top.svg").default})` : `url(${require("images/arrow_bottom.svg").default})` }}>
                {
                    // data 가 존재하면 임베딩 버전, 적용기술 셀렉트바
                    data != undefined ?
                        <span className="type">{defaultValue}</span> : <span className="type" >{defaultValue == null ? "선택해주세요." : title || defaultValue}</span>
                }
            </div>
            {isActiveModal &&
                <div className="slide-menu" ref={selectBox}>
                    {
                        // 검색 영역 
                        data == undefined && <div className="search-area">
                            <input type="text" autoFocus placeholder="검색" onChange={debounce((e) => search(e.target.value), 200)} />
                            <button />
                        </div>
                    }
                    <div className="list-wrap" onScroll={data == undefined ? infiniteScroll : () => { }}>
                        {
                            // 리스트 영역 
                            data != undefined ? data && data.map((elements, index) => {
                                return (
                                    // 임베딩,적용기술
                                    <div key={index} className={defaultValue == elements.value ? "list selected" : "list"} onClick={() => select(elements.value)}>
                                        <span className="type">{elements.label}</span>
                                    </div>
                                )
                            }) :
                                list && list.map((elements, index) => {
                                    return (
                                        <div key={index} className={elements.id == defaultValue ? "list selected" : "list"} onClick={(e) => { select(elements.id); setTitle((e.target as HTMLElement).innerText) }}>
                                            <span className="type">{elements.title}</span>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            }
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
    return (
        <>
            <Classification isActive={false} inputs={{ versionId: 1, countryId: 1, industryId: 1, mainCategoryId: 1 }} />
            <section>
                <h3 className="h3-title">기본 정보</h3>
                <div className="form">
                    <div className="row">
                        <label htmlFor="teamId" className="team" >팀</label>
                        <SelectBox id="teamId" defaultValue={inputs.teamId} eventHandler={setInputs} getList={getTeamList} />
                    </div>
                    <div className="row">
                        <label htmlFor="projectId" className="project" >프로젝트</label>
                        <SelectBox id="projectId" defaultValue={inputs.projectId} eventHandler={setInputs} getList={getProjectList} />
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
                        <div className="row ">
                            <label htmlFor="embedding">임베딩 버전</label>
                            <SelectBox data={embeddingTypes} id="embedding" defaultValue={inputs.embedding} eventHandler={setInputs} />
                        </div>
                    }
                    {isAdmin &&
                        <div className="row ">
                            <label htmlFor="channel">적용 기술</label>
                            <SelectBox id="channel" defaultValue={inputs.channel} data={channelTypes} eventHandler={setInputs} />
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
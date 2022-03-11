import { useParams, useSearchParams } from "react-router-dom";
import _ from 'lodash'
import "./CategoryManagement.scoped.scss"
import { useEffect, useState } from "react";
import { RootState } from "src/reducers";
import toast from 'react-hot-toast';
import axios from "axios";
import apiUrl from "src/utils/api";
import SelectBox from "src/components/common/base-select/SelectBox";
import Classification from "src/pages/admin/project/projects-classification/Classification";
import PaginatedItems from "src/components/common/pagination/Paginate";
// 소분류 생성
const createSubCategories = ({ mainCategoryId }) => {
    return axios.post(apiUrl.subCategories, { mainCategoryId: mainCategoryId, title: "" }).then((result) => {
        console.log("소분류 생성결과", result.data);
        return result.data.data
    })
}
const ToggleList = ({ mainCategories, getCategories }) => {
    const [toggle, setToggle] = useState(true);
    const [isActiveInput, setInput] = useState(-1);
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("currentPage");
    const debounce = _.debounce;
    // 소분류 추가
    const addSubCategories = ({ mainCategoryId }) => {
        toast.dismiss();
        createSubCategories({ mainCategoryId }).then((result) => {
            getCategories(currentPage);
            setInput(result.id);
        }).catch((err) => {
            toast.error("소분류를 더이상 추가 할 수 없습니다.")
        })
    }
    // 소분류 삭제
    const deleteSubCategories = (id) => {
        axios.delete(apiUrl.subCategories + `/${id}`).then((result) => {
            console.log("소분류삭제결과:", result);
            getCategories(currentPage);
        }).catch((err) => {
            console.log(err);
            alert("프로젝트가 존재하여 삭제가 불가능합니다.")
        })
    }
    // 소분류 수정
    const modifySubCategories = (id, value) => {
        axios.patch(apiUrl.subCategories + `/${id}`, { title: value }).then((result) => {
            console.log("소분류수정결과:", result);
            getCategories(currentPage);
        }).catch((err) => {
            console.log("소분류 수정 에러:", err);
        })

    }

    // 대분류 삭제
    const deleteMainCategories = (id) => {
        axios.delete(apiUrl.categories + `/${id}`).then((result) => {
            console.log("대분류삭제결과:", result);
            getCategories(currentPage);
        }).catch((err) => {
            console.log(err);
            alert("소분류가 존재하여 삭제가 불가능합니다.")
        })
    }
    return (
        <div className="categories" >
            {/* 대분류 */}
            <div className="main-category-list" >
                <span className="toggle-btn" style={{ backgroundImage: toggle ? `url(${require("images/active_arrow_top.svg").default})` : `url(${require("images/arrow_bottom.svg").default})` }} onClick={() => setToggle(!toggle)}></span>
                <span className="main-category-title">{mainCategories.title} <strong className="current-count">{mainCategories.subCategories.length}</strong>/8</span>
                <button className="btn add-btn" onClick={() => {
                    addSubCategories({ mainCategoryId: mainCategories.id });
                }}>추가</button>
                <button className="btn" onClick={() => deleteMainCategories(mainCategories.id)}>삭제</button>
            </div>
            {
                toggle &&
                <div className="sub-categories-wrap">
                    {

                        mainCategories.subCategories.map((subCategories, index) => {
                            return (
                                //  소분류
                                <div className="sub-category-list" key={subCategories.id}>
                                    {
                                        isActiveInput == subCategories.id ?
                                            <input autoFocus
                                                className="input edit-input"
                                                onChange={debounce((e) => modifySubCategories(subCategories.id, e.target.value
                                                ), 500)}
                                                onBlur={() => setInput(-1)}
                                            /> :
                                            <input className="input readonly-input" readOnly defaultValue={subCategories.title} onDoubleClick={() => { setInput(subCategories.id) }} />
                                    }
                                    <button className="delete-btn" onClick={() => deleteSubCategories(subCategories.id)}></button>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}
const CategoryManagement = () => {
    const [inputs, setInputs] = useState<{ [key: string]: any }>({
        versionId: 1
    });
    const [versions, setVersions] = useState<{ [key: string]: any }[]>([]);
    const [teams, setTeams] = useState<{ [key: string]: any }[]>([]);
    const [industries, setIndustries] = useState<{ [key: string]: any }[]>([]);
    const [{ meta, data }, setCategories] = useState<{ [key: string]: any }>({});
    const [addCategoryInput, setCategoryInput] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("")
    const [searchParams] = useSearchParams();
    const currentPage = searchParams.get("currentPage");
    const params = useParams();
    // 대분류 생성
    const createMainCategories = (body, isAddSubCategories) => {
        console.log("대분류생성", body, isAddSubCategories);
        setMessage("")
        axios.post(apiUrl.categories, body).then((result) => {
            console.log("대분류생성결과:", result);
            setTitle("");
            // isAddSubCategories == true 면 소분류 까지 같이 생성해주기
            if (isAddSubCategories) {
                createSubCategories({ mainCategoryId: result.data.data.id }).then((result) => {
                    setCategoryInput(false);
                    getCategories(currentPage);
                })
            } else {
                getCategories(currentPage);
            }
        })
    }
    const onChange = (e) => {
        setTitle(e.target.value);
    }
    const setProjectClassify = (e) => {
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
    const onKeyPress = (e) => {
        console.log(inputs, data.length);
        if (e.key == "Enter") {
            createMainCategories({ teamId: inputs.teamId, title: title, order: data.length + 1, industryId: inputs.industryId }, false)
        }
    }
    // 대분류 & 소분류 조회
    const getCategories = (page) => {
        axios.get(apiUrl.categories + `?industryId=${inputs.industryId}&teamId=${inputs.teamId}&limit=10&page=${page}`).then((result) => {
            console.log("대분류 & 소분류 조회:", result.data);
            if (result.data.data.length == 0) {
                setCategoryInput(true)
            }
            setCategories(result.data);
        })
    }
    // 버전 조회
    const getVersions = () => {
        axios.get(apiUrl.versions).then((result) => {
            console.log("버전리스트:", result.data.data);
            setVersions(result.data.data)
        })
    }
    // 산업 조회
    const getIndustries = () => {
        axios.get(apiUrl.industries + `?versionId=${inputs.versionId}`).then((result) => {
            console.log("산업리스트:", result.data.data);
            setIndustries(result.data.data)
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
    const selectBoxStyle = {
        padding: '16px 0'
    }
    useEffect(() => {
        if (inputs.versionId != null) {
            getIndustries()
        }
    }, [inputs.versionId]);
    useEffect(() => {
        axios.all([getVersions(), getTeamList(1, "")]);
    }, [])
    useEffect(() => {
        if (inputs.industryId != null && inputs.teamId != null) {
            getCategories(currentPage)
        }
    }, [currentPage, inputs.industryId, inputs.teamId])
    return (
        <main>
            <div className="wrap">
                <div className="category">
                    <span className="main-category">프로젝트</span><b className="sub-category">카테고리 관리</b>
                </div>
                <h2 className="h2-title">카테고리 관리</h2>
                <p className="guide-message">정보를 변경하면 자동으로 저장됩니다.</p>
                <section>
                    <Classification inputs={inputs} eventHandler={setProjectClassify} />
                </section>
                <section>
                    <div className="add-area">
                        <div className="title-area">
                            <h3 className="h3-title">카테고리 편집</h3>
                            <p className="guide-message">대분류는 최대 16개, 소분류는 8개까지 사용 가능합니다.</p>
                        </div>
                        {
                            inputs.teamId != null && inputs.industryId != null && <button className="add-btn" onClick={() => {
                                setCategoryInput(true);
                            }}>대분류 추가</button>

                        }
                    </div>
                    {
                        data &&
                        data.map((mainCategories, index) => {
                            return (
                                <ToggleList key={index} mainCategories={mainCategories} getCategories={getCategories} />
                            )
                        })
                    }
                    {/* 대분류 추가 인풋*/}
                    {
                        addCategoryInput && <div className="main-category-input-area">
                            <span className="arrow-ico"></span>
                            <input type="text" value={title} autoFocus className="main-category-input" onKeyPress={onKeyPress} onChange={(e) => onChange(e)} />
                            <button className="btn add-btn" onClick={() => createMainCategories({ teamId: inputs.teamId, title: title, order: data.length + 1, industryId: inputs.industryId }, true)}>추가</button>
                            <button className="btn" onClick={(e) => {
                                setCategoryInput(false)
                            }}>삭제</button>
                            <p>{message}</p>
                        </div>
                    }
                </section>
                {

                    data && data.length > 0 && < PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />
                }
            </div >
        </main >
    )
}
export default CategoryManagement
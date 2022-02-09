import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import _ from 'lodash'
import "./CategoryManagement.scoped.scss"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import axios from "axios";
import apiUrl from "src/utils/api";
const CategoryManagement = () => {
    const navigate = useNavigate();
    const [{ meta, data }, setCategories] = useState<{ [key: string]: any }>({});
    const [addCategoryInput, setCategoryInput] = useState(false);
    const [isActiveInput, setInput] = useState(-1);
    const [addCategoryProperty, setCategoryProperty] = useState<{ [key: string]: any }>({});
    const [title, setTitle] = useState("");
    const debounce = _.debounce;
    const teamId = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.teamId
    })
    const params = useParams();
    const save = () => {
        console.log("save 함수 호출");

    }
    const onChange = (e) => {
        setTitle(e.target.value);
    }
    // 소분류 생성
    const createSubCategories = (mainCategoryId, title, order) => {
        axios.post(apiUrl.subCategories, { mainCategoryId: mainCategoryId, title: title, order: order }).then((result) => {
            console.log("소분류 생성결과", result.data);
            getCategories();
        })
    }
    // 소분류 삭제
    const deleteSubCategories = (id) => {
        axios.delete(apiUrl.subCategories + `/${id}`).then((result) => {
            console.log("소분류삭제결과:", result);
            getCategories();
        }).catch((err) => {
            console.log(err);
            alert("프로젝트가 존재하여 삭제가 불가능합니다.")
        })
    }
    const modifySubCategories = (id, value) => {
        axios.patch(apiUrl.subCategories + `/${id}`, { title: value }).then((result) => {
            console.log("소분류수정결과:", result);
            getCategories();
        }).catch((err) => {
            console.log("소분류 수정 에러:", err);
        })

    }
    // 대분류 생성
    const createMainCategories = (body) => {
        console.log("대분류생성", body);
        axios.post(apiUrl.categories, body).then((result) => {
            console.log("대분류생성결과:", result);
            getCategories();
        })
    }
    // 대분류 삭제
    const deleteMainCategories = (id) => {
        axios.delete(apiUrl.categories + `/${id}`).then((result) => {
            console.log("대분류삭제결과:", result);
            getCategories();
        }).catch((err) => {
            console.log(err);
            alert("소분류가 존재하여 삭제가 불가능합니다.")
        })
    }
    // 대분류 & 소분류 조회
    const getCategories = () => {
        axios.get(apiUrl.categories).then((result) => {
            console.log("대분류 & 소분류 조회:", result.data);
            setCategories(result.data);
        })
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <main>
            <div className="wrap">
                <div className="sub-category">
                    <span>프로젝트</span>
                    <span className="project-manage">프로젝트 관리</span>
                    <span className="current-category">카테고리 관리</span>
                </div>
                <h2 className="h2-title">카테고리 관리</h2>
                <p className="guide-message">정보를 변경하면 자동으로 저장됩니다..</p>
                <section>
                    <div className="add-area">
                        <div className="title-area">
                            <h3 className="h3-title">카테고리 편집</h3>
                            <p className="guide-message">대분류는 최대 16개, 소분류는 8개까지 사용 가능합니다.</p>
                        </div>
                        <button className="add-btn" onClick={() => {
                            setCategoryInput(true);
                        }}>대분류 추가</button>
                    </div>
                    {
                        data &&
                        data.map((mainCategories) => {
                            return (
                                <div className="categories" key={mainCategories.id}>
                                    {/* 대분류 */}
                                    <div className="main-category-list" >
                                        <span className="main-category-title">{mainCategories.title}</span>
                                        <button className="btn add-btn" onClick={() => {
                                            setCategoryInput(true);
                                            setCategoryProperty({ mainCategoryId: mainCategories.id, order: mainCategories.order })
                                        }}>추가</button>
                                        <button className="btn" onClick={() => deleteMainCategories(mainCategories.id)}>삭제</button>
                                    </div>
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
                            )
                        })
                    }
                    {/* 대분류 추가 인풋*/}
                    {
                        addCategoryInput && <div className="main-category-input-area">
                            <span className="arrow-ico"></span>
                            <input type="text" autoFocus className="main-category-input" onChange={(e) => onChange(e)} />
                            <button className="btn add-btn" onClick={() => addCategoryProperty.mainCategoryId == undefined ? createMainCategories({ teamId: teamId, title: title, order: data.length + 1, industryId: params.industryId }) : createSubCategories(addCategoryProperty.mainCategoryId, title, addCategoryProperty.order)}>추가</button>
                            <button className="btn">삭제</button>

                        </div>

                    }
                </section>

            </div>
        </main>
    )
}
export default CategoryManagement
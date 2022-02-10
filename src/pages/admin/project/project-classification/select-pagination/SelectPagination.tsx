import "./SelectPagination.scoped.scss"
import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "src/App";
import apiUrl from "src/utils/api";
import axios from "axios";
import _ from 'lodash'
const SelectPagination = ({ industryId, eventHandler }) => {
    const { teamId } = useContext(AppContext).user;
    const [mainCategoryId, setMainCategoryId] = useState(null); // 대분류 선택 여부
    const [mainCategoriesName, setMainCategoriesName] = useState("대분류를 선택해주세요.")
    const [subCategoriesName, setSubCategoriesName] = useState("소분류를 선택해주세요.")
    const [mainCategoriesMenu, setMainCategoriesMenu] = useState(false); // 대분류 리스트 모달
    const [subCategoriesMenu, setSubCategoriesMenu] = useState(false); // 소분류 리스트 모달
    const [mainCategoriesPage, setMainCategoriesPage] = useState(1); // 대분류 페이징
    const [subCategoriesPage, setSubCategoriesPage] = useState(1); // 소분류 페이징
    const [isMainLastPage, setMainLastPage] = useState(false); // 대분류 마지막 페이지 유무
    const [isSubLastPage, setSubLastPage] = useState(false); //  소분류 마지막 페이지 유무
    const [mainCategoryList, setMainCategoryList] = useState<{ [key: string]: any }[]>([]); // 대분류 카테고리 리스트
    const [subCategoryList, setSubCategoryList] = useState<{ [key: string]: any }[]>([]); // 소분류 카테고리 리스트
    const debounce = _.debounce;
    const params = useParams();
    const navigate = useNavigate();
    // 대분류 검색
    const onChange = (e) => {
        setMainLastPage(false);
        setMainCategoriesPage(1);
        getMainCategories(e.target.value, 1).then((result) => {
            setMainCategoryList(result.data);
        });;
    }
    // 소분류 검색
    const searchSubCategories = (e) => {
        setSubLastPage(false);
        setSubCategoriesPage(1);
        getSubCategories(e.target.value, 1, mainCategoryId).then((result) => {
            setSubCategoryList(result.data);
        });;
    }
    // 대분류 선택 함수 
    const selectMainCategories = (id, title) => {
        eventHandler({ target: { id: 'mainCategoryId', value: id } })
        setMainCategoriesMenu(false); // 탭닫기
        setMainCategoryId(id); // 대분류 아이디 설정
        setMainCategoriesName(title) // 이름설정
        getSubCategories("", 1, id).then((result) => {
            console.log("소분류조회:", result.data);
            setSubCategoryList(result.data);
        })
    }
    // 소분류 선택
    const selectSubCategories = (title, id) => {
        eventHandler({ target: { id: 'subCategoryId', value: id } })
        setSubCategoriesMenu(false);
        setSubCategoriesName(title);
    }
    // 대분류 무한스크롤 함수
    const mainCategoriesScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && isMainLastPage == false) {
            console.log("대분류 바닥감지인데 마지막페이지인가?", isMainLastPage);
            setMainCategoriesPage(mainCategoriesPage + 1);
            getMainCategories("", mainCategoriesPage + 1).then((result) => {
                if (result.data.length == 0) {
                    setMainLastPage(true);
                    return;
                }
                setMainCategoryList([...mainCategoryList, ...result.data]);
            });;
        }
    }
    // 소분류 무한스크롤 함수
    const subCategoriesScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom && isSubLastPage == false) {
            console.log("소분류 바닥감지인데 마지막페이지인가?", isSubLastPage, mainCategoryId);
            setSubCategoriesPage(subCategoriesPage + 1);
            getSubCategories("", subCategoriesPage + 1, mainCategoryId).then((result) => {
                if (result.data.length == 0) {
                    setSubLastPage(true);
                    return;
                }
                setSubCategoryList([...subCategoryList, ...result.data]);
            });;
        }
    }

    // 소분류 조회
    const getSubCategories = (search, page, id) => {
        return axios.get(apiUrl.subCategories + `?mainCategoryId=${id}&page=${page}&limit=10&search=${search}`).then((result) => {
            console.log('소분류조회:', result.data);
            return result.data;
        })
    }
    // 대분류 조회
    const getMainCategories = (search, page) => {
        return axios.get(apiUrl.mainCategories + `?industryId=${industryId}&teamId=${teamId}&page=${page}&limit=10&search=${search}`).then((result) => {
            console.log('대분류조회:', result.data);
            return result.data
        })
    }
    useEffect(() => {
        if (industryId != undefined) {
            getMainCategories("", 1).then((result) => {
                setMainCategoryList(result.data);
            });
        }
    }, [industryId])
    return (
        <>
            <div className="row">
                <label htmlFor="mainCategories">대분류</label>
                <div className="select-box classify-box" onClick={() => setMainCategoriesMenu(!mainCategoriesMenu)}>{mainCategoriesName}</div>
                <button className="edit-btn" onClick={() => navigate(`/projects/${params.projectId}/manage/${industryId}?currentPage=1`)}>편집</button>

                <div className="select-menu" style={{ visibility: mainCategoriesMenu ? 'visible' : 'hidden' }}>
                    <input autoFocus type="text" onChange={debounce((e) => onChange(e), 500)} />
                    {
                        mainCategoryList.length > 0 ? <ul onScroll={mainCategoriesScroll}>
                            {
                                mainCategoryList.map((items, index) => {
                                    return (
                                        <li key={index} onClick={() => selectMainCategories(items.id, items.title)}>{items.title}</li>
                                    )
                                })
                            }
                        </ul> : <p className="message">대분류가 존재하지 않습니다</p>
                    }

                </div>
            </div>
            {
                mainCategoryId != null && <div className="row">
                    <label htmlFor="mainCategories">소분류</label>
                    <div className="select-box classify-box" onClick={() => setSubCategoriesMenu(!subCategoriesMenu)}>{subCategoriesName}</div>
                    <button className="edit-btn" onClick={() => navigate(`/projects/${params.projectId}/manage/${industryId}?currentPage=1`)}>편집</button>
                    <div className="select-menu" style={{ visibility: subCategoriesMenu ? 'visible' : 'hidden' }}>
                        {
                            subCategoryList.length == 0 ? <p className="message">소분류가 존재하지 않습니다</p> : <input type="text" autoFocus onChange={debounce((e) => searchSubCategories(e), 500)} />
                        }
                        {
                            subCategoryList.length > 0 &&
                            <ul onScroll={subCategoriesScroll}>
                                {
                                    subCategoryList.map((items, index) => {
                                        return (
                                            <li key={index} onClick={() => selectSubCategories(items.title, items.id)}>{items.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            }
        </>

    )
}
export default SelectPagination
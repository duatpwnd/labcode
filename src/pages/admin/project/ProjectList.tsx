import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import apiUrl from "src/utils/api";
import _ from 'lodash'
import history from "src/utils/history";
import { ReactElement } from "react";
import "./ProjectList.scoped.scss"
const SearchInput = styled.input`
    padding-left:14px;
    box-sizing:border-box;
    font-size:18px;
    width:calc(100% - 24px);
    overflow:hidden;
    text-overflow:ellipsis;
`
const SearchButton = styled.button`
    width:24px;
    height:24px;
    vertical-align:middle;
    background: url(${require('images/search_ico.svg').default}) no-repeat center center /
    24px 24px;
`
const CreateBtn = styled.button`
    background: #5138E5;
    border-radius: 8px;
    font-size: 18px;
    width: 141px;
    padding: 14px 0;
    color: white;
   
`
const StatusText = styled.strong`
    font-size:14px;
    text-align:center;
    color:${(props) => props.color};
    background:${(props) => props.background};
    padding:9px 8px;
    border-radius:4px;
`
const Pagination = ({ currentPage, totalPages }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    const pageMove = (pageNumber) => {
        history.push({
            search: `?currentPage=${pageNumber}&search=${search}&isActive=${isActive}`,
        });
    }
    const rendering = () => {
        const result: ReactElement[] = [];
        for (let i = 1; i <= totalPages; i++) {
            result.push(<li className={currentPage == i ? "active" : ""} key={i} onClick={() => pageMove(i)}>{i}</li>);
        }
        return result;
    };

    return <ul className="pagination">{
        currentPage != 1 && <li className="prev-page-btn paging-btn" onClick={() => pageMove(currentPage - 1)}></li>}{rendering()}{
            currentPage != totalPages &&
            <li className="next-page-btn paging-btn" onClick={() => pageMove(currentPage + 1)}></li>}
    </ul>;
}
const LnbMenu = ({ eventHandler, child }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isActive = searchParams.get('isActive');
    const [list, setList] = useState({
        arr: [{ value: "전체", type: "" }, { value: "신청접수", type: false }, { value: "승인완료", type: true }]
    })
    return (
        <div className="btn-wrap">
            {
                list.arr.map((el, index) => <button key={index} className={String(el.type) == String(isActive) ? 'active category-btn' : 'category-btn'} onClick={() => {
                    eventHandler(1, "", el.type)
                }}>{el.value}</button>)
            }
            {child}
        </div>
    )
}
const Project = () => {
    const [{ data, meta }, setupList] = useState<{ [key: string]: any }>({});
    const [menuIndex, menuIndexUpdate] = useState(-1);
    const menu = useRef(null);
    const debounce = _.debounce;
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('currentPage');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
    const searchDebounce = debounce((query) => {
        getProjectList(1, query, isActive);
    }, 500);
    const getProjectList = (page, search, isActive) => {
        history.push({
            search: `?currentPage=${page}&search=${search}&isActive=${isActive}`,
        });
        axios
            .get(apiUrl.project + `?search=${search}&page=${page}&isActive=${isActive}&limit=16`)
            .then((result: any) => {
                console.log('프로젝트리스트:', result);
                menuIndexUpdate(-1);
                setupList(result.data);
            })
    }
    const deleteProject = (id) => {
        axios
            .delete(apiUrl.project + `/${id}`)
            .then((result: any) => {
                console.log("프로젝트삭제결과:", result);
                getProjectList(1, search, isActive);
            }).catch((err: any) => {
                console.log('프로젝트삭제에러:', err);
            });
    }
    const createProject = debounce(() => {
        const body = {
            title: "제목 미정",
            description: "설명 미정",
            bannerImage: "",
            versionId: 1,
            countryId: 1,
            homepage: "http://snaptag.co.kr/"
        }
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .post(apiUrl.project, formData)
            .then((result: any) => {
                console.log("프로젝트생성결과:", result);
                getProjectList(1, "", "");
            }).catch((err: any) => {
                console.log('프로젝트생성에러:', err);
            });
    }, 500);
    const setPosition = (el) => {
        const scrollHeight = document.body.scrollHeight;
        const windowScrollY = window.scrollY;
        const getRectTop = Math.ceil(el.getBoundingClientRect().top);
        const elHeight = el.offsetHeight;
        if (scrollHeight <= windowScrollY + getRectTop + elHeight) {
            el.style.top = "-75px";
        }
    }
    useEffect(() => {
        getProjectList(currentPage, search, isActive);
    }, [currentPage])
    return (
        <main>
            <div className="search-area">
                <SearchButton />
                <SearchInput placeholder="원하는 프로젝트를 검색해보세요."
                    onChange={(e) => searchDebounce(e.target.value)} />
            </div>
            <LnbMenu eventHandler={getProjectList} child={<CreateBtn onClick={createProject}>프로젝트 생성</CreateBtn>} />
            {/* <OrderMenu /> */}

            <ul className="project-list">
                {
                    data != undefined &&
                    data.map((list, index) => <li className="list" key={index}>
                        <Link to={{ pathname: list.isActive ? `/projects/${list.id}/products` : "" }} className="link" >
                            <div className="mask"></div>
                            <img src={list.bannerImage} title={list.title} className="thumbnail" />
                        </Link>
                        <div className="bottom">
                            <dl>
                                <dt>{list.title}</dt>
                                <dd>{list.description}</dd>
                            </dl>
                            <div className="status-area">
                                {
                                    list.isActive ? <StatusText color="black" background="white;">승인완료</StatusText>
                                        : <StatusText color="white;" background="#79828A;">신청접수</StatusText>
                                }
                                <button className="menu-btn" onClick={() => { menuIndexUpdate(index); }}></button>
                            </div>
                            {
                                menuIndex == index &&
                                <div className="menu" ref={el => { if (el != null) { setPosition(el); (menu as { [key: string]: any }).current = el; } }}>
                                    <h3 className="h3-title">{list.title}</h3>
                                    <ul >
                                        <li className="manage" onClick={() => navigate(`/projects/${list.id}/edit`)}>
                                            프로젝트 관리
                                        </li>
                                        <li className="delete" onClick={() => list.isActive ? "" : deleteProject(list.id)}>
                                            삭제
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>

                    </li>)
                }
            </ul>
            {
                meta != undefined && data.length > 0 && <Pagination currentPage={Number(meta.currentPage)} totalPages={meta.totalPages} />
            }
        </main>
    )
}
export default Project
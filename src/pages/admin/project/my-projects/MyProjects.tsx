import "./MyProjects.scoped.scss"
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import history from "src/utils/history";
import _ from 'lodash'
import styled from "styled-components";
import { Link } from "react-router-dom";
import PaginatedItems from "src/components/common/pagination/Paginate";
import axios from "axios";
import apiUrl from "src/utils/api";
const StatusText = styled.strong`
    font-size:14px;
    text-align:center;
    color:${(props) => props.color};
    background:${(props) => props.background};
    padding:9px 8px;
    border-radius:4px;
`
const MyProjects = () => {
    const [message, setMessage] = useState("");
    const [{ data, meta }, setupList] = useState<{ [key: string]: any }>({});
    const [menuIndex, menuIndexUpdate] = useState(-1); // 각 프로젝트 메뉴 모달
    const menu = useRef(null); // 메뉴 모달 객체
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('currentPage');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');
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
    const setPosition = (el) => {
        const scrollHeight = document.body.scrollHeight;
        const windowScrollY = window.scrollY;
        const getRectTop = Math.ceil(el.getBoundingClientRect().top);
        const elHeight = el.offsetHeight;
        if (scrollHeight <= windowScrollY + getRectTop + elHeight) {
            el.style.top = "-75px";
        }
    }
    const isPossibleDelete = (isActive, id) => {
        if (isActive) {
            alert("관리자에게 문의해주세요");
            menuIndexUpdate(-1)
        } else {
            deleteProject(id)
        }
    }
    const menuModal = (e, id) => {
        if (id == menuIndex) {
            menuIndexUpdate(-1)
        } else {
            menuIndexUpdate(id);
        }
    }
    const getProjectList = (page, search, isActive) => {
        history.push({
            search: `?currentPage=${page}&search=${search}&isActive=${isActive}`,
        });
        axios
            .get(apiUrl.project + `?search=${search}&page=${page}&isActive=${isActive}&limit=16`)
            .then((result: any) => {
                console.log('프로젝트리스트:', result);
                if (result.data.data.length == 0 && search != "") {
                    setMessage('검색결과가 없습니다.')
                } else {
                    setMessage("")
                }
                if (result.data.data.length == 0 && search == "") {
                    setMessage('프로젝트를 생성해주세요.')
                } else {
                    setMessage('')
                }
                menuIndexUpdate(-1);
                setupList(result.data);
            }).catch((err) => {
                console.log("프로젝트리스트 조회에러:", err);
            })
    }


    useEffect(() => {
        console.log("감ㄱ지");
        getProjectList(currentPage, search, isActive);
    }, [currentPage, search, isActive])
    return (
        <main>
            {
                data &&
                    data.length == 0 ? <p className="message">{message}</p> : <ul className="project-list">
                    {
                        data &&
                        data.map((list, index) => <li className="list" key={index}>
                            {
                                list.isActive ? <Link to={`/projects/${list.id}/products?currentPage=1&search=`} className="link" >
                                    <img src={list.bannerImage || require("images/default_project_thumbnail.jpg").default} title={list.title} className="thumbnail" />
                                </Link> : <div className="link"><div className="mask"></div>
                                    <img src={list.bannerImage || require("images/default_project_thumbnail.jpg").default} title={list.title} className="thumbnail" /></div>

                            }
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
                                    <button id={`menu${list.id}`} className="menu-btn" onClick={(e) => { menuModal(e, list.id) }}></button>
                                </div>
                                {
                                    menuIndex == list.id &&
                                    <div className="menu" ref={el => { if (el != null) { setPosition(el); (menu as { [key: string]: any }).current = el; } }}>
                                        <h3 className="h3-title">{list.title}</h3>
                                        <ul >
                                            <li className="manage" onClick={() => navigate(`/projects/edit/${list.id}`)}>
                                                프로젝트 관리
                                            </li>
                                            <li className="delete" onClick={() => isPossibleDelete(list.isActive, list.id)}>
                                                삭제
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </div>

                        </li>)
                    }
                </ul>
            }
            {

                data && data.length > 0 && < PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />
            }
        </main>
    )
}
export default MyProjects
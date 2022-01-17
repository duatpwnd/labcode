import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import apiUrl from "src/utils/api";
import _ from 'lodash'
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
    background:#5138E5;
    border-radius:8px;
    font-size:18px;
    width:160px;
    padding:19px 0;
    color:white;
    @media all and (max-width: 767px) {
        margin-top:20px;
        width:100%;
    }
`
const StatusText = styled.strong`
    font-size:14px;
    text-align:center;
    color:${(props) => props.color};
    background:${(props) => props.background};
    position: absolute;
    top: 20px;
    right: 20px;
    padding:9px 8px;
    border-radius:4px;
`
const OrderMenu = () => {
    const [isActive, setOrderMenu] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    return (
        <div className="order-area">
            {
                isActive ? <button className="order-btn active" onClick={() => setOrderMenu(!isActive)}>최신순</button> : <button className="order-btn inactive" onClick={() => setOrderMenu(!isActive)}>최신순</button>
            }
            {
                isActive && <ul className="order-select">
                    <li className={orderIndex == 0 ? "selected" : ""} onClick={() => { setOrderIndex(0); setOrderMenu(false) }}>
                        최신순
                    </li>
                    <li className={orderIndex == 1 ? "selected" : ""} onClick={() => { setOrderIndex(1); setOrderMenu(false) }}>
                        오래된 순
                    </li>
                    <li className={orderIndex == 2 ? "selected" : ""} onClick={() => { setOrderIndex(2); setOrderMenu(false) }}>
                        가나다 순
                    </li>
                </ul>

            }
        </div>
    )
}
const Project = () => {
    const [list, setupList] = useState<{ [key: string]: any }[]>([]);
    const [index, indexUpdate] = useState(0);
    const [menuIndex, menuIndexUpdate] = useState(-1);
    const debounce = _.debounce;
    const searchDebounce = debounce((query) => {
        getProjectList(query, 1)
    }, 500);
    const getProjectList = (search, order) => {
        axios
            .get(apiUrl.project + `?search=${search}&ordering=${order}`)
            .then((result: any) => {
                console.log('프로젝트리스트:', result.data.data);
                setupList(result.data.data);
            })
    }
    useEffect(() => {
        console.log('프로젝트 리스트페이지 노출');
        getProjectList("", 1);
    }, [])
    return (
        <main>
            <div className="search-area">
                <SearchButton />
                <SearchInput placeholder="원하는 프로젝트를 검색해보세요."
                    onChange={(e) => searchDebounce(e.target.value)} />
            </div>
            <CreateBtn>프로젝트 생성</CreateBtn>
            <ul className="nav">
                <li className={index == 0 ? 'active' : ''} onClick={() => indexUpdate(0)}>
                    전체 프로젝트<span>(14)</span>
                </li>
                <li className={index == 1 ? 'active' : ''} onClick={() => indexUpdate(1)}>
                    신청접수<span>(14)</span>
                </li>
                <li className={index == 2 ? 'active' : ''} onClick={() => indexUpdate(2)}>
                    승인완료<span>(14)</span>
                </li>
            </ul>
            <OrderMenu />
            <ul className="project-list">
                {
                    list.map((list, index) => <li className="list" key={index}>
                        <Link to={{ pathname: `/project/${list.teamId}` }}>
                            <img src={list.bannerImage} alt="LABCODE" title="LABCODE" className="thumbnail" />
                        </Link>
                        {
                            list.isActive ? <StatusText color="#5138E5" background="#EEEBFC">승인완료</StatusText>
                                : <StatusText color="#EA43CF" background="#FFF0F7">신청접수</StatusText>
                        }
                        <div className="bottom">
                            <dl>
                                <dt>{list.title}</dt>
                                <dd>{list.description}</dd>
                            </dl>
                            <button className="menu-btn" onClick={() => menuIndexUpdate(index)}></button>
                            {
                                menuIndex == index &&
                                <div className="menu">
                                    <h3 className="h3-title">커피빈 패키지 프로젝트</h3>
                                    <ul >
                                        <li className="manage">
                                            프로젝트 관리
                                        </li>
                                        <li className="delete">
                                            삭제
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>

                    </li>)
                }
            </ul>
        </main>
    )
}
export default Project
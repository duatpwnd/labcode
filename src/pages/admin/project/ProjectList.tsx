import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    border: 1px solid #E6E8EB;
    font-size:14px;
    text-align:center;
    color:${(props) => props.color};
    background:${(props) => props.background};
    position: absolute;
    top: 20px;
    right: 20px;
    z-index:2;
    padding:9px 8px;
    border-radius:4px;
`
const OrderMenu = () => {
    const [isActive, setOrderMenu] = useState(false);
    const [orderObj, setOrder] = useState({
        index: 0,
        arr: ['최신순', '오래된 순', '가나다 순']
    })
    return (
        <div className="order-area">
            <button className={isActive ? "order-btn active" : "order-btn inactive"} onClick={() => setOrderMenu(!isActive)}>{orderObj.arr[orderObj.index]}</button>
            {
                isActive && <ul className="order-select">
                    {orderObj.arr.map((el, index) => <li key={index} className={index == orderObj.index ? "selected" : ""} onClick={() => { setOrderMenu(false); setOrder({ ...orderObj, index: index }) }}>{el}</li>)}
                </ul>
            }
        </div>
    )
}
const LnbMenu = ({ eventHandler }) => {
    const [list, setList] = useState({
        index: 0,
        arr: [{ value: "전체 프로젝트", type: "" }, { value: "신청접수", type: false }, { value: "승인완료", type: true }]
    })
    return (
        <ul className="nav">
            {
                list.arr.map((el, index) => <li key={index} className={index == list.index ? 'active' : ''} onClick={() => {
                    setList({
                        ...list, index: index
                    });
                    eventHandler("", 1, el.type)
                }}>{el.value}</li>)
            }
        </ul>
    )
}
const Project = () => {
    const [list, setupList] = useState<{ [key: string]: any }[]>([]);
    const [menuIndex, menuIndexUpdate] = useState(-1);
    const debounce = _.debounce;
    const navigate = useNavigate()
    const searchDebounce = debounce((query) => {
        getProjectList(query, 1, "")
    }, 500);
    const getProjectList = (search, order, isActive) => {
        axios
            .get(apiUrl.project + `?search=${search}&ordering=${order}&isActive=${isActive}`)
            .then((result: any) => {
                console.log('프로젝트리스트:', result);
                setupList(result.data.data.data);
            })
    }
    const createProject = () => {
        const body = {
            title: "",
            description: "",
            bannerImage: "",
            hompage: "http://snaptag.co.kr/"
        }
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .post(apiUrl.project, formData)
            .then((result: any) => {
                console.log("프로젝트생성결과:", result);
                getProjectList("", 1, "");
            }).catch((err: any) => {
                console.log('프로젝트생성에러:', err);
            });
    }
    useEffect(() => {
        console.log('프로젝트 리스트페이지 노출');
        getProjectList("", 1, "");
    }, [])
    return (
        <main>
            <div className="search-area">
                <SearchButton />
                <SearchInput placeholder="원하는 프로젝트를 검색해보세요."
                    onChange={(e) => searchDebounce(e.target.value)} />
            </div>
            <CreateBtn onClick={createProject}>프로젝트 생성</CreateBtn>
            <LnbMenu eventHandler={getProjectList} />
            <OrderMenu />
            <ul className="project-list">
                {
                    list.map((list, index) => <li className="list" key={index}>
                        <Link to={{ pathname: `/product/${list.id}` }} className="link" >
                            <div className="mask"></div>
                            <img src={require("images/logo.svg").default} title={list.title} className="thumbnail" />
                        </Link>
                        {
                            list.isActive ? <StatusText color="black" background="white;">승인완료</StatusText>
                                : <StatusText color="white;" background="#79828A;">신청접수</StatusText>
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
                                        <li className="manage" onClick={() => navigate(`/project/${list.id}`)}>
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
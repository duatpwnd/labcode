import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
const SelectBox = styled.select`
    width: 89px;
    margin-bottom:20px;
    border: 1px solid #DBDFE1;
    border-radius: 8px;
    padding: 8px 16px;
    color: #333333;
    background: url(${require('images/arrow_bottom.svg').default}) no-repeat right 8px center /
    16px 16px;
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
const ProjectMenu = () => {
    const [isActive, menuUpdate] = useState(false);
    return (
        <div>
            <button className="menu-btn" onClick={() => menuUpdate(!isActive)}></button>
            {
                isActive &&
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
    )
}
const Project = () => {
    const a = 3;
    const [index, indexUpdate] = useState(0);
    useEffect(() => {
        console.log('프로젝트 리스트페이지 노출');
    }, [])
    return (
        <main>
            <div className="search-area">
                <SearchButton />
                <SearchInput placeholder="원하는 프로젝트를 검색해보세요." />
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
            <SelectBox>
                <option>
                    최신순
                </option>
            </SelectBox>
            <ul className="project-list">
                {
                    [0, 1, 2, 3].map((el, index) => <li className="list">
                        <Link to={{ pathname: `${a}` }}>
                            <img src={require("images/ex.svg").default} alt="LABCODE" title="LABCODE" className="thumbnail" />
                        </Link>
                        <StatusText color="#EA43CF" background="#FFF0F7">신청접수</StatusText>
                        <dl>
                            <dt>프로젝트명</dt>
                            <dd>프로젝트</dd>
                        </dl>
                        <ProjectMenu />
                    </li>)
                }
            </ul>
        </main>
    )
}
export default Project
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./ProjectList.scoped.scss"
const SearchInput = styled.input`
    width:calc(100% - 190px);
    margin-right:30px;
    padding:14px 10px;
    box-sizing:border-box;
    border-radius: 8px;
    @media all and (max-width: 767px) {
        width:100%;
    }
`
const SelectBox = styled.select`
    width: 58px;
    border: 0;
    margin-bottom:28px;
    font-size: 13px;
    color: #333333;
    background: url(${require('images/arrow_bottom.svg').default}) no-repeat right center /
    16px 16px;
`
const CreateBtn = styled.button`
    background:#5138E5;
    border-radius:8px;
    font-size:18px;
    width:160px;
    padding:14px 0;
    color:white;
    @media all and (max-width: 767px) {
        margin-top:20px;
        width:100%;
    }
`
const Project = () => {
    const a = 3;
    const [index, indexUpdate] = useState(0);
    useEffect(() => {
        console.log('프로젝트 리스트페이지 노출');
    }, [])
    return (
        <main>
            <SearchInput placeholder="원하는 프로젝트를 검색해보세요." />
            <CreateBtn>프로젝트 생성</CreateBtn>
            <ul className="nav">
                <li className={index == 0 ? 'active' : ''} onClick={() => indexUpdate(0)}>
                    전체 프로젝트(14)
                </li>
                <li className={index == 1 ? 'active' : ''} onClick={() => indexUpdate(1)}>
                    신청접수(2)
                </li>
                <li className={index == 2 ? 'active' : ''} onClick={() => indexUpdate(2)}>
                    승인완료(12)
                </li>
            </ul>
            <SelectBox>
                <option>
                    최신순
                </option>
            </SelectBox>
            <ul className="project-list">
                <li className="list">
                    <Link to={{ pathname: `${a}` }}>
                        <img src={require("images/ex.png").default} alt="LABCODE" title="LABCODE" className="thumbnail" />
                    </Link>
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <img src={require("images/ex.png").default} alt="LABCODE" title="LABCODE" className="thumbnail" />
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <img src={require("images/ex.png").default} alt="LABCODE" title="LABCODE" className="thumbnail" />
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <img src={require("images/ex.png").default} alt="LABCODE" title="LABCODE" className="thumbnail" />
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
                <li className="list">
                    <dl>
                        <dt>프로젝트명</dt>
                        <dd>프로젝트</dd>
                    </dl>
                </li>
            </ul>
        </main>
    )
}
export default Project
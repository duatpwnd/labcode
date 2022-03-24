import styled from "styled-components";
import "./Navigator.scoped.scss"
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { useEffect } from "react";
const ParentNavLink = styled(NavLink)`
    width: 100%;
    padding: 18px 35px 18px 64px;
    box-sizing: border-box;
    display: block;
    font-weight: 700;
    color: #9EA7AD;
    font-size: 18px;
    background: url(${props => require("images/" + props.background).default}) no-repeat left 19px top 14px/ 24px 24px;
    &.active{
        color: black; 
        border-radius: 12px;
        background: url(${props => require("images/active_" + props.background).default}) #F6F7F8 no-repeat left 19px top 14px/ 24px 24px;
    }
    @media all and (max-width: 1199px) {
        background: unset;
        padding:25px 0;
        &.active{
            background: unset;
        }
    }
`
const ChildNavLink = styled(NavLink)`
    color: #9EA7AD;
    box-sizing: border-box;
    display: block;
    padding: 6px 0px 6px 90px;
    font-size: 14px;
    font-weight: 700;
    &.active{
        color: black;
    }
`
const Navigator = () => {
    const userInfo = useSelector((state: RootState) => {
        return state.signIn.userInfo
    })
    const { pathname } = useLocation();
    return (
        <nav>
            <ul>
                <li>
                    <ParentNavLink to="/dashboard" background="dashboard_ico.svg">대시보드</ParentNavLink>
                </li>
                <li className="main-category">
                    <ParentNavLink className={pathname.startsWith("/teams") && "active"} to={`/teams/list?currentPage=1&search=`} background="team_ico.svg">팀 정보</ParentNavLink>
                    <ul className="sub-category">
                        <li>
                            <ChildNavLink className={pathname.startsWith(`/teams/detail`) && "active"} to={`/teams/detail/${userInfo?.user.teamId}`}>상세 정보</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={`/teams/list?currentPage=1&search=`}>팀 목록</ChildNavLink>
                        </li>

                    </ul>
                </li>
                <li className="main-category">
                    <ParentNavLink className={pathname.startsWith("/projects") && "active"} to={`/projects/list/my?currentPage=1&search=&isActive=true&teamId=`} background="project_ico.svg">프로젝트</ParentNavLink>
                    <ul className="sub-category">
                        <li>
                            <ChildNavLink className={pathname.includes(`/projects/edit`) && "active" || pathname.includes(`/projects/list`) && "active"} to={`/projects/list/my?currentPage=1&search=&isActive=true&teamId=`}>프로젝트 목록</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={`/projects/create`}>프로젝트 등록</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={`/projects/manage?currentPage=1`}>카테고리 관리</ChildNavLink>
                        </li>
                    </ul>
                </li>
                {/* <li>
                    <ParentNavLink className={pathname.startsWith("/products") && "active"} to={`/products/list?currentPage=1&search=`} background="product_ico.svg">제품</ParentNavLink>
                    <ul>
                        <li>
                            <ChildNavLink className={pathname.includes("/products/edit") && "active"} to={`/products/list?projectId=&currentPage=1&search=`}>제품 목록</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={"/products/create/defaultInfo"}>제품 등록</ChildNavLink>
                        </li>

                    </ul>
                </li> */}
            </ul>
        </nav>
    )
}
export default Navigator
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import "./Navigator.scoped.scss"
import history from "src/utils/history";
import {
    useLocation
} from "react-router-dom";

const ParentNavLink = styled(NavLink)`
    width: 100%;
    padding: 25px 35px 25px 58px;
    box-sizing: border-box;
    display: block;
    font-weight: 700;
    color: #9EA7AD;
    font-size: 18px;
    background: url(${props => require("images/" + props.background).default}) no-repeat left 19px top 20px/ 24px 24px;
    &.active{
        color: black;
        border-radius: 12px;
        background: url(${props => require("images/active_" + props.background).default}) #F6F7F8 no-repeat left 19px top 20px/ 24px 24px;
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
    padding: 18px 0px 18px 80px;
    font-size: 14px;
    font-weight: 700;
    &.active{
        color: black;
    }
`
const Navigator = () => {
    const teamId = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.teamId
    })
    const { pathname } = useLocation();
    return (
        <nav>
            <ul>
                <li>
                    <ParentNavLink to="/dashboard" background="dashboard_ico.svg">대시보드</ParentNavLink>
                </li>
                <li>
                    <ParentNavLink to={`/teams/${teamId}`} background="team_ico.svg">팀 정보</ParentNavLink>
                </li>
                <li>
                    <ParentNavLink className={pathname.startsWith("/projects") && "active"} to={`/projects/list?currentPage=1&search=&isActive=false`} background="project_ico.svg">프로젝트</ParentNavLink>
                    <ul>
                        <li>
                            <ChildNavLink to={`/projects/list?currentPage=1&search=&isActive=false`}>프로젝트 목록</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={`/projects/create`}>프로젝트 등록</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={`/projects/manage`}>카테고리 관리</ChildNavLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <ParentNavLink className={pathname.startsWith("/products") && "active"} to={`/products/list?currentPage=1&search=`} background="product_ico.svg">제품</ParentNavLink>
                    <ul>
                        <li>
                            <ChildNavLink to={`/products/list?currentPage=1&search=`}>제품 목록</ChildNavLink>
                        </li>
                        <li>
                            <ChildNavLink to={"/products/create/defaultInfo"}>제품 등록</ChildNavLink>
                        </li>

                    </ul>
                </li>
            </ul>
        </nav>
    )
}
export default Navigator
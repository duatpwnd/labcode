import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "./Navigator.scoped.scss"
const StyledNavLink = styled(NavLink)`
    width: 100%;
    padding: 25px 35px 25px 58px;
    box-sizing: border-box;
    display: block;
    color: #79828a;
    font-size: 18px;
    background: url(${props => require("images/" + props.background).default}) no-repeat left 19px top 20px/ 24px 24px;
    &.active{
        color: black;
        border-radius: 12px;
        font-weight: 700;
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
const Navigator = () => {
    return (
        <nav>
            <ul>
                <li>
                    <StyledNavLink to="/dashboard" background="dashboard_ico.svg">대시보드</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/team/2" background="team_ico.svg">팀 정보</StyledNavLink>
                </li>
                <li >
                    <StyledNavLink to="/projects" background="project_ico.svg">프로젝트</StyledNavLink>
                </li>
                {/* <li >
                    <NavLink to="/product" className="product">
                        제품
                    </NavLink>
                </li> */}
            </ul>
        </nav>
    )
}
export default Navigator
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigator.scoped.scss"
const Navigator = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/dashboard"
                        className="dashboard"
                    >
                        대시보드
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/team" className="team">
                        팀
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/project" className="project">
                        프로젝트
                    </NavLink>
                </li>
                <li >
                    <NavLink to="/product" className="product">
                        제품
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Navigator
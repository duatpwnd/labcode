import { NavLink } from "react-router-dom";
import "./Navigator.scoped.scss"
const Navigator = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/admin/dashboard">
                        대시보드
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/team">
                        팀
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/project">
                        프로젝트
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/production">
                        제품
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Navigator
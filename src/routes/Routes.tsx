import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "src/pages/main/Main"
import Admin from "src/pages/admin/Admin";
import Team from "src/pages/admin/team/Team";
import Dashboard from "src/pages/admin/dashboard/Dashboard";
import Project from "src/pages/admin/project/Project";
import Production from "src/pages/admin/production/Production";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
            </Route>
            <Route path="/admin/*" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="team" element={<Team />} />
                <Route path="project" element={<Project />} />
                <Route path="production" element={<Production />} />
            </Route>
        </Routes>
    );
}
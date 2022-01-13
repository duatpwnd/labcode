import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "src/pages/main/Main"
import Team from "src/pages/admin/team/Team";
import Dashboard from "src/pages/admin/dashboard/Dashboard";
import ProjectList from "src/pages/admin/project/ProjectList";
import ProjectDetail from "src/pages/admin/project/ProjectDetail";
import Production from "src/pages/admin/production/Production";
import Help from "src/pages/help/Help";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/project" element={<ProjectList />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/production" element={<Production />} />
            <Route path="/help" element={<Help />}></Route>
        </Routes>
    );
}
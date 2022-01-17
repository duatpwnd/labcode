import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "src/pages/main/Main"
import Dashboard from "src/pages/admin/dashboard/Dashboard";
import ProjectList from "src/pages/admin/project/ProjectList";
import ProjectDetail from "src/pages/admin/project/ProjectDetail";
import Product from "src/pages/admin/product/Product";
import Inquiries from "src/pages/inquiries/Inquiries";
import Team from "src/pages/admin/team/Team";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/project" element={<ProjectList />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/product" element={<Product />} />
            <Route path="/inquiries" element={<Inquiries />}></Route>
        </Routes>
    );
}
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "src/pages/main/Main"
import Team from "src/pages/admin/team/Team";
import Dashboard from "src/pages/admin/dashboard/Dashboard";
import ProjectList from "src/pages/admin/project/ProjectList";
import ProjectDetail from "src/pages/admin/project/ProjectDetail";
import Product from "src/pages/admin/product/Product";
import Inquiryies from "src/pages/inquiries/Inquiryies";
import Profile from "src/pages/profile/Profile";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/project" element={<ProjectList />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/product" element={<Product />} />
            <Route path="/inquiries" element={<Inquiryies />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
        </Routes>
    );
}
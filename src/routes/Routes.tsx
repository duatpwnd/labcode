import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "pages/main/Main"
import Dashboard from "pages/admin/dashboard/Dashboard";
import ProjectList from "pages/admin/project/ProjectList";
import ModifyProject from "pages/admin/project/ModifyProject";
import ProductList from "pages/admin/product/ProductList";
import CreateProduct from "pages/admin/create-product/CreateProduct";
import DefaultInfo from "pages/admin/create-product/default-info/DefaultInfo";
import PrintInfo from "pages/admin/create-product/print-info/PrintInfo";
import AddInfo from "pages/admin/create-product/add-info/AddInfo";
import Inquiries from "pages/inquiries/Inquiries";
import Team from "pages/admin/team/Team";
import CreateTeam from "pages/admin/team/CreateTeam";
import CategoryManagement from "pages/admin/project/category-manage/CategoryManagement";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teams/:teamId" element={<Team />} />
            <Route path="/teams/create" element={<CreateTeam />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/edit" element={<ModifyProject />} />
            <Route path="/projects/:projectId/products" element={<ProductList />} />
            <Route path="/projects/:projectId/manage/:industryId" element={<CategoryManagement />} />
            <Route path="/projects/:projectId/products/:productId" element={<CreateProduct />}>
                <Route path="defaultInfo" element={<DefaultInfo />} />
                <Route path="printInfo" element={<PrintInfo />} />
                <Route path="addInfo" element={<AddInfo />} />
            </Route>
            <Route path="/inquiries/create" element={<Inquiries />}></Route>
        </Routes>
    );
}
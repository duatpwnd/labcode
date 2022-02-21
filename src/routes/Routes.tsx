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
import ProductInfo from "src/pages/admin/create-product/product-info/ProductInfo";
import Inquiries from "pages/inquiries/Inquiries";
import Team from "pages/admin/team/Team";
import CategoryManagement from "pages/admin/project/category-manage/CategoryManagement";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teams/:teamId" element={<Team />} />
            {/* 프로젝트 :: S */}
            <Route path={`/projects/list`} element={<ProjectList />} />
            <Route path={`/projects/create`} element={<ModifyProject />} />
            <Route path="/projects/:projectId/edit" element={<ModifyProject />} />

            {/* 프로젝트 :: E */}

            {/* 제품 :: S */}
            <Route path="/products/list" element={<ProductList />} />

            {/* 제품 :: E */}
            <Route path="/projects/:projectId/manage/:industryId" element={<CategoryManagement />} />
            <Route path="/products/create" element={<CreateProduct />}>
                <Route path="defaultInfo" element={<DefaultInfo />} />
                <Route path="printInfo" element={<PrintInfo />} />
                <Route path="productInfo" element={<ProductInfo />} />
            </Route>
            <Route path="/inquiries/create" element={<Inquiries />}></Route>
        </Routes>
    );
}
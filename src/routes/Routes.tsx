import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
import TeamList from "src/pages/admin/team/team-list/TeamList";
import CategoryManagement from "pages/admin/project/category-manage/CategoryManagement";
import MyProjects from "src/pages/admin/project/my-projects/MyProjects";
import TeamsProjects from "src/pages/admin/project/teams-projects/TeamsProjects";
export default function CreateRoutes() {
    const location = useLocation();
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teams/list" element={<TeamList />} />
            <Route path="/teams/detail/:teamId" element={<Team />} />
            <Route path="/teams/create" element={<Team />} />
            {/* 프로젝트 :: S */}
            <Route path={`/projects/list`} element={<ProjectList />}>
                <Route path="my" element={<MyProjects />} />
                <Route path="teams" element={<TeamsProjects />} />
            </Route>
            <Route path={`/projects/create`} element={<ModifyProject />} />
            <Route path="/projects/edit/:projectId" element={<ModifyProject />} />
            {/* 프로젝트 :: E */}

            {/* 제품 :: S */}
            <Route path="/products/list" element={<ProductList />} />
            <Route path="/projects/manage" element={<CategoryManagement />} />
            <Route path="/products/create" element={<CreateProduct />}>
                <Route path="defaultInfo" element={<DefaultInfo />} />
                <Route path="printInfo" element={<PrintInfo />} />
                <Route path="productInfo" element={<ProductInfo />} />
            </Route>
            <Route path="/products/edit/:productId/:teamId/:industryId" element={<CreateProduct />}>
                <Route path="defaultInfo" element={<DefaultInfo />} />
                <Route path="printInfo" element={<PrintInfo />} />
                <Route path="productInfo" element={<ProductInfo />} />
            </Route>
            {/* 제품 :: E */}
            <Route path="/inquiries/create" element={<Inquiries />}></Route>
            <Route path='*' element={<Dashboard />} />
        </Routes>
    );
}
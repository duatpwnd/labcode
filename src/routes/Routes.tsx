import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "src/pages/main/Main"
import Dashboard from "src/pages/admin/dashboard/Dashboard";
import ProjectList from "src/pages/admin/project/ProjectList";
import ModifyProject from "src/pages/admin/project/ModifyProject";
import ProductList from "src/pages/admin/product/ProductList";
import CreateProduct from "src/pages/admin/create-product/CreateProduct";
import DefaultInfo from "src/pages/admin/create-product/default-info/DefaultInfo";
import PrintInfo from "src/pages/admin/create-product/print-info/PrintInfo";
import AddInfo from "src/pages/admin/create-product/add-info/AddInfo";
import Inquiries from "src/pages/inquiries/Inquiries";
import Team from "src/pages/admin/team/Team";
import CreateTeam from "src/pages/admin/team/CreateTeam";
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/createTeam" element={<CreateTeam />} />
            <Route path="/project" element={<ProjectList />} />
            <Route path="/project/:id" element={<ModifyProject />} />
            <Route path="/product/:id" element={<ProductList />} />
            <Route path="/createProduct" element={<CreateProduct />}>
                <Route path="defaultInfo/:type/:id" element={<DefaultInfo />} />
                <Route path="printInfo" element={<PrintInfo />} />
                <Route path="addInfo" element={<AddInfo />} />
            </Route>
            <Route path="/inquiries" element={<Inquiries />}></Route>
        </Routes>
    );
}
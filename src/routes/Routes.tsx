import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "src/pages/main/Main"
export default function CreateRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
            </Route>
        </Routes>
    );
}
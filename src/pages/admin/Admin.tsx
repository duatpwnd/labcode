import {
    Outlet
} from "react-router-dom";
import Navigator from "src/components/navigation/Navigator"
import "./Admin.scoped.scss"
const Admin = () => {
    return (
        <div>
            <Navigator />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default Admin
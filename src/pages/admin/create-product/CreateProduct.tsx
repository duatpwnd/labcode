import { Outlet, NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./CreateProduct.scoped.scss"
const CreateProduct = () => {
    const params = useParams();
    return (
        <main>
            {/* <button className="back-btn"></button> */}
            <div className="wrap">
                <header className="header">
                    <h2 className="h2-title">제품 생성</h2>
                    <nav className="lnb">
                        <ul>
                            <li>
                                <NavLink to={"defaultInfo/" + params.type + "/" + params.id}>기본 정보</NavLink>
                            </li>
                            <li>
                                <NavLink to="addInfo">추가 정보</NavLink>
                            </li>
                            <li>
                                <NavLink to="printInfo">인쇄 정보</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Outlet />
            </div>
        </main>
    )
}
export default CreateProduct
import { Outlet, NavLink, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import "./CreateProduct.scoped.scss"
import { useEffect } from "react";
const CreateProduct = () => {
    const location = useLocation();
    const params = useParams();
    const split = location.pathname.split(`/products/edit/${params.productId}/${params.teamId}/`)
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    return (
        <main style={{ background: split[1] == "productInfo" ? "#F0F1F2" : "white" }}>
            <div className="wrap">
                <header className="header">
                    <h2 className="h2-title">
                        {
                            location.pathname.includes("/products/create") ? "제품 등록" : "제품 수정"
                        }
                    </h2>
                    <nav className="lnb">
                        <ul>
                            <li>
                                <NavLink to={"defaultInfo"}>기본 정보</NavLink>
                            </li>
                            <li className="bar">|</li>
                            <li className="template-info" style={location.pathname.includes("/products/create") ? { pointerEvents: "none" } : { pointerEvents: "auto" }}>
                                <NavLink to={"productInfo?currentPage=1&search="}>템플릿 정보</NavLink>
                            </li>
                            <li className="bar">|</li>
                            {
                                isAdmin && <li style={location.pathname.includes("/products/create") ? { pointerEvents: "none" } : { pointerEvents: "auto" }}>
                                    <NavLink to={"printInfo"}>인쇄 정보</NavLink>
                                </li>

                            }
                        </ul>
                    </nav>
                </header>
                <Outlet />
            </div>
        </main>
    )
}
export default CreateProduct
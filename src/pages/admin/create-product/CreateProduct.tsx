import { Outlet, NavLink, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import "./CreateProduct.scoped.scss"
const CreateProduct = () => {
    const location = useLocation();
    const params = useParams();
    const split = location.pathname.split(`/projects/${params.projectId}/products/${params.productId}/`)
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
                            <li>
                                <NavLink to={"productInfo?currentPage=1&search="}>제품 정보</NavLink>
                            </li>
                            {
                                isAdmin && <li>
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
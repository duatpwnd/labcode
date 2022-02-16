import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import "./CreateProduct.scoped.scss"
const CreateProduct = () => {
    const isAdmin = useSelector((state: RootState) => {
        return state.signIn.userInfo?.user.isAdmin
    })
    return (
        <main>
            <div className="wrap">
                <header className="header">
                    <h2 className="h2-title">제품 생성</h2>
                    <nav className="lnb">
                        <ul>
                            <li>
                                <NavLink to={"defaultInfo"}>기본 정보</NavLink>
                            </li>
                            <li>
                                <NavLink to={"productInfo?page=1&search="}>제품 정보</NavLink>
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
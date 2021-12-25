import "./SignIn.scoped.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInRequest } from "src/actions/signIn"
const SignIn = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(true);
    const signIn = () => {
        console.log("로그인");
        dispatch(signInRequest({ userId: "test", userPw: "test" }))
    }
    return (
        <div className="mask">
            <div className="signin-modal">
                <div>
                    <button className="close-btn" onClick={() => props.setData(false)}></button>
                    <div className="signin-logo"></div>
                    <form className="form">
                        <fieldset>
                            <legend>로그인정보</legend>
                            <input
                                type="text"
                                className="user-id"
                                placeholder="아이디"
                            />
                            <input
                                type="password"
                                className="user-pw"
                                placeholder="비밀번호"
                            />
                            <button type="button" onClick={signIn}>로그인</button>
                        </fieldset>
                    </form>
                    <div className="sub-area">
                        <Link to="">이메일 찾기</Link>
                        <Link to="">비밀번호 찾기</Link>
                        <Link to="">문의하기</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
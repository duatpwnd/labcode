import "./SignIn.scoped.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
const SignIn = (props) => {
    const [data, setData] = useState(true);
    return (
        <div className="mask">
            <div className="signin-modal">
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
                        <button type="button">관리자 로그인</button>
                    </fieldset>
                </form>
                <div className="sub-area">
                    <Link to="">비밀번호 찾기</Link>
                    <Link to="">아이디 찾기</Link>
                    <Link to="">회원가입 찾기</Link>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
import "./SignIn.scoped.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest, signInFail } from "src/actions/signIn"
import { RootState } from "src/reducers";
const SignIn = ({ setData }) => {
    console.log("리랜");
    const dispatch = useDispatch();
    // snaptag_official@snaptag.co.kr
    // Snaptag0911!
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signinError = useSelector((state: RootState) => {
        return state.signIn.signinError
    })
    const reset = () => {
        setData(false);
        setEmail("");
        setPassword("");
        dispatch(signInFail(false))
    }
    const signIn = () => {
        dispatch(signInRequest({ email: email, password: password }));
        reset();
    }
    return (
        <div className="mask">
            <div className="signin-modal">
                <button className="close-btn" onClick={() => { reset(); }}></button>
                <h2 className="signin-title">
                    <strong>랩코드 관리</strong>를 위해<br />
                    로그인해주세요.
                </h2>
                <form className="form">
                    <fieldset>
                        <legend>로그인정보</legend>
                        <input
                            type="text"
                            className="user-id"
                            placeholder="이메일"
                            onChange={({ target: { value } }) => setEmail(value)}
                        />
                        <input
                            type="password"
                            className="user-pw"
                            placeholder="비밀번호"
                            onChange={({ target: { value } }) => setPassword(value)}
                        />
                        {typeof (signinError) === "object" &&
                            <p className="guide-message">아이디 또는 비밀번호가 일치하지 않습니다.</p>
                        }
                        <button type="button" onClick={signIn}>로그인</button>
                    </fieldset>
                </form>
                <div className="sub-area">
                    <Link to="">관리자 서비스 신청하기</Link>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
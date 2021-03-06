import "./SignIn.scoped.scss"
import _ from 'lodash'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest, signInFail } from "src/actions/signIn"
import { RootState } from "src/reducers";
import { emailReg } from 'src/utils/common';
const SignIn = ({ setData }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState("");
    const [passwordValid, setPasswordValid] = useState("");
    const [isShowPassword, setShowPassword] = useState(false)
    const signinError = useSelector((state: RootState) => {
        return state.signIn.signinError
    })
    const userInfo = useSelector((state: RootState) => {
        return state.signIn.userInfo
    })
    const reset = () => {
        setData(false);
        setEmail("");
        setPassword("");
        dispatch(signInFail(false))
    }
    const onKeyPress = (e) => {
        if (e.key == "Enter") {
            signIn()
        }
    }
    const signIn = () => {
        console.log(email, password);
        if (email.trim().length == 0) {
            setEmailValid("올바른 이메일 주소를 입력해주세요.");
            return;
        } else {
            setEmailValid("");
        }
        if (emailReg.test(email) == false) {
            setEmailValid("올바른 이메일 주소를 입력해주세요.");
            return;
        } else {
            setEmailValid("");
        }
        if (password.trim().length == 0) {
            setPasswordValid("8자리 이상 입력해주세요.");
            return;
        } else {
            setPasswordValid("");
        }
        dispatch(signInRequest({ email: email, password: password }));
    }
    return (
        <>
            {
                userInfo == null &&
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
                                <div className="input-area">
                                    <input
                                        type="text"
                                        value={email}
                                        id="email"
                                        className="user-id"
                                        placeholder="이메일"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {
                                        email.length > 0 && <button type="button" onClick={() => setEmail("")} className="delete-btn"></button>
                                    }
                                </div>
                                <p className="guide-message">{emailValid}</p>
                                <div className="input-area">
                                    <input
                                        type={isShowPassword ? "text" : "password"}
                                        id="password"
                                        className="user-pw"
                                        placeholder="비밀번호"
                                        onKeyPress={onKeyPress}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {
                                        password.length > 0 && <button type="button" onClick={() => setShowPassword(!isShowPassword)} className={isShowPassword ? "show-password-btn" : "hide-password-btn"}></button>
                                    }
                                </div>
                                <p className="guide-message">{passwordValid}</p>
                                {/* 서버검증 */}
                                {emailValid == "" && passwordValid == "" && <p className="guide-message">{signinError}</p>}
                                <button type="button" className="submit-btn" onClick={() => signIn()}>로그인</button>
                            </fieldset>
                        </form>
                        <div className="sub-area">
                            <Link to="/inquiries/create" state={{ nav: false }} onClick={reset}>문의하기</Link>
                            <Link to="/teams/create" className="create-team-link" onClick={reset}>신청하기</Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default SignIn;
import "./SignIn.scoped.scss"
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest, signInFail } from "src/actions/signIn"
import { RootState } from "src/reducers";
import _ from 'lodash'
import { emailReg, passwordReg } from 'src/utils/common';
const debounce = _.debounce;
const SignIn = ({ setData }) => {
    const dispatch = useDispatch();
    // snaptag_official@snaptag.co.kr
    // Snaptag0911!
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signinError = useSelector((state: RootState) => {
        return state.signIn.signinError
    })
    const userInfo = useSelector((state: RootState) => {
        return state.signIn.userInfo
    })
    const emailCheck = useMemo(() => {
        if (email.trim().length > 0) {
            return emailReg.test(email);
        }
    }, [email])
    const passwordCheck = useMemo(() => {
        if (password.trim().length > 0) {
            return passwordReg.test(password);
        }
    }, [password])
    const reset = () => {
        setData(false);
        setEmail("");
        setPassword("");
        dispatch(signInFail(false))
    }
    const signIn = (email, password) => {
        if (emailReg.test(email) == false) {
            setEmail(".");
        } else if (passwordReg.test(password) == false) {
            setPassword(".");
        } else {
            if (emailCheck && passwordCheck) {
                dispatch(signInRequest({ email: email, password: password }));
            }

        }
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
                                <input
                                    type="text"
                                    id="email"
                                    className="user-id"
                                    placeholder="이메일"
                                    onChange={debounce((e) => setEmail(e.target.value), 500)}
                                />
                                {
                                    emailCheck == false && <p className="guide-message">이메일이 올바르지 않습니다.</p>

                                }
                                <input
                                    type="password"
                                    id="password"
                                    className="user-pw"
                                    placeholder="비밀번호"
                                    onChange={debounce((e) => setPassword(e.target.value), 500)}
                                />
                                {
                                    passwordCheck == false && <p className="guide-message">비밀번호가 올바르지 않습니다.</p>
                                }

                                {/* 서버검증 */}
                                <p className="guide-message">{signinError}</p>
                                <button type="button" onClick={() => signIn(email, password)}>로그인</button>
                            </fieldset>
                        </form>
                        <div className="sub-area">
                            <Link to="">관리자 서비스 신청하기</Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default SignIn;
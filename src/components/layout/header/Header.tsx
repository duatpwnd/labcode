import styled from "styled-components";
import ConfirmModal from "src/components/common/confirm-modal/ConfirmModal";
import SignIn from 'src/container/signin/SignIn';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { resources, Languages } from "src/lang/i18n"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "src/actions/signIn"
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { RootState } from "src/reducers";
import "./Header.scoped.scss"
const SignIndButton = styled.button`
    border-radius: 8px;
    font-size: 13px;
    color: #525A61;
    background: #DBDFE1;
    font-weight: 700;
    height: 44px;
    width: 111px;
    // @media all and (min-width: 480px) {
    //     &:hover {
    //     background: #D1D6DB;
    //     }
    // }
    @media all and (max-width:360px){
        width: 30vw;
    }
  
`;
const VersionIcon = styled.span`
    color: #5138E5;
    font-size: 12px;
    padding: 4px 8px;
    background: rgba(81, 56, 229, 0.1);
    line-height: 16px;
    border-radius: 4px;
    margin-left:28px;
    position: relative;
    top:35%;
    transform: translateY(-35%);
    @media all and (max-width: 550px) {
        display:none
    }
`
const LangIcon = styled.button`
    color:#525A61;
    vertical-align: middle;
    border-radius: 8px;
    width:84px;
    height: 44px;
    padding:0 20px;
    font-family: Poppins;
    font-size:14px;
    text-align:left;
    font-weight:700;
    margin-left:8px;
    background: url(${require('src/assets/images/lang_ico.svg').default}) #DBDFE1 no-repeat center right 20px /
    16px 16px;
    // @media all and (min-width: 480px) {
    //     &:hover {
    //         background-color:#DBDFE1;
    //     }
    // }
     @media all and (max-width:330px){
        padding:0;
        width:16vw;
        background:#DBDFE1;
        text-align:center;
    }
`


const Header = () => {
    const { i18n, t } = useTranslation();
    const [isActiveConfirmModal, setActiveConfirmModal] = useState(false);
    const [isModal, modalUpdate] = useState(false);
    const [langModal, langModalUpdate] = useState(false);
    const [isActiveUserModal, setUserModal] = useState(false);
    const [lang, langUpdate] = useState("ko");
    const navigate = useNavigate()
    const keys = Object.keys(resources);
    const dispatch = useDispatch();
    const userModal = useRef<HTMLDivElement>(null);
    const langsModal = useRef<HTMLUListElement>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["user_info"]);
    const userInfo = useSelector((state: RootState) => {
        return state.signIn.userInfo
    })
    const handleChangeLanguage = (lang: Languages) => {
        langModalUpdate(false);
        langUpdate(lang);
        i18n.changeLanguage(lang);
    }
    const closeModal = (type: boolean) => {
        modalUpdate(type)
    }
    const logout = () => {
        dispatch(signOut());
        removeCookie("user_info");
        navigate("/");
        setUserModal(false);
        setActiveConfirmModal(false);
    }
    const handleCloseModal = (e) => {
        if (langModal && (!userModal.current?.contains(e.target))) langModalUpdate(false);
        if (isActiveUserModal && (!userModal.current?.contains(e.target))) setUserModal(false);
    }
    useEffect(() => {
        window.addEventListener("click", handleCloseModal)
        return () => {
            window.removeEventListener("click", handleCloseModal);
        }
    }, [isActiveUserModal, langModal])

    return (
        <>
            {
                isActiveConfirmModal && <ConfirmModal title="로그아웃" contents="로그아웃 하시겠습니까?" cancelEvent={setActiveConfirmModal} okEvent={logout} />
            }
            {
                isModal && <SignIn setData={closeModal} />
            }
            <header>

                <div className="header-contents">
                    <h1 className="logo" onClick={() => navigate("/")}>
                        <picture>
                            <source media="(max-width: 479px)" srcSet={require("images/mobile_logo.svg").default} />
                            <img src={require("images/logo.svg").default} alt="LABCODE" title="LABCODE" />
                        </picture>
                    </h1>
                    <VersionIcon>{t('version')}</VersionIcon>
                    <div className="right-buttons" >
                        {
                            userInfo == null ? <SignIndButton onClick={() => { modalUpdate(true) }}>{t('signInBtn')}</SignIndButton> : <img src={require("images/profile_image.svg").default} onClick={() => setUserModal(!isActiveUserModal)} />
                        }

                        <LangIcon onClick={() => langModalUpdate(!langModal)}>{lang}</LangIcon>
                        {langModal &&
                            <ul className="lang-select" ref={langsModal}>
                                {
                                    Object.values(resources).map((langs, index) => <li key={index} className={keys[index] == lang ? "selected" : ""} onClick={() => handleChangeLanguage(keys[index])}>{langs.value}</li>)
                                }
                            </ul>
                        }
                    </div>
                    {
                        isActiveUserModal && <div className="user-modal" ref={userModal}>
                            <b className="user-name">{userInfo?.user.name}</b>
                            <span className="user-email">{userInfo?.user.email}</span>
                            <button className="sign-out-btn" onClick={() => setActiveConfirmModal(true)}>로그아웃</button>
                        </div>

                    }
                </div>
            </header>
        </>
    )
}
export default Header
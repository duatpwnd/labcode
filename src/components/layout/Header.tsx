import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useState } from "react"
import { resources, Languages } from "src/lang/i18n"
import { useMediaQuery } from "react-responsive";
import SignIn from 'src/container/signin/SignIn';
import { useEffect } from "react";
import "./Header.scoped.scss"
const SignIndButton = styled.button`
    border-radius: 8px;
    font-size: 13px;
    color: #525A61;
    background: #E5E5E5;
    font-weight: 700;
    height: 44px;
    width: 76px;
    @media all and (min-width: 480px) {
    &:hover {
      background: #D1D6DB;
    }
}
    @media all and (max-width: 479px) {
        color:#5138E5;
        background:white;
        font-weight:700;
    }
    @media all and (max-width:320px){
        width: 18vw;
    }
  
`;
const VersionIcon = styled.span`
    vertical-align: text-bottom;
    color: #5138E5;
    font-size: 12px;
    padding: 4px 8px;
    background: rgba(81, 56, 229, 0.1);
    align-self: center;
    line-height: 16px;
    border-radius: 4px;
    margin-left:28px;
    @media all and (max-width: 479px) {
        display:none
    }
`
const LangIcon = styled.button`
    vertical-align: middle;
    border-radius: 8px;
    width: 44px;
    height: 44px;
    margin-left:8px;
    background: url(${require('src/assets/images/lang_ico.svg').default}) #E5E5E5 no-repeat center /
    16px 16px;
    @media all and (min-width: 480px) {
        &:hover {
            background-color:#D1D6DB;
        }
    }
    @media all and (max-width: 479px) {
        background-color:white;
    }
`


const Header = () => {
    const { i18n, t } = useTranslation();
    const [isModal, modalUpdate] = useState(false);
    const [langModal, langModalUpdate] = useState(false)
    const [lang, langUpdate] = useState("ko");
    const keys = Object.keys(resources);
    const handleChangeLanguage = (lang: Languages) => {
        langModalUpdate(false);
        langUpdate(lang);
        i18n.changeLanguage(lang);
    }

    const isMobile = useMediaQuery({
        query: "(max-width: 479px)"
    });
    const closeModal = (type: boolean): void => {
        modalUpdate(type)
    }
    useEffect(() => {
        console.log("useeffect", resources);
    }, [])
    return (
        <header>
            {
                isModal && <SignIn setData={closeModal} />
            }
            <div className="header-contents">
                <h1 className="logo">
                    <Link to="/">
                        {isMobile ? <img src={require("src/assets/images/mobile_logo.svg").default} /> : <img src={require("src/assets/images/logo.svg").default} />}
                    </Link>
                </h1>
                <VersionIcon>{t('version')}</VersionIcon>
                <div className="right-buttons">
                    <SignIndButton onClick={() => { modalUpdate(true) }}>{t('signInBtn')}</SignIndButton>
                    <LangIcon onClick={() => langModalUpdate(!langModal)} />
                    {langModal &&
                        <ul className="lang-select">
                            {
                                Object.values(resources).map((langs, index) => <li key={index} className={keys[index] == lang ? "selected" : ""} onClick={() => handleChangeLanguage(keys[index])}>{langs.value}</li>)
                            }
                        </ul>
                    }
                </div>
            </div>
        </header>
    )
}
export default Header
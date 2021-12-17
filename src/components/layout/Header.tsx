import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { useState } from "react"
import { Languages, languages } from "src/lang/i18n"
import { useMediaQuery } from "react-responsive";
import "./Header.scoped.scss"
const SignIndButton = styled.button`
    border-radius: 8px;
    font-size: 13px;
    color: #525A61;
    background: #E5E5E5;
    font-weight: 700;
    height: 44px;
    width: 112px;
    &:hover {
      background: #D1D6DB;
    }
    @media all and (max-width: 479px) {
        color:#5138E5;
        background:white;
        font-weight:700;
        :hover {
            background: white;
          }
    }
    @media all and (max-width:320px){
        width: 35vw;
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

export default function Header() {
    const { t, i18n } = useTranslation();
    const [lang, langUpdate] = useState("ko");
    const isMobile = useMediaQuery({
        query: "(max-width: 479px)"
    });
    const handleChangeLanguage = (lang: Languages) => {
        langUpdate(lang);
        i18n.changeLanguage(lang);
    }
    return (
        <header>
            <div className="header-contents">
                <h1 className="logo">
                    <Link to="/">
                        {isMobile ? <img src={require("src/assets/images/mobile_logo.svg").default} /> : <img src={require("src/assets/images/logo.svg").default} />}

                    </Link>
                </h1>
                <VersionIcon>{t('version')}</VersionIcon>
                <div className="right-buttons">
                    <SignIndButton onClick={() => { alert("준비중입니다.") }}>{t('signInBtn')}</SignIndButton>
                    {
                        lang == "ko" ? <button className="lang-btn" key={lang} onClick={() => handleChangeLanguage("en")}>
                            A
                        </button> : <button className="lang-btn" key={lang} onClick={() => handleChangeLanguage("ko")}>
                            가
                        </button>

                    }
                </div>
            </div>
        </header>
    )
}
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { Languages, languages } from "src/lang/i18n"

import "./Header.scoped.scss"
const SignIndButton = styled.button`
    border-radius: 8px;
    font-size: 13px;
    color: #525A61;
    background: #D1D6DB;
    font-weight: 700;
    height: 40px;
    width: 112px;
    align-self: center;
    &:hover {
      background: #E5E5E5;
    }
`;
export default function Header() {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (lang: Languages) => {
        i18n.changeLanguage(lang);
    }

    return (
        <header>
            <h1 className="logo">
                <Link to="/">
                    <img src={require("src/assets/images/logo.svg").default} />
                </Link>
            </h1>
            {languages.map(lang => (
                <button key={lang} onClick={() => handleChangeLanguage(lang)}>
                    {t(`language_${lang}`)}
                </button>
            ))}
            <SignIndButton onClick={() => { alert("준비중입니다.") }}>관리자 로그인</SignIndButton>
        </header>
    )
}
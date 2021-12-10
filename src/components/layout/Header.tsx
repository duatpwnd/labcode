import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { Languages, languages } from "src/lang/i18n"

import "./Header.scoped.scss"
const SignIndButton = styled.button`
    border-radius: 8px;
    font-size: 13px;
    color: #525A61;
    background: #E5E5E5;
    font-weight: 700;
    height: 40px;
    width: 112px;
    float:right;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    &:hover {
      background: #D1D6DB;
    }
`;
const VersionIcon = styled.span`
    color: #5138E5;
    font-size: 12px;
    padding: 4px 8px;
    background: rgba(81, 56, 229, 0.1);
    align-self: center;
    line-height: 16px;
    border-radius: 4px;
    margin-left:28px;
`
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
            <VersionIcon>{t('version')}</VersionIcon>
            {/* {languages.map(lang => (
                <button key={lang} onClick={() => handleChangeLanguage(lang)}>
                    {t(`language_${lang}`)}
                </button>
            ))} */}
            <SignIndButton onClick={() => { alert("준비중입니다.") }}>{t('signInBtn')}</SignIndButton>
        </header>
    )
}
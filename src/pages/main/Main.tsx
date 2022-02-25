import { useEffect, useRef, useState } from "react"
import Typewriter from 'typewriter-effect';
import "./Main.scoped.scss"
import { useTranslation } from 'react-i18next';
import BounceBalls from "src/components/BounceBalls";
import { useMediaQuery } from "react-responsive";
const AnimatedTypingComponent = () => {
    const { t, i18n } = useTranslation();
    const [arr, arrSet] = useState<string[]>([]);
    console.log(i18n.language)
    useEffect(() => {
        arrSet(t('changeTitle').split(","));
    }, [i18n.language])
    return (
        <h2 className={i18n.language == "en" ? "h2-title lang-en" : "h2-title"}>
            <Typewriter
                options={{
                    delay: 85,
                    deleteSpeed: 1,
                    strings: arr,
                    autoStart: true,
                    loop: true,
                }}
            />
        </h2>
    )
};
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
const LinkButtons = () => {
    const uesrAgent = navigator.userAgent.toLowerCase();
    if (isMobile()) {
        return <div className="btn-wrap">
            {
                uesrAgent.match("iphone") ?
                    <button onClick={() => window.open('https://apps.apple.com/kr/app/lab-code-scanner/id1597455005?app=itunes&ign-mpt=uo%3D4', '_blank')}
                        className={isMobile() ? "btn mobile-apple-download-btn" : "btn apple-download-btn"}

                    ></button>
                    :
                    <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.snaptag.labCode', '_blank')}
                        className={isMobile() ? "btn mobile-google-download-btn" : "btn google-downlo isMobile() &&ad-btn"}
                    ></button>
            }
        </div>
    } else {
        return <div className="btn-wrap">
            <button onClick={() => window.open('https://apps.apple.com/kr/app/lab-code-scanner/id1597455005?app=itunes&ign-mpt=uo%3D4', '_blank')}
                className="btn apple-download-btn"
            ></button>
            <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.snaptag.labCode', '_blank')}
                className="btn google-download-btn"
            ></button>
        </div>
    }
}
export default function Main() {
    const { t, i18n } = useTranslation();
    const bgRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery({
        query: "(max-width: 479px)"
    });
    const innerText = t('fixedTitle').replace(/<br>/gi, " ");
    return (
        <div className="bg" ref={bgRef}>
            <div className="center-area">
                {isMobile ? <h2 className={i18n.language == "en" ? "h2-title lang-en" : "h2-title"} dangerouslySetInnerHTML={{ __html: t('fixedTitle') }}>
                </h2> : <h2 className={i18n.language == "en" ? "h2-title lang-en" : "h2-title"}>
                    {innerText}
                </h2>}
                <AnimatedTypingComponent />
                <h3 className={i18n.language == "en" ? "h3-title lang-en" : "h3-title"}>
                    {t('explain')}
                </h3>
                <LinkButtons />
            </div>
            <BounceBalls bg={bgRef} />
        </div>
    )
}
import { useEffect, useRef, useState } from "react"
import Typewriter from 'typewriter-effect';
import "./Main.scoped.scss"
import { useTranslation } from 'react-i18next';
import BounceBalls from "src/components/BounceBalls";
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
export default function Main() {
    const { t, i18n } = useTranslation();
    const bgRef = useRef<HTMLDivElement>(null);
    const uesrAgent = navigator.userAgent.toLowerCase();
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    useEffect(() => {
        console.log("onmounted");
    }, [])
    return (
        <div className="bg" ref={bgRef}>
            <div className="center-area">
                <h2 className={i18n.language == "en" ? "h2-title lang-en" : "h2-title"}>
                    {t('fixedTitle')}
                </h2>
                <AnimatedTypingComponent />
                <h3 className={i18n.language == "en" ? "h3-title lang-en" : "h3-title"}>
                    {t('explain')}
                </h3>
                <div className="btn-wrap">
                    {
                        uesrAgent.match("iphone") ?
                            <button onClick={() => window.open('https://apps.apple.com/kr/app/lab-code-scanner/id1597455005?app=itunes&ign-mpt=uo%3D4', '_blank')}
                                className={isMobile() ? "btn mobile-apple-download-btn" : "btn apple-download-btn"}

                            ></button>
                            :
                            <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.snaptag.labCode', '_blank')}
                                className={isMobile() ? "btn mobile-google-download-btn" : "btn google-download-btn"}
                            ></button>
                    }
                </div>
            </div>
            <BounceBalls bg={bgRef} />
        </div>
    )
}
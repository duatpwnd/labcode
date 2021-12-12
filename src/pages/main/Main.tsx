import { useEffect, useRef, useState } from "react"
import Typewriter from 'typewriter-effect';
import "./Main.scoped.scss"
import { useTranslation } from 'react-i18next';
import { debounce } from "lodash"
import Test from "src/components/Test";
const AnimatedTypingComponent = () => {
    const { t, i18n } = useTranslation();
    const [arr, arrSet] = useState<string[]>([]);
    useEffect(() => {
        arrSet(t('changeTitle').split(","));
    }, [i18n.language])
    return (
        <h2 className="h2-title">
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
    const { t } = useTranslation();
    useEffect(() => {
        console.log("onmounted");
    }, [])
    return (
        <div className="bg">
            <div className="center-area">
                <h2 className="h2-title">
                    {t('fixedTitle')}
                </h2>
                <AnimatedTypingComponent />
                <h3 className="h3-title">
                    {t('explain')}
                </h3>
                <div className="btn-wrap">
                    <button onClick={() => window.open('https://apps.apple.com/kr/app/lab-code-scanner/id1597455005?app=itunes&ign-mpt=uo%3D4', '_blank')}
                        className="btn apple-download-btn"></button>
                    <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.snaptag.labCode', '_blank')} className="btn google-download-btn"></button>
                </div>
            </div>
            <Test />
        </div>
    )
}
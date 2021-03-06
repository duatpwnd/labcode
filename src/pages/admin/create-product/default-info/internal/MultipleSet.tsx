import { useEffect, useState } from "react"
import "../DefaultInfo.scoped.scss"
const MultipleSet = ({ eventHandler }) => {
    const [scaleRangeMin, setScaleRangeMin] = useState(false);
    const [scaleRangeMax, setScaleRangeMax] = useState(false);
    const [scaleJump, setScaleJump] = useState(false);
    const [alphaRangeMin, setAlphaRangeMin] = useState(false);
    const [alphaRangeMax, setAlphaRangeMax] = useState(false);
    const [alphaJump, setAlphaJump] = useState(false);
    const setRange = (e) => {
        console.log(e.target.id);
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        eventHandler((prev) => {
            return ({ ...prev, [e.target.id]: e.target.value })
        })
        if (e.target.id == "alphaMin") {
            if (Number(e.target.value) < 2) {
                setAlphaRangeMin(true);
                eventHandler((prev) => {
                    return ({ ...prev, [e.target.id]: undefined })
                })
            } else {
                setAlphaRangeMin(false);
            }
        }
        if (e.target.id == "alphaMax") {
            if (Number(e.target.value) < 2) {
                setAlphaRangeMax(true);
                eventHandler((prev) => {
                    return ({ ...prev, [e.target.id]: undefined })
                })
            } else {
                setAlphaRangeMax(false);
            }
        }
        if (e.target.id == "scaleMin") {
            if (Number(e.target.value) < 1) {
                setScaleRangeMin(true);
                eventHandler((prev) => {
                    return ({ ...prev, [e.target.id]: undefined })
                })
            } else {
                setScaleRangeMin(false);
            }
        }
        if (e.target.id == "scaleMax") {
            if (Number(e.target.value) < 1) {
                setScaleRangeMax(true);
                eventHandler((prev) => {
                    return ({ ...prev, [e.target.id]: undefined })
                })
            } else {
                setScaleRangeMax(false);
            }
        }
        if (e.target.id == "scaleSkip") {
            if ((Number(e.target.value) < 1 || Number(e.target.value) > 100)) {
                setScaleJump(true);
                eventHandler((prev) => {
                    return ({ ...prev, [e.target.id]: undefined })
                })
            } else {
                setScaleJump(false);
            }
        }
        if (e.target.id == "alphaSkip") {
            if ((Number(e.target.value) < 1 || Number(e.target.value) > 100)) {
                setAlphaJump(true);
                eventHandler((prev) => {
                    return ({ ...prev, [e.target.id]: undefined })
                })
            } else {
                setAlphaJump(false);
            }
        }

    }
    useEffect(() => {
        console.log("????????????");
    }, [])
    return (
        <>
            <div className="row">
                <label htmlFor="scale-range">Scale ??????</label>
                <div className="scale-range">
                    <input type="tel" id="scaleMin" placeholder="?????????" onChange={(e) => { setRange(e) }} />
                    <span className="wave-ico">~</span>
                    <input type="text" id="scaleMax" placeholder="?????????" onChange={(e) => { setRange(e) }} />
                </div>
                {
                    scaleRangeMin && <p className="warn-message">1?????? ????????? ??????????????????.</p>
                    // scaleRangeMax && <p className="warn-message">1?????? 100????????? ????????? ??????????????????.</p>
                }
            </div>
            <div className="row">
                <label htmlFor="scaleSkip">Scale jump</label>
                <input type="text" id="scaleSkip" placeholder="?????? ??????" onChange={(e) => { setRange(e) }} />
                {
                    scaleJump && <p className="warn-message">1?????? 100????????? ????????? ??????????????????.</p>
                }
            </div>
            <div className="row">
                <label htmlFor="alpha-range">Alpha ??????</label>
                <div className="alpha-range">
                    <input type="text" id="alphaMin" placeholder="?????????" onChange={(e) => { setRange(e) }} />
                    <span className="wave-ico">~</span>
                    <input type="text" id="alphaMax" placeholder="?????????" onChange={(e) => { setRange(e) }} />
                </div>
                {
                    alphaRangeMin && <p className="warn-message">2?????? ????????? ??????????????????.</p>
                    // alphaRangeMax && <p className="warn-message">2?????? 100????????? ????????? ??????????????????.</p>
                }
            </div>

            <div className="row">
                <label htmlFor="alphaSkip">Alpha jump</label>
                <input type="text" id="alphaSkip" onChange={(e) => { setRange(e) }} placeholder="?????? ??????" />
                {
                    alphaJump && <p className="warn-message">1?????? 100????????? ????????? ??????????????????.</p>
                }
            </div>
        </>
    )
}
export default MultipleSet
import { useEffect, useState } from "react"
import "./SingleSet.scoped.scss"
const AlphaAndScaleButton = ({ inputs, id, scales, eventHandler, isAdmin }) => {
    const [message, setMessage] = useState("");
    const onChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (Number(e.target.value) > scales.range.max || Number(e.target.value) < scales.range.min) {
            setMessage(scales.range.min + " 이상 " + scales.range.max + " 이하의 숫자를 입력해주세요.")
        } else {
            setMessage("");
        }
        eventHandler({ ...inputs, [id]: e.target.value })
    }
    return (
        <div className="slide-bar-container">
            {
                isAdmin &&
                <input type="tel" className="numeric-input" value={inputs[id]} maxLength={3} onChange={(e) => onChange(e)} />
            }
            <div className="slide-bar">
                {
                    scales.options && scales.options.map((obj, index) => {
                        return (
                            (() => {
                                if (index === 0)
                                    return (
                                        <button key={index}
                                            onClick={() => { eventHandler({ ...inputs, [id]: obj.value }); }}
                                            className={inputs[id] >= scales.range.min && inputs[id] <= obj.value ? "selected" : ""}>
                                            {obj.label}{obj.value}
                                        </button>
                                    );
                                else if (index > 0 && index < scales.options.length - 1)
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => { eventHandler({ ...inputs, [id]: obj.value }); }}
                                            className={inputs[id] >= ((scales.options[index - 1].value + obj.value) / 2) && inputs[id] < ((scales.options[index + 1].value + obj.value) / 2) ? "selected" : ""}>
                                            {obj.label}{obj.value}
                                        </button>
                                    )
                                else {
                                    return (
                                        <button key={index} onClick={() => { eventHandler({ ...inputs, [id]: obj.value }); }}
                                            className={inputs[id] >= ((scales.options[index - 1].value + obj.value) / 2) && inputs[id] <= scales.range.max ? "selected" : ""}>
                                            {obj.label}{obj.value}
                                        </button>
                                    )
                                }
                            })()
                        )
                    })
                }
            </div>
            <p className="warn-message">{message}</p>
        </div>
    )
}
const SingleSet = ({ isAdmin, inputs, scales, alphas, eventHandler }) => {
    useEffect(() => {
    }, [])
    return (
        <>
            <div className="row">
                <label htmlFor="scale" className="scale">코드 크기</label>
                <AlphaAndScaleButton id="scale" isAdmin={isAdmin} inputs={inputs} scales={scales} eventHandler={eventHandler} />
            </div>
            <div className="row">
                <label htmlFor="alpha" className="alpha">적용 세기</label>
                <AlphaAndScaleButton id="alpha" isAdmin={isAdmin} inputs={inputs} scales={alphas} eventHandler={eventHandler} />
            </div>
        </>
    )
}
export default SingleSet
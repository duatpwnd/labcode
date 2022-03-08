import { useEffect, useState } from "react"


const ControlButton = ({ arr, inputs, eventHandler, id }) => {
    const [scale, setScale] = useState(0);
    const [position, setPosition] = useState(-10000000);
    const onChange = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        const toNumber = Number(e.target.value);
        if (toNumber >= 2 && toNumber <= 4) {
            setPosition((toNumber - 2) * 10)
        } else if (toNumber >= 5 && toNumber <= 12) {
            setPosition(toNumber * 5)
        } else if (toNumber >= 13 && toNumber <= 20) {
            setPosition((((toNumber - 12) * 2.5) + 60));
        } else {
            setPosition(-10000000);
        }
        setScale(toNumber);
        eventHandler({ ...inputs, [id]: toNumber })

    }
    useEffect(() => {
    }, [])
    return (
        <div className="control-btn-wrap">
            {arr.length == 5 && <input type="tel" className="numeric-input" value={inputs[id]} maxLength={2} onChange={(e) => onChange(e)} />}
            <div className="control">
                <span style={{ left: position + "%" }}>{scale}</span>
                {
                    arr.map((el, index) => <button style={{ width: arr.length == 5 ? "20%" : "33.333%" }} onClick={() => { eventHandler({ ...inputs, [id]: el.size }); setPosition(-10000000); }} key={index} className={el.size == inputs[id] ? "selected" : ""}>{el.size}</button>)
                }
            </div>
        </div>
    )
}
const Internal = () => {
    return (
        <div></div>
    )
}
export default Internal
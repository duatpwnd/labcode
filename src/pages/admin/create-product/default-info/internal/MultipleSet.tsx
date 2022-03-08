import { useEffect } from "react"
import "../DefaultInfo.scoped.scss"
const MultipleSet = ({ eventHandler }) => {
    useEffect(() => {
        console.log("복수설정");
    }, [])
    return (
        <>
            <div className="row">
                <label htmlFor="scale-range">Scale 범위</label>
                <div className="scale-range">
                    <input type="text" placeholder="최소값" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); }} />
                    <span className="wave-ico">~</span>
                    <input type="text" placeholder="최대값" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); }} />
                </div>
            </div>
            <div className="row">
                <label htmlFor="scale-jump">Scale jump</label>
                <input type="text" placeholder="숫자 입력" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); }} />
            </div>
            <div className="row">
                <label htmlFor="alpha-range">Alpha 범위</label>
                <div className="alpha-range">
                    <input type="text" placeholder="최소값" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); }} />
                    <span className="wave-ico">~</span>
                    <input type="text" placeholder="최대값" onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); }} />
                </div>
            </div>

            <div className="row">
                <label htmlFor="alpha-jump">Alpha jump</label>
                <input type="text" placeholder="숫자 입력" />
            </div>
        </>
    )
}
export default MultipleSet
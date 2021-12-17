import { useEffect } from "react"
import "./BaseSelect.scoped.scss"
const BaseSelect = ({ option }) => {
    useEffect(() => {
        console.log("option", option);
    }, [])
    return (
        <div className="select">
            <select>
                {
                    option.map((el) => <option>{el}</option>)
                }
            </select>
        </div>
    )
}
export default BaseSelect
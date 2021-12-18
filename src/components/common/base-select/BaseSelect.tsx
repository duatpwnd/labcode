import "./BaseSelect.scoped.scss"
const BaseSelect = ({ eventHandler, children }) => {
    return (
        <div className="select" >
            <select onChange={eventHandler}>
                {children}
            </select>
        </div>
    )
}
export default BaseSelect
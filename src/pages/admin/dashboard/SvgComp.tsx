import { useEffect } from "react";
import "./SvgComp.scoped.scss"
const MyComponent = () => {
    useEffect(() => {
    }, []);
    return (
        <div className="wrap">
            <span className="abox">
            </span>
            <span className="bbox">
            </span>
        </div>
    );
}

export default MyComponent;
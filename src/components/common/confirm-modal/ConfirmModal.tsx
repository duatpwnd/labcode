import "./ConfirmModal.scoped.scss"
import { useNavigate } from "react-router-dom";
const ConfirmModal = ({ title, contents, cancelEvent, okEvent }: any) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="mask"></div>
            <div className="confirm-modal">
                <h2 className="h2-title">{title}</h2>
                <p className="contents">{contents}</p>
                <div className="btn-wrap">
                    <button className="cancel-btn" onClick={() => cancelEvent()}>취소</button>
                    <button className="confirm-btn" onClick={() => { okEvent(); }}>확인</button>
                </div>
            </div>
        </>
    )
}
export default ConfirmModal
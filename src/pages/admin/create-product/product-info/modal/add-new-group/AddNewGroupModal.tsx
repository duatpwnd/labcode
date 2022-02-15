import "./AddNewGroupModal.scoped.scss"
import _ from 'lodash';

const AddNewGroupModal = ({ children, closeModal }) => {
    return (
        <>
            <div className="mask"></div>
            <div className="modal">
                <div className="header">
                    <h2 className="h2-title">새 그룹 추가</h2>
                    <p className="guide-message">새 그룹을 추가하면 다른 제품 정보를 생성할 때 저장했던 그룹을 불러와 사용할 수 있습니다.</p>
                </div>
                {children}
                <div className="footer">
                    <button className="cancel-btn" onClick={() => closeModal(false)}>취소</button>
                    <button className="save-btn">선택 그룹 저장</button>
                </div>
            </div>
        </>
    )
}
export default AddNewGroupModal
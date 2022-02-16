import "./AddNewGroupModal.scoped.scss"
import _ from 'lodash';
import axios from "axios";
import apiUrl from "src/utils/api";
import { ProductList } from "../../ProductInfo";
const AddNewGroupModal = ({ closeModal, data }) => {
    const saveGroup = () => {
        console.log(data);
        axios.post(apiUrl.productInfosGroups, {
            teamId: 1,
            productId: 1,
            title: "정보 그룹명",
            productInfoIds: [
                1,
                2
            ]
        }).then((result) => {
            console.log("그룹저장결과:", result);
        })
    }
    return (
        <>
            <div className="mask"></div>
            <div className="modal">
                <div className="header">
                    <h2 className="h2-title">새 그룹 추가</h2>
                    <p className="guide-message">새 그룹을 추가하면 다른 제품 정보를 생성할 때 저장했던 그룹을 불러와 사용할 수 있습니다.</p>
                </div>
                {/* <ProductList data={data} /> */}
                <div className="footer">
                    <button className="cancel-btn" onClick={() => closeModal(false)}>취소</button>
                    <button className="save-btn">선택 그룹 저장</button>
                </div>
            </div>
        </>
    )
}
export default AddNewGroupModal
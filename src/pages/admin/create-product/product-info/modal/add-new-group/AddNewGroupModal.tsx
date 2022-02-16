import "./AddNewGroupModal.scoped.scss"
import _ from 'lodash';
import axios from "axios";
import apiUrl from "src/utils/api";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "src/App";
import { ProductList } from "../../ProductInfo";
const AddNewGroupModal = ({ data, setPage, searchProductList, closeModal }) => {
    const [checked, setChecked] = useState([]);
    const { teamId } = useContext(AppContext).user;
    const params = useParams();
    const saveGroup = () => {
        axios.post(apiUrl.productInfosGroups, {
            teamId: teamId,
            productId: params.productId,
            title: "정보 그룹명",
            productInfoIds: checked,
        }).then((result) => {
            console.log("그룹저장결과:", result);
            closeModal(false);
        })
    }
    const elementScrollDetect = (element) => {
        const { target } = element;
        if (target.clientHeight + Math.ceil(target.scrollTop) >= target.scrollHeight) {
            setPage(prevState => prevState + 1)
        }
    }
    return (
        <>
            <div className="mask"></div>
            <div className="modal">
                <div className="header">
                    <h2 className="h2-title">새 그룹 추가</h2>
                    <p className="guide-message">새 그룹을 추가하면 다른 제품 정보를 생성할 때 저장했던 그룹을 불러와 사용할 수 있습니다.</p>
                </div>
                <div className="product-info-container" onScroll={elementScrollDetect}>
                    <ProductList
                        setChecked={setChecked}
                        data={data}
                        setPage={setPage}
                        searchProductList={searchProductList}
                        type="modal"
                    />
                </div>
                <div className="footer">
                    <button className="cancel-btn" onClick={() => closeModal(false)}>취소</button>
                    <button className="save-btn" onClick={saveGroup}>선택 그룹 저장</button>
                </div>
            </div>
        </>
    )
}
export default AddNewGroupModal
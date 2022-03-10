import "./AddNewGroupModal.scoped.scss"
import _ from 'lodash';
import axios from "axios";
import apiUrl from "src/utils/api";
import toast from 'react-hot-toast';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { ProductList } from "../../ProductInfo";
// 전체 체크 박스
const AllCheckbox = ({ data, checked, setChecked }) => {
    const allCheck = (e) => {
        setChecked([])
        if (e.target.checked) {
            data.map((list) => {
                setChecked(prev => [...prev, list.id])
            })
        }
    }
    return (
        <th>
            <input type="checkbox" id="allCheck" checked={data && data.length == checked.length ? true : false} onChange={(e) => allCheck(e)} />
            <label htmlFor="allCheck"></label>
        </th>
    )
}
// 체크박스
const CheckBox = ({ id, index, checked, setChecked }: any) => {
    const checkHandler = (e, id) => {
        const isSelected = checked.includes(id);
        if (isSelected) {
            setChecked([...checked.filter(item => item != id)]);
        } else {
            setChecked(prev => [...prev, id]);
        }
    };
    return <td>
        <input type="checkbox" id={`checkbox${index}`} checked={checked.includes(id) ? true : false} onChange={(e) => checkHandler(e, id)} />
        <label htmlFor={`checkbox${index}`}></label>
    </td>
}
// 제목 검색 인풋
const InputTitle = ({ setTitle }) => {
    // 인풋활성
    const inActiveInput = (e) => {
        e.target.style.border = "1px solid #f6f7f8";
    }
    // 인풋 비활성
    const activeInput = (e) => {
        e.target.style.border = "1px solid #5138e5"
    }
    return (
        <input type="text" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={(e) => setTitle(e.target.value)}
            className="group-title-input" placeholder="새 그룹 제목 입력" />
    )
}
const AddNewGroupModal = ({ data, SearchBar, setPage, closeModal }) => {
    const [checked, setChecked] = useState([]);
    const userInfo = useSelector((state: RootState) => {
        return state.signIn.userInfo
    })

    const [title, setTitle] = useState("");
    const params = useParams();
    const saveGroup = () => {
        console.log("checked", checked);
        toast.dismiss();
        if (checked.length == 0) {
            toast.error("그룹을 선택해주세요.")
        } else if (title.trim().length == 0) {
            toast.error("제목을 입력해주세요.")
        } else {
            axios.post(apiUrl.productInfosGroups, {
                teamId: userInfo?.user.teamId,
                productId: params.productId,
                title: title,
                productInfoIds: checked,
            }).then((result) => {
                console.log("그룹저장결과:", result);
                closeModal(false);
            })
        }
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
                        InputTitle={<InputTitle setTitle={setTitle} />}
                        AllCheckbox={
                            <AllCheckbox data={data} setChecked={setChecked} checked={checked} />
                        }
                        colgroup={
                            <colgroup>
                                <col width="68px" />
                                <col width="172px" />
                                <col width="148px" />
                                <col width="262px" />
                            </colgroup>
                        }
                        SearchBar={SearchBar}
                        Checkbox={
                            <CheckBox setChecked={setChecked} checked={checked} />
                        }
                        setChecked={setChecked}
                        data={data}
                        setPage={setPage}
                        type="modal" />
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
import "./BringtGroupModal.scoped.scss"
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import _ from 'lodash';
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "src/utils/api";
const debounce = _.debounce;
const SearchInput = styled.input`
    box-sizing:border-box;
    font-size:18px;
    width:calc(100% - 24px);
    overflow:hidden;
    text-overflow:ellipsis;
`
const SearchButton = styled.button`
    width:24px;
    height:24px;
    vertical-align:middle;
    background: url(${require('images/search_ico.svg').default}) no-repeat center center /
    24px 24px;
`

const BringGroupModal = ({ setBringGroupModal, setProductList }) => {
    const params = useParams();
    const [selectedValue, setSelect] = useState("");
    const [{ data, meta }, setGroupList] = useState<{ [key: string]: any }>({});
    // 제품 정보 그룹 조회
    const getProductInfoGroups = () => {
        axios.get(apiUrl.productInfosGroups + `?productId=${params.productId}`).then((result) => {
            console.log("제품정보그룹리스트:", result);
            setGroupList(result.data);
        })
    }
    // 제품 정보 그룹 삭제
    const deleteProductGroupInfos = (id) => {
        axios.delete(apiUrl.productInfosGroups + `/${id}`).then((result) => {
            console.log('제품 정보 그룹 삭제 결과', result);
            getProductInfoGroups();
        })
    }
    const bringGroup = () => {
        axios.post(apiUrl.productInfosGroups + `/${selectedValue}/transfer/${params.productId}`).then((result) => {
            console.log("그룹불러오기결과", result);
            setBringGroupModal(false);
            setProductList((prev) => [...prev, ...result.data.data])
        })
    }
    useEffect(() => {
        getProductInfoGroups();
    }, [])
    return (
        <>
            <div className="mask">
            </div>
            <div className="modal">
                <div className="header">
                    <h2 className="h2-title">그룹 불러오기</h2>
                    <p className="guide-message">저장했던 제품 정보 그룹 불러와서 사용할 수 있습니다.</p>
                </div>
                <div className="body">
                    <div className="search-area">
                        <SearchInput placeholder="그룹 제목 검색"
                            onChange={(e) => ""} />
                        <SearchButton />
                    </div>
                    <div className="group-list">
                        {
                            data &&
                            data.map((list, index) => {
                                return (
                                    <div key={index} className="list">
                                        <input type="radio" id={`radio${index}`} value={list.id} name="group" onChange={(e) => setSelect(e.target.value)} />
                                        <label htmlFor={`radio${index}`}><span className="ball"></span><span className="title">{list.title}</span></label>
                                        <button className="delete-btn" onClick={() => deleteProductGroupInfos(list.id)}>삭제</button>
                                        <button className="slide-btn"></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="footer">
                    <button className="import-group-btn" onClick={bringGroup}>그룹 불러오기</button>
                </div>
            </div>
        </>
    )
}
export default BringGroupModal
import "./BringtGroupModal.scoped.scss"
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import _ from 'lodash';
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "src/utils/api";
import { ProductList } from "../../ProductInfo";
const debounce = _.debounce;
const SearchInput = styled.input`
    box-sizing:border-box;
    font-size:18px;
    width:calc(100% - 44px);
    overflow:hidden;
    text-overflow:ellipsis;
    font-weight:700;
    height: 60px;
    padding:0 20px;
    line-height: 60px;  
    caret-color: #5138e5;
    &::placeholder{
        color:#9EA7AD;
    }
`
const SearchButton = styled.button`
    width:24px;
    height:24px;
    vertical-align:middle;
    background: url(${require('images/search_ico.svg').default}) no-repeat center center /
    24px 24px;
`

const SlideMenu = ({ list, index, getProductInfoGroups, setSelect }) => {
    const [isActiveSlideMenu, setSlideMenu] = useState(false);
    // 제품 정보 그룹 삭제
    const deleteProductGroupInfos = (id) => {
        axios.delete(apiUrl.productInfosGroups + `/${id}`).then((result) => {
            console.log('제품 정보 그룹 삭제 결과', result);
            getProductInfoGroups();
        })
    }

    return (
        <>
            <div className="dt-list">
                <input type="radio" id={`radio${index}`} value={list.id} name="group" onChange={(e) => setSelect(e.target.value)} />
                <label htmlFor={`radio${index}`}><span className="ball"></span><span className="title">{list.title}</span></label>
                <button className="delete-btn" onClick={() => deleteProductGroupInfos(list.id)}>삭제</button>
                <button className="slide-btn" onClick={() => setSlideMenu(!isActiveSlideMenu)} style={{ backgroundImage: isActiveSlideMenu ? `url(${require("images/slide_ico_on.svg").default})` : `url(${require("images/slide_ico_off.svg").default})` }}
                ></button>
            </div>
            {
                isActiveSlideMenu && <ProductList colgroup={<colgroup>
                    <col width="172px" />
                    <col width="148px" />
                    <col width="337px" />
                </colgroup>} type="modal" data={list.productInfos} />

            }
        </>
    )
}
const BringGroupModal = ({ setBringGroupModal, setProductList }) => {
    const params = useParams();
    const [selectedValue, setSelect] = useState("");
    const [{ data, meta }, setGroupList] = useState<{ [key: string]: any }>({});

    const bringGroup = () => {
        axios.post(apiUrl.productInfosGroups + `/${selectedValue}/transfer/${params.productId}`).then((result) => {
            console.log("그룹불러오기결과", result);
            setBringGroupModal(false);
            // 불러온 그룹 추가시켜주기
            setProductList((prev) => [...prev, ...result.data.data])
        })
    }
    // 제품 정보 그룹 조회
    const getProductInfoGroups = () => {
        axios.get(apiUrl.productInfosGroups + `?productId=${params.productId}`).then((result) => {
            console.log("제품정보그룹리스트:", result);
            setGroupList(result.data);
        })
    }
    useEffect(() => {
        getProductInfoGroups();
    }, [])
    return (
        <>
            <div className="mask" onClick={() => setBringGroupModal(false)}>
            </div>
            <div className="modal">
                <div className="header">
                    <h2 className="h2-title">그룹 불러오기</h2>
                    <p className="guide-message">저장했던 제품 정보 그룹 불러와서 사용할 수 있습니다.</p>
                </div>
                <div className="body">
                    <div className="search-area" onBlur={(e) => {
                        e.currentTarget.style.border = "1px solid #f6f7f8";
                    }}
                        onClick={(e) => {
                            e.currentTarget.style.border = "1px solid #5138e5";
                        }}>
                        <SearchInput placeholder="그룹 제목 검색"
                            onChange={(e) => ""} />
                        <SearchButton />
                    </div>
                    <div className="group-list-container">
                        {
                            data &&
                            data.map((list, index) => {
                                return (
                                    <div className="group-list" key={index}>
                                        <SlideMenu setSelect={setSelect} getProductInfoGroups={getProductInfoGroups} list={list} index={index} />
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
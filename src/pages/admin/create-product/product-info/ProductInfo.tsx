import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";
import apiUrl from "src/utils/api";
import CalendarComp from "src/components/common/calendar/Calendar"
import BringGroupModal from "./modal/bring-group/BringGroupModal";
import AddNewGroupModal from "./modal/add-new-group/AddNewGroupModal";
import "./ProductInfo.scoped.scss"
import _ from 'lodash';
import history from "src/utils/history";
const debounce = _.debounce;
const DatePickerWrapperStyles = createGlobalStyle`
    .react-datepicker-wrapper{
        width:150px;
        background: #f6f7f8;
        border-radius: 4px;
        .react-datepicker__input-container{
            input{
                background: url(${require('images/calender_ico.svg').default}) no-repeat center right 4px /
                28px 28px;
                padding: 9px 16px;
                border: 1px solid #f6f7f8;
                pointer-events: ${props => props["pointer-events"]}
            }
        }
    }
`;
const SearchInput = styled.input`
    box-sizing:border-box;
    font-size:18px;
    width:calc(100% - 24px);
    overflow:hidden;
    text-overflow:ellipsis;
    font-weight:700;
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
const SelectBox = ({ type, id, modifyProductInfos }) => {
    const [selectedIndex, setIndex] = useState("텍스트");
    const [isActiveModal, setModal] = useState(false);
    const types = [{ text: "텍스트", value: 'text' }, { text: '숫자', value: 'number' }, { text: "참,거짓", value: 'boolean' }, { text: "URL", value: 'url' }, { text: "날짜", value: 'date' }, { text: "이미지", value: 'image' },]
    const selectBox = useRef<HTMLDivElement>(null);
    // 리스트 선택
    const select = (value) => {
        setModal(false) // 모달닫기
        // 현재 선택되어있는데 또다시 선택했을때 호출못하게
        if (selectedIndex != value) {
            setIndex(value); // 모달안에 선택된 리스트 활성화
            modifyProductInfos({ target: { id: "type", value: value } }, id);
        }
    };
    const handleCloseModal = (e) => {
        if (isActiveModal && (!selectBox.current?.contains(e.target))) setModal(false);

    }
    useEffect(() => {
        window.addEventListener("click", handleCloseModal)
        return () => {
            window.removeEventListener("click", handleCloseModal);
        }
    }, [isActiveModal])

    useEffect(() => {
        setIndex(type);

    }, [])
    return (
        <div className="select-box">
            <div className={isActiveModal ? "tab active-tab" : "tab"} onClick={() => setModal(!isActiveModal)} style={{ backgroundImage: isActiveModal ? `url(${require("images/active_arrow_top.svg").default})` : `url(${require("images/arrow_bottom.svg").default})` }}>
                {
                    types.map((elements, index) => {
                        return (
                            type == elements.value &&
                            <span className="type" key={index}>{elements.text}</span>
                        )
                    })
                }
            </div>
            {isActiveModal &&
                <div className="list-wrap" ref={selectBox}>
                    {
                        types.map((elements, index) => {
                            return (
                                <div key={index} className={elements.value == selectedIndex ? "list selected" : "list"} onClick={() => { select(elements.value) }}>
                                    <span className="type">{elements.text}</span>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div >
    )
}
export const ProductList = ({ getProductInfos, data, type, searchProductList, setPage, setChecked }: any) => {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('search');

    // 제품정보수정
    const modifyProductInfos = (e, id) => {
        let data;
        // e가 string이면 날짜임
        if (typeof e === "string") {
            data = {
                "date": e
            }
        } else {
            data = { [e.target.id]: e.target.value }
        }
        axios.patch(apiUrl.productInfos + `/${id}`, data).then((result) => {
            console.log("제품정보수정결과:", result);
            getProductInfos();
        });
    }
    // 인풋활성
    const inActiveInput = (e) => {
        e.target.style.border = "1px solid #f6f7f8";
    }
    // 인풋 비활성
    const activeInput = (e) => {
        e.target.style.border = "1px solid #5138e5"
    }
    // 제품정보삭제
    const deleteProductInfos = (id) => {
        axios.delete(apiUrl.productInfos + `/${id}`).then((result) => {
            console.log('제품삭제결과', result);
            getProductInfos();
        })
    }
    const allCheck = (e) => {
        if (e.target.checked) {
            data.map((list) => {
                setCheckedItems(prev => [...prev, list.id])
                setChecked(prev => [...prev, list.id])
            })
        } else {
            setCheckedItems([]);
            setChecked([])
        }
    }
    const checkHandler = (e, id) => {
        const isSelected = checkedItems.includes(id);
        if (isSelected) {
            setCheckedItems([...checkedItems.filter(item => item != id)]);
            setChecked([...checkedItems.filter(item => item != id)]);
        } else {
            setCheckedItems(prev => [...prev, id]);
            setChecked(prev => [...prev, id]);
        }
    };
    const elementScrollDetect = (element) => {
        const { target } = element;
        if (target.clientHeight + Math.ceil(target.scrollTop) >= target.scrollHeight) {
            setPage(prevState => prevState + 1)
        }
    }
    return (
        <div className="product-info-container" style={{ padding: type == "modal" ? "0px 40px 20px 40px" : "0" }} onScroll={elementScrollDetect}>
            <div className="search-area">
                <SearchInput defaultValue={keyword} placeholder="새 그룹 제목 입력"
                    onChange={debounce((e) => searchProductList(e.target.value), 300)}
                />
                <SearchButton />
            </div>
            <div className="table-wrap" >
                <table>
                    {
                        type == "modal" ? <colgroup>
                            <col width="68px" />
                            <col width="172px" />
                            <col width="148px" />
                            <col width="268px" />
                        </colgroup> : <colgroup>
                            <col width="172px" />
                            <col width="148px" />
                            <col width="417px" />
                            <col width="100px" />
                        </colgroup>
                    }
                    <thead>
                        <tr>
                            {
                                type == "modal" &&
                                <th>
                                    <input type="checkbox" id="allCheck" checked={data && data.length == checkedItems.length ? true : false} onChange={(e) => allCheck(e)} />
                                    <label htmlFor="allCheck"></label>
                                </th>
                            }
                            <th>
                                제목
                            </th>
                            <th>
                                타입
                            </th>
                            <th>
                                값
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data &&
                            data.map((list, index) => {
                                return (
                                    <tr key={index}>
                                        {
                                            type == "modal" &&
                                            <td>
                                                <input id={`checkbox${index}`} type="checkbox" checked={checkedItems.includes(list.id) ? true : false} onChange={(e) => checkHandler(e, list.id)} />
                                                <label htmlFor={`checkbox${index}`}></label>
                                            </td>
                                        }
                                        <td>
                                            <input type="text" disabled={type == "modal"} placeholder="제목 입력" id="title" defaultValue={list.title} onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                            ), 200)} />
                                        </td>
                                        <td style={{ pointerEvents: type == "modal" ? "none" : "auto" }}>
                                            <SelectBox id={list.id} type={list.type} modifyProductInfos={modifyProductInfos} />
                                        </td>
                                        <td >
                                            {
                                                (() => {
                                                    if (list.type == "text") {
                                                        return <input type="text" disabled={type == "modal"} defaultValue={list.text} id="text" placeholder="텍스트 입력" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                                        ), 200)} />
                                                    }
                                                    else if (list.type == "number") {
                                                        return <input type="number" disabled={type == "modal"} defaultValue={list.number} id="number" placeholder="숫자 입력" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                                        ), 200)} />
                                                    } else if (list.type == "boolean") {
                                                        return <div className="boolean-area">
                                                            <button className={list.boolean || list.boolean == null ? "true-btn selected" : "true-btn"} disabled={type == "modal"} onClick={() => modifyProductInfos({ target: { id: 'boolean', value: true } }, list.id)}>참</button>
                                                            <button className={list.boolean == false ? "false-btn selected" : "false-btn"} disabled={type == "modal"} onClick={() => modifyProductInfos({ target: { id: 'boolean', value: false } }, list.id)}>거짓</button>
                                                        </div>
                                                    } else if (list.type == "url") {
                                                        return <input type="text" disabled={type == "modal"} defaultValue={list.url} id="url" placeholder="URL 입력" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                                        ), 200)} />
                                                    }
                                                    else if (list.type == "date") {
                                                        return <><CalendarComp id={list.id} defaultValue={list.date} eventHandler={modifyProductInfos} /><DatePickerWrapperStyles pointer-events={type == "modal" ? "none" : "auto"} /></>
                                                    }
                                                })()
                                            }
                                        </td>
                                        {
                                            type != "modal" && <td>
                                                <button className="delete-btn" onClick={() => deleteProductInfos(list.id)}>삭제</button>
                                            </td>

                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        </div>
    )
}
const ProductInfo = () => {
    const [productList, setProductList] = useState<{ [key: string]: any }[]>([]);
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState<{ [key: string]: any }>({ totalPages: 1 })
    const params = useParams();
    const [isActiveBringGroupModal, setBringGroupModal] = useState(false);
    const [isActiveAddNewGroupModal, setAddNewGroupModal] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('search');
    // 제품정보조회
    const getProductInfos = useCallback(() => {
        console.log(meta.totalPages, page);
        if (meta.totalPages >= page) {
            axios.get(apiUrl.productInfos + `?page=${page}&limit=20&search=${keyword}&productId=${params.productId}`).then((result) => {
                setMeta(result.data.meta);
                setProductList((prev) => [...prev, ...result.data.data]);
                console.log("제품조회결과:", result.data.data, result.data.meta, page);
            });
        }
    }, [page])
    // 제품 검색
    const searchProductList = (search) => {
        setProductList([]);
        history.push({
            search: `?search=${search}`
        });
        axios.get(apiUrl.productInfos + `?page=1&limit=20&search=${search}&productId=${params.productId}`).then((result) => {
            console.log(result.data.meta);
            setMeta(result.data.meta);
            setProductList(result.data.data);
            setPage(1);
        });
    }
    // 제품정보추가
    const addProductInfos = () => {
        axios.post(apiUrl.productInfos, { productId: params.productId, type: "text", title: "" }).then((result) => {
            console.log('제품정보추가결과:', result);
            getProductInfos();
        })
    }

    const detectScrollBottom = () => {
        const SCROLLED_HEIGHT = window.scrollY;
        const WINDOW_HEIGHT = window.innerHeight;
        const DOC_TOTAL_HEIGHT = document.body.offsetHeight;
        const IS_BOTTOM = WINDOW_HEIGHT + SCROLLED_HEIGHT === DOC_TOTAL_HEIGHT;
        if (IS_BOTTOM) {
            console.log("바닥감지");
            setPage(prevState => prevState + 1)
        }
    }
    const props = {
        data: productList, // 제품리스트
        setPage: setPage, // 페이징설정
        getProductInfos: getProductInfos, // 조회함수
        searchProductList: searchProductList, // 검색함수
    }
    useEffect(() => {
        getProductInfos()
    }, [getProductInfos])
    useEffect(() => {
        window.addEventListener('scroll', detectScrollBottom);
        return () => { window.removeEventListener('scroll', detectScrollBottom) }
    }, [])
    return (
        <>
            {/* 그룹 불러오기 모달 */}
            {
                isActiveBringGroupModal && <BringGroupModal />

            }
            {/* 새 그룹 추가 모달 */}
            {
                isActiveAddNewGroupModal &&
                <AddNewGroupModal {...{ ...props, ...{ closeModal: setAddNewGroupModal } }} />
            }
            <section>
                <h3 className="h3-title">제품 정보</h3>
                <ProductList {...{ ...props, ...{ type: "" } }}
                />
            </section>
            <button className="add-info-btn" onClick={addProductInfos}>제품 정보 추가</button>
            <div className="btn-wrap">
                <button className="import-group-btn" onClick={() => setBringGroupModal(true)}>그룹 불러오기</button>
                <button className="add-group-btn" onClick={() => setAddNewGroupModal(true)}>새 그룹 추가</button>
            </div>
        </>
    )
}
export default ProductInfo
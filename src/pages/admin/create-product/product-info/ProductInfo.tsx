import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";
import apiUrl from "src/utils/api";
import CalendarComp from "src/components/common/calendar/Calendar"
import BringGroupModal from "./modal/bring-group/BringGroupModal";
import AddNewGroupModal from "./modal/add-new-group/AddNewGroupModal";
import "./ProductInfo.scoped.scss"
import _ from 'lodash';
import SelectBox from "src/components/common/base-select/SelectBox";
import history from "src/utils/history";
import { homePageReg } from 'src/utils/common';
import ReactTooltip from 'react-tooltip';
const debounce = _.debounce;
const DatePickerWrapperStyles = createGlobalStyle`
    .react-datepicker-wrapper{
        width:200px;
        border-radius: 4px;
        overflow: hidden;
        vertical-align: middle;
        .react-datepicker__input-container{
            input{
                background: url(${require('images/calender_ico.svg').default}) #f6f7f8 no-repeat center right 16px /
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
    background: url(${require('images/search_ico.svg').default}) no-repeat center right/
    24px 24px;
`
export const ProductList = ({ data, type, colgroup, setProductList, SearchBar, InputTitle, Checkbox, AllCheckbox }: any) => {
    const [urlCheckMessage, setUrlCheckMessage] = useState(-1);
    const [isActiveImageModal, setActiveImageModal] = useState(-1);
    const params = useParams();
    const industryId = params.industryId;
    // ??????????????????
    const modifyProductInfos = (e, id) => {
        let body;
        // e??? string?????? ?????????
        if (typeof e === "string") {
            body = {
                "date": e
            }
        } else {
            body = { [e.target.id]: e.target.value }
        }
        console.log("body", body, id);
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios.patch(apiUrl.productInfos + `/${id}`, formData).then((result) => {
            console.log("????????????????????????:", result);
            const filter = data.filter((el) => {
                return el.id == id
            })
            const getIndex = data.indexOf(filter[0]);
            data.splice(getIndex, 1);
            data.splice(getIndex, 0, result.data.data);
            setProductList([...data]);
        });
    }
    // ?????? ?????????
    const inActiveInput = (e) => {
        e.target.style.border = "1px solid #f6f7f8";
    }
    // ?????? ??????
    const activeInput = (e) => {
        e.target.style.border = "1px solid #5138e5";
    }
    // ??????????????????
    const deleteProductInfos = (id) => {
        axios.delete(apiUrl.productInfos + `/${id}`).then((result) => {
            console.log('????????????', result);
            const filter = data.filter((el) => {
                return el.id != id
            })
            setProductList([]);
            setProductList(filter);
        })
    }
    const urlValidationCheck = (url, id) => {
        const homepageCheck = homePageReg.test(url);
        console.log('id:', id, "url", url, url.length, homepageCheck);
        if (homepageCheck == false && url.length > 0) {
            if (url.length == 0) {
                setUrlCheckMessage(-1)
            } else {
                setUrlCheckMessage(id)
            }
        } else {
            setUrlCheckMessage(-1);
            modifyProductInfos({ target: { id: 'url', value: url } }, id);
        }
    }
    const selectBoxStyle = {
        padding: '12px 0',
    }
    return (
        <>
            {/* ????????? */}
            {SearchBar}
            {/* ????????? ?????? ??????  */}
            {InputTitle}
            {
                data && data.length == 0 ? <p className="message">?????? ????????? ????????????.</p> : <div className="table-wrap" >
                    <table>
                        {
                            colgroup
                        }
                        <thead>
                            <tr>
                                {
                                    AllCheckbox && React.cloneElement(AllCheckbox)
                                }
                                <th className="title-th">
                                    ??????
                                </th>
                                <th className="type-th">
                                    ??????
                                </th>
                                <th className={type == "modal" ? "" : "value-th"}>
                                    ???
                                </th>
                                {
                                    type != "modal" && <th>
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data &&
                                data.map((list, index) => {
                                    return (
                                        <tr key={index}>
                                            {
                                                Checkbox && React.cloneElement(Checkbox, { id: list.id, index: index })
                                            }
                                            <td>
                                                <input type="text" data-tip data-for={'title' + index} disabled={type == "modal" || industryId == "13" || industryId == "14" || industryId == "15" || industryId == "16"} placeholder="?????? ??????" id="title" defaultValue={list.title} onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                                ), 200)} />
                                                {
                                                    list.title && <ReactTooltip id={'title' + index} type="dark" effect="float" font-size="122px">
                                                        <span className="tooltip">{list.title}</span>
                                                    </ReactTooltip>

                                                }
                                            </td>
                                            <td style={type == "modal" || industryId == "13" || industryId == "14" || industryId == "15" || industryId == "16" ? { pointerEvents: "none", color: "#9ea7ad" } : { pointerEvents: "auto" }}>
                                                <div className="select-box-wrap">
                                                    <SelectBox
                                                        style={selectBoxStyle}
                                                        defaultValue={list.type}
                                                        property="label"
                                                        value="value"
                                                        list={[{ label: "?????????", value: 'text' }, { label: '??????', value: 'number' }, { label: "???,??????", value: 'boolean' }, { label: "URL", value: 'url' }, { label: "??????", value: 'date' }, { label: "?????????", value: 'image' }]}
                                                        eventHandler={(value) => modifyProductInfos({ target: { id: "type", value: value } }, list.id)} />
                                                </div>
                                            </td>
                                            <td >
                                                {
                                                    (() => {
                                                        if (list.type == "text") {
                                                            return <input type="text" disabled={type == "modal"} defaultValue={list.text} id="text" placeholder="????????? ??????" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                                            ), 200)} />
                                                        }
                                                        else if (list.type == "number") {
                                                            return <input type="number" disabled={type == "modal"} defaultValue={list.number} id="number" placeholder="?????? ??????" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => modifyProductInfos(e, list.id
                                                            ), 200)} />
                                                        } else if (list.type == "boolean") {
                                                            return <div className="boolean-area">
                                                                <button className={list.boolean || list.boolean == null ? "true-btn selected" : "true-btn"} disabled={type == "modal"} onClick={() => modifyProductInfos({ target: { id: 'boolean', value: true } }, list.id)}>???</button>
                                                                <button className={list.boolean == false ? "false-btn selected" : "false-btn"} disabled={type == "modal"} onClick={() => modifyProductInfos({ target: { id: 'boolean', value: false } }, list.id)}>??????</button>
                                                            </div>
                                                        } else if (list.type == "url") {
                                                            return <>
                                                                <input type="text" disabled={type == "modal"} defaultValue={list.url} id="url" placeholder="URL ??????" onBlur={(e) => inActiveInput(e)} onClick={(e) => activeInput(e)} onChange={debounce((e) => urlValidationCheck(e.target.value.trim(), list.id), 500)} />
                                                                {urlCheckMessage == list.id && <p className="warn-message">???????????? ?????? ???????????????.</p>}
                                                            </>
                                                        }
                                                        else if (list.type == "date") {
                                                            return <><CalendarComp id={list.id} defaultValue={list.date} eventHandler={modifyProductInfos} /><DatePickerWrapperStyles pointer-events={type == "modal" ? "none" : "auto"} /></>
                                                        }
                                                        else if (list.type == "image") {
                                                            return <>
                                                                <div className="attach">
                                                                    {isActiveImageModal == list.id && <> <div className="mask" onClick={() => setActiveImageModal(-1)}>
                                                                    </div><img src={list.image} className="image-modal" onClick={() => setActiveImageModal(-1)} /></>}
                                                                    {
                                                                        list.imageTitle == null ? <span className="input-file" >????????? ??????</span>
                                                                            : <span className="input-file" onClick={() => setActiveImageModal(list.id)}>{list.imageTitle + " (" + list.imageSize + ")"}</span>
                                                                    }
                                                                    <input type="file" accept="image/png, image/jpeg" disabled={type == "modal"} id={'image' + index} onChange={(e) =>
                                                                        modifyProductInfos(
                                                                            { target: { id: "image", value: (e.target as { [key: string]: any }).files[0] } }, list.id
                                                                        )
                                                                    } />
                                                                </div>
                                                                <label htmlFor={'image' + index} className={type == "modal" ? "file disabled-file" : "file"}>????????????</label>
                                                            </>
                                                        }
                                                    })()
                                                }
                                            </td>
                                            {
                                                type != "modal" && <td>
                                                    <button className="delete-btn" onClick={() => deleteProductInfos(list.id)}>??????</button>
                                                </td>

                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }

        </>
    )
}
const SearchBar = ({ searchProductList }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get('search');
    return (
        <div className="search-area" onBlur={(e) => {
            e.currentTarget.style.border = "1px solid #f6f7f8";
        }}
            onClick={(e) => {
                e.currentTarget.style.border = "1px solid #5138e5";
            }}>
            <SearchInput defaultValue={keyword} placeholder="?????? ??????"

                onChange={debounce((e) => searchProductList(e.target.value), 300)}
            />
            <SearchButton />
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
    // ??????????????????
    const getInfiniteProductInfos = useCallback(() => {

        if (meta.totalPages >= page) {
            history.push({
                search: `?currentPage=${page}&search=${keyword}`
            });
            axios.get(apiUrl.productInfos + `?page=${page}&limit=20&search=${keyword}&productId=${params.productId}`).then((result) => {
                setMeta(result.data.meta);
                setProductList((prev) => [...prev, ...result.data.data]);
                console.log("??????????????????:", result, result.data.meta, page);
            });
        }
    }, [page])
    // ?????? ??????
    const searchProductList = (search) => {
        setProductList([]);
        history.push({
            search: `?currentPage=1&search=${search}`
        });
        axios.get(apiUrl.productInfos + `?page=1&limit=20&search=${search}&productId=${params.productId}`).then((result) => {
            console.log(result.data.meta);
            setMeta(result.data.meta);
            setProductList(result.data.data);
            setPage(1);
        });
    }
    // ??????????????????
    const addProductInfos = () => {
        axios.post(apiUrl.productInfos, { productId: params.productId, type: "text", title: "" }).then((result) => {
            console.log('????????????????????????:', result);
            setProductList((prev) => [...prev, result.data.data]);
        })
    }

    const detectScrollBottom = () => {
        const SCROLLED_HEIGHT = window.scrollY;
        const WINDOW_HEIGHT = window.innerHeight;
        const DOC_TOTAL_HEIGHT = document.body.offsetHeight;
        const IS_BOTTOM = WINDOW_HEIGHT + SCROLLED_HEIGHT === DOC_TOTAL_HEIGHT;
        if (IS_BOTTOM) {
            console.log("????????????");
            setPage(prevState => prevState + 1)
        }
    }
    const props = {
        data: productList, // ???????????????
        setProductList: setProductList,
        setPage: setPage, // ???????????????
        SearchBar: <SearchBar searchProductList={searchProductList} />
    }
    useEffect(() => {
        getInfiniteProductInfos()
    }, [getInfiniteProductInfos])
    useEffect(() => {
        window.addEventListener('scroll', detectScrollBottom);
        return () => { window.removeEventListener('scroll', detectScrollBottom) }
    }, [])
    return (
        <>
            {/* ?????? ???????????? ?????? */}
            {
                isActiveBringGroupModal && <BringGroupModal setProductList={setProductList} setBringGroupModal={setBringGroupModal} />

            }
            {/* ??? ?????? ?????? ?????? */}
            {
                isActiveAddNewGroupModal &&
                <AddNewGroupModal {...{ ...props, ...{ closeModal: setAddNewGroupModal } }} />
            }
            <section>
                <h3 className="h3-title">?????? ??????</h3>
                <div className="btn-wrap">
                    <button className="import-group-btn" onClick={() => setBringGroupModal(true)}>?????? ????????????</button>
                    <button className="add-group-btn" onClick={() => setAddNewGroupModal(true)}>??? ?????? ??????</button>
                </div>
                <ProductList {...{
                    ...props, ...{
                        type: "", colgroup: <colgroup>
                            <col width="172px" />
                            <col width="148px" />
                            <col width="417px" />
                            <col width="100px" />
                        </colgroup>
                    }
                }}
                />
            </section>
            <button className="add-info-btn" onClick={addProductInfos}>?????? ?????? ??????</button>
        </>
    )
}
export default ProductInfo
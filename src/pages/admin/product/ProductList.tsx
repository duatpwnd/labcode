import "./ProductList.scoped.scss"
import axios from "axios";
import apiUrl from "src/utils/api";
import styled from "styled-components";
import _ from 'lodash'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Pagination from "components/common/pagination/Pagination";
const SearchInput = styled.input`
    padding-left:14px;
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
const CreateBtn = styled.button`
    background:#5138E5;
    border-radius:8px;
    font-size:18px;
    width:160px;
    padding:19px 0;
    color:white;
    @media all and (max-width: 767px) {
        margin-top:20px;
        width:100%;
    }
`
const Product = () => {
    const params = useParams();
    const debounce = _.debounce;
    const navigate = useNavigate();
    const [{ data, meta }, setList] = useState<{ [key: string]: any }>({});
    const getProdcutList = (page, search) => {
        axios
            .get(apiUrl.products + `?limit=10&search=${search}&page=${page}+&projectId=${params.id}`)
            .then((result: any) => {
                setList(result.data);
                console.log('제품리스트:', result.data, params.id);
            })
    }
    const searchDebounce = debounce((query) => {
        console.log('검색어', query);
        getProdcutList(1, query)
    }, 500);
    useEffect(() => {
        getProdcutList(1, "")
    }, [])
    return (
        <main>
            <div className="search-area">
                <SearchButton />
                <SearchInput placeholder="제목 검색."
                    onChange={(e) => searchDebounce(e.target.value)} />
            </div>
            <CreateBtn onClick={() => navigate(`/createProduct/defaultInfo/${params.id}`)}>제품 생성</CreateBtn>
            <div className="product-list">
                <table>
                    <colgroup>
                        <col width="100px" />
                        <col width="140px" />
                        <col width="392px" />
                        <col width="220px" />
                        <col width="140px" />
                        <col width="140px" />
                        <col width="140px" />
                        <col width="140px" />
                        <col width="100px" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                키
                            </th>
                            <th>
                                제품 명
                            </th>
                            <th>
                                설명
                            </th>
                            <th>
                                원본,변경된 이미지
                            </th>
                            <th>
                                적용기술
                            </th>
                            <th>
                                코드 크기
                            </th>
                            <th>
                                적용 세기
                            </th>
                            <th className="created">
                                생성일
                            </th>
                            <th>
                                링크
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data != undefined &&
                            data.map((rows, index) => <tr key={index}>
                                <td>
                                    {rows.key}
                                </td>
                                <td>{rows.title}</td>
                                <td>블랴랴랴랴랴랴랴랴랴랴랴랴랴랴랴랴랴랴랴랼랴</td>
                                <td><img src={rows.sourceImage} className="sourceImage" /><span className="convert-ico"></span><img src={rows.labcodeImage} className="labcodeImage" /></td>
                                <td>{rows.typeChannel}</td>
                                <td>{rows.scale}</td>
                                <td>{rows.alpha}</td>
                                <td>{rows.created.split("T")[0]}</td>
                                <td>{rows.url}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                meta != undefined && data.length > 0 && <Pagination currentPage={Number(meta.currentPage)} totalPages={meta.totalPages} eventHandler={getProdcutList} />
            }

        </main>
    )
}
export default Product
import "./ProductList.scoped.scss"
import axios from "axios";
import apiUrl from "src/utils/api";
import styled from "styled-components";
import _ from 'lodash'
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, ReactElement } from "react";
import { useParams } from 'react-router-dom';
import history from "src/utils/history";

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
const Btn = styled.button`
    background:${props => props.background};
    border-radius:8px;
    width:160px;
    padding:14px 0;
    font-weight:700;
    color:${props => props.color};
    @media all and (max-width: 767px) {
        width:100%;
    }
`
const Pagination = ({ currentPage, totalPages }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    const pageMove = (pageNumber) => {
        history.push({
            search: `?currentPage=${pageNumber}&search=${search}`,
        });
    }
    const rendering = () => {
        const result: ReactElement[] = [];
        for (let i = 1; i <= totalPages; i++) {
            result.push(<li className={currentPage == i ? "active" : ""} key={i} onClick={() => pageMove(i)}>{i}</li>);
        }
        return result;
    };

    return <ul className="pagination">{
        currentPage != 1 && <li className="prev-page-btn paging-btn" onClick={() => pageMove(currentPage - 1)}></li>}{rendering()}{
            currentPage != totalPages &&
            <li className="next-page-btn paging-btn" onClick={() => pageMove(currentPage + 1)}></li>}
    </ul>;
}
const Product = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('currentPage');
    const search = searchParams.get('search');
    const params = useParams();
    const debounce = _.debounce;
    const navigate = useNavigate();
    const [{ data, meta, product }, setList] = useState<{ [key: string]: any }>({});

    const getProductList = (page, search) => {
        history.push({
            search: `?currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.products + `?limit=10&search=${search}&page=${page}&projectId=${params.projectId}`)
            .then((result: any) => {
                setList(result.data);
                console.log('제품리스트:', result);
            })
    }
    const addSamples = () => {
        axios.post(apiUrl.addSamples + `?projectId=${params.projectId}`).then((result) => {
            console.log("샘플데이터추가결과:", result);
            getProductList(1, "");
        })
    }
    const createProducts = () => {
        const body = {
            projectId: params.projectId,
            embedding: "2.5",
            channel: "lab_rgb",
            title: "",
            description: "",
            labcodeImage: null,
            sourceImage: null,
            url: "",
            scale: 4,
            alpha: 8
        }
        const formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key as never]);
        }
        axios
            .post(apiUrl.products, formData)
            .then((result: any) => {
                navigate(`/projects/${params.projectId}/products/${result.data.data.id}/defaultInfo`);
            }).catch((err: any) => {
                console.log('기본정보적용에러:', err);
            });
    }
    const searchDebounce = debounce((query) => {
        console.log('검색어', query);
        getProductList(1, query)
    }, 500);
    useEffect(() => {
        console.log("입장");
        getProductList(currentPage, search);
    }, [currentPage])
    return (
        <main>
            <div className="search-area">
                <SearchButton />
                <SearchInput defaultValue={search} placeholder="제목 검색."
                    onChange={(e) => searchDebounce(e.target.value)} />
            </div>
            <div className="nav-area">
                <strong className="project-title">{product && product.title}</strong>
                <div className="btn-wrap">
                    <Btn className="add-sample-btn" background="#DBDFE1" color="#525A61" onClick={addSamples}>샘플 데이터 추가</Btn>
                    <Btn background="#5138E5" color="#FFFFFF" onClick={createProducts}>제품 생성</Btn>
                </div>
            </div>
            {
                data && data.length == 0 ? <p className="guide-message">등록된 제품이 없습니다. 제품을 생성해주세요.</p> : <div className="product-list">
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
                                data.map((products, index) => <tr key={index} onClick={() => navigate(`${products.id}/defaultInfo`)}>
                                    <td>
                                        {products.key}
                                    </td>
                                    <td>{products.title}</td>
                                    <td>{products.description}</td>
                                    <td><a href={products.sourceImage} download><img src={products.sourceImage} className="sourceImage" /></a><span className="convert-ico"></span><img src={products.labcodeImage} className="labcodeImage" /></td>
                                    <td>{products.typeChannel}</td>
                                    <td>{products.scale}</td>
                                    <td>{products.alpha}</td>
                                    <td>{products.created.split("T")[0]}</td>
                                    <td>{products.url}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }

            {
                meta != undefined && data.length > 0 && <Pagination currentPage={Number(meta.currentPage)} totalPages={meta.totalPages} />
            }

        </main>
    )
}
export default Product
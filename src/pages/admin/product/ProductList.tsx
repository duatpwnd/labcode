import "./ProductList.scoped.scss"
import axios from "axios";
import apiUrl from "src/utils/api";
import styled from "styled-components";
import _ from 'lodash'
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import PaginatedItems from "src/components/common/pagination/Paginate";
import history from "src/utils/history";
import SearchInput from "src/components/common/search-input/SearchInput";
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
const Product = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = searchParams.get('currentPage');
    const search = searchParams.get('search');
    const params = useParams();
    const navigate = useNavigate();
    const [{ data, meta, product }, setList] = useState<{ [key: string]: any }>({});
    const getProductList = (page, search) => {
        history.push({
            search: `?currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.products + `?limit=10&search=${search}&page=${page}`)
            .then((result: any) => {
                console.log(result.data);
                setList(result.data);
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
    useEffect(() => {
        getProductList(currentPage, search);
    }, [currentPage, search])
    return (
        <main>
            <SearchInput placeholder="제목 검색" />
            <div className="nav-area">
                <strong className="project-title">{product && product.title}</strong>
                <div className="btn-wrap">
                    <Btn className="add-sample-btn" background="#DBDFE1" color="#525A61" onClick={addSamples}>샘플 데이터 추가</Btn>
                    <Btn background="#5138E5" color="#FFFFFF" onClick={() => navigate("/products/create/defaultInfo")}>제품 등록</Btn>
                </div>
            </div>
            {
                data && data.length == 0 ? <p className="guide-message">등록된 제품이 없습니다. 제품을 생성해주세요.</p> : <div className="product-list">
                    <table>
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
                                data.map((products, index) => <tr key={index} onClick={() => navigate(`/products/edit/${products.id}/${products.projectId}/defaultInfo`)}>
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
                data && data.length > 0 && < PaginatedItems itemsPerPage={1} data={[...Array(meta.totalPages).keys()]} />
            }
        </main>
    )
}
export default Product
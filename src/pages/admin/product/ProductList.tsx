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
import toast from 'react-hot-toast';
const Btn = styled.button`
    background:${props => props.background};
    border-radius:8px;
    width:114px;
    padding:15px 0;
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
    const projectId = searchParams.get('projectId');
    const params = useParams();
    const navigate = useNavigate();
    const [{ data, meta, product }, setList] = useState<{ [key: string]: any }>({});
    const getProductList = (page, search) => {
        toast.dismiss();
        history.push({
            search: `?projectId=${projectId || ""}&currentPage=${page}&search=${search}`,
        });
        axios
            .get(apiUrl.products + `?projectId=${projectId || ""}&limit=10&search=${search}&page=${page}`)
            .then((result: any) => {
                console.log(result.data);
                if (result.data.data.length == 0) {
                    toast.error("검색결과가 없습니다.")
                }
                setList(result.data);
            })
    }
    const addSamples = () => {
        const callMyFunction = axios.post(apiUrl.addSamples + `?projectId=${projectId}`).then((result) => {
            console.log("샘플데이터추가결과:", result);
            getProductList(1, "");
        })
        toast.promise(callMyFunction, {
            loading: "Loading...",
            success: "샘플 데이터가 추가 되었습니다.",
            error: "샘플 데이터 추가중에 오류가 발생되었습니다.",
        });
    }
    // const createProducts = () => {
    //     const body = {
    //         projectId: params.projectId,
    //         embedding: "2.5",
    //         channel: "lab_rgb",
    //         title: "",
    //         description: "",
    //         labcodeImage: null,
    //         sourceImage: null,
    //         url: "",
    //         scale: 4,
    //         alpha: 8
    //     }
    //     const formData = new FormData();
    //     for (let key in body) {
    //         formData.append(key, body[key as never]);
    //     }
    //     axios
    //         .post(apiUrl.products, formData)
    //         .then((result: any) => {
    //             navigate(`/projects/${params.projectId}/products/${result.data.data.id}/defaultInfo`);
    //         }).catch((err: any) => {
    //             console.log('기본정보적용에러:', err);
    //         });
    // }
    useEffect(() => {
        getProductList(currentPage, search);
    }, [projectId, currentPage, search])
    return (
        <main>
            <SearchInput placeholder="제품명 검색" />
            <div className="category">
                <span className="main-category">프로젝트</span><b className="sub-category">프로젝트 목록</b>
            </div>
            <div className="nav-area">
                <strong className="project-title">{product && product.title}</strong>
                <div className="btn-wrap">
                    {/* {
                        projectId != "" && <Btn className="add-sample-btn" background="#DBDFE1" color="#525A61" onClick={addSamples}>샘플 데이터 추가</Btn>

                    } */}
                    <Btn background="#5138E5" color="#FFFFFF" onClick={() => navigate(`/products/create/defaultInfo?projectId=${projectId}`)}>제품 등록</Btn>
                </div>
            </div>
            {
                data && data.length != 0 && <div className="product-list">
                    <table>
                        <colgroup>
                            <col width="100px" />
                            <col width="140px" />
                            <col width="392px" />
                            <col width="245px" />
                            <col width="140px" />
                            <col width="141px" />
                            <col width="141px" />
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
                                <th className="link-th">
                                    링크
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data != undefined &&
                                data.map((products, index) => <tr key={index} onClick={() => navigate(`/products/edit/${products.id}/${product.teamId}/defaultInfo`)}>
                                    <td>
                                        {products.key}
                                    </td>
                                    <td>{products.title}</td>
                                    <td>{products.description}</td>
                                    <td onClick={(e) => { e.stopPropagation(); }}><a href={products.sourceImage} download ><img src={products.sourceImage} className="sourceImage" /></a><span className="convert-ico"></span><a href={products.labcodeImage} download><img src={products.labcodeImage} className="labcodeImage" /></a></td>
                                    <td>{products.channel}</td>
                                    <td>{products.scale}</td>
                                    <td>{products.alpha}</td>
                                    <td>{products.created.split("T")[0]}</td>
                                    <td className="link" onClick={(e) => { e.stopPropagation(); window.open(products.url, '_blank') }}></td>
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
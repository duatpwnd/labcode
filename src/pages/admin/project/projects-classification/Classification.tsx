import "../ModifyProject.scoped.scss"
import { useCallback, useEffect, useState, } from "react"
import axios from "axios";
import apiUrl from "src/utils/api";
import { useSelector } from "react-redux";
import { RootState } from "src/reducers";
import { useLocation } from 'react-router-dom';
import SelectBox from "src/components/common/base-select/SelectBox";
const Classification = ({ eventHandler, inputs, isActive }: any) => {
    const userInfo = useSelector((state: RootState) => {
        return state.signIn.userInfo
    })
    const [versions, setVersions] = useState<{ [key: string]: any }[]>([]);
    const [countries, setCountries] = useState<{ [key: string]: any }[]>([]);
    const [industries, setIndustries] = useState<{ [key: string]: any }[]>([]);
    // 버전 조회
    const getVersions = () => {
        axios.get(apiUrl.versions).then((result) => {
            console.log("버전리스트:", result.data.data);
            setVersions(result.data.data)
        })
    }
    // 국가 조회
    const getCountries = () => {
        axios.get(apiUrl.countries + `?versionId=${inputs.versionId}`).then((result) => {
            console.log("국가리스트:", result.data.data);
            setCountries(result.data.data)
        })
    }
    // 산업 조회
    const getIndustries = () => {
        axios.get(apiUrl.industries + `?versionId=${inputs.versionId}`).then((result) => {
            console.log("산업리스트:", result.data.data);
            setIndustries(result.data.data)
        })
    }
    // 소분류 조회
    const getSubCategories = (page, search) => {
        return axios.get(apiUrl.subCategories + `?mainCategoryId=${inputs.mainCategoryId}&page=${page}&limit=10&search=${search}`).then((result) => {
            console.log('소분류조회:', result.data);
            return result.data;
        })
    }
    // 대분류 조회
    const getMainCategories = (page, search) => {
        return axios.get(apiUrl.mainCategories + `?industryId=${inputs.industryId}&teamId=${userInfo?.user.teamId}&page=${page}&limit=10&search=${search}`).then((result) => {
            console.log('대분류조회:', result.data, inputs.mainCategoryId);
            return result.data
        })
    }
    useEffect(() => {
        // 버전, 국가, 산업 조회
        if (inputs.versionId != null) {
            axios.all([getVersions(), getCountries(), getIndustries()]);
        }
    }, [inputs.versionId]);
    const selectBoxStyle = {
        padding: '16px 0'
    }

    return (
        <section style={isActive == false ? { pointerEvents: "none" } : { pointerEvents: "auto" }}>
            <h2 className="h3-title">프로젝트 분류</h2>
            <div className="row">
                <label htmlFor="versionId">버전</label>
                <div className="select-box-wrap">
                    <SelectBox
                        style={selectBoxStyle}
                        property="title"
                        value="id"
                        defaultValue={inputs.versionId}
                        eventHandler={(value) => eventHandler({ target: { id: "versionId", value: value } })}
                        list={versions} />
                </div>
            </div>
            {
                countries.length != 0 && <div className="row">
                    <label htmlFor="countryId">국가</label>
                    <div className="select-box-wrap">
                        <SelectBox
                            style={selectBoxStyle}
                            property="title"
                            value="id"
                            defaultValue={inputs.countryId}
                            eventHandler={(value) => eventHandler({ target: { id: "countryId", value: value } })}
                            list={countries} />
                    </div>
                </div>
            }

            {
                inputs.countryId != null && <div className="row">
                    <label htmlFor="industryId" >산업군</label>
                    <div className="select-box-wrap">
                        <SelectBox
                            style={selectBoxStyle}
                            property="title"
                            value="id"
                            defaultValue={inputs.industryId}
                            eventHandler={(value) => eventHandler({ target: { id: "industryId", value: value } })}
                            list={industries} />
                    </div>
                </div>
            }
            {
                inputs.industryId != null &&
                <div className="row">
                    <label htmlFor="mainCategoryId" >대분류</label>
                    <div className="select-box-wrap">
                        <SelectBox
                            style={selectBoxStyle}
                            property="title"
                            value="id"
                            inputs={inputs}
                            defaultValue={inputs.mainCategory?.title}
                            eventHandler={(value, text) => eventHandler({ target: { id: "mainCategoryId", value: value, text: text } })}
                            getList={getMainCategories} />
                    </div>
                </div>
            }
            {
                inputs.mainCategoryId != null &&
                <div className="row">
                    <label htmlFor="subCategoryId" >소분류</label>
                    <div className="select-box-wrap">
                        <SelectBox
                            style={selectBoxStyle}
                            property="title"
                            value="id"
                            inputs={inputs}
                            defaultValue={inputs.subCategory?.title}
                            eventHandler={(value, text) => eventHandler({ target: { id: "subCategoryId", value: value, text: text } })}
                            getList={getSubCategories} />
                    </div>
                </div>
            }
        </section >
    )
}
export default Classification
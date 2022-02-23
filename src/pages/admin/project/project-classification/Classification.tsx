import "../ModifyProject.scoped.scss"
import { useEffect, useState, } from "react"
import axios from "axios";
import apiUrl from "src/utils/api";
import SelectPagination from "./select-pagination/SelectPagination";
const Classification = ({ eventHandler, inputs }) => {
    const [versions, setVersions] = useState<{ [key: string]: any }[]>([]);
    const [countries, setCountries] = useState<{ [key: string]: any }[]>([]);
    const [industries, setIndustries] = useState<{ [key: string]: any }[]>([]);
    // 버전 조회
    const getVersions = () => {
        axios.get(apiUrl.versions).then((result) => {
            console.log("버전리스트:", result.data.data);
            setVersions(result.data.data);
        })
    }
    // 국가 조회
    const getCountries = () => {
        console.log("국가id:", inputs.versionId);
        axios.get(apiUrl.countries + `?versionId=${inputs.versionId}`).then((result) => {
            console.log("국가리스트:", result.data.data);
            setCountries(result.data.data);
        })
    }
    // 산업 조회
    const getIndustries = () => {
        axios.get(apiUrl.industries + `?versionId=${inputs.versionId}`).then((result) => {
            console.log("산업리스트:", result.data.data);
            setIndustries(result.data.data);
        })
    }

    useEffect(() => {
        getVersions();
        // 버전, 국가, 산업 조회
        if (inputs.versionId != undefined) {
            console.log("inputs.versionId", inputs.versionId);
            axios.all([getCountries(), getIndustries()]);
        }
    }, [inputs.versionId]);
    return (
        <section>
            <h2 className="h3-title">프로젝트 분류</h2>
            <div className="row">
                <label htmlFor="versionId">버전</label>
                <select className="select-box" id="versionId" value={inputs.versionId || ""} onChange={(e) => eventHandler(e)}>
                    {
                        versions.map((options, index) => {
                            return <option value={options.id} key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            {
                countries.length != 0 && <div className="row">
                    <label htmlFor="countryId">국가</label>
                    <select className="select-box" id="countryId" value={inputs.countryId || ""} onChange={(e) => eventHandler(e)}>
                        <option value="" disabled>국가를 선택해주세요.</option>
                        {
                            countries.map((options, index) => {
                                return <option value={options.id} key={index}>{options.title}</option>
                            })
                        }
                    </select>
                </div>
            }

            {
                inputs.countryId != null && <div className="row">
                    <label htmlFor="industryId" >산업</label>
                    <select className="select-box" value={inputs.industryId || ""} id="industryId" onChange={(e) => eventHandler(e)}>
                        <option value="" disabled>산업을 선택해주세요.</option>
                        {
                            industries.map((options, index) => {
                                return <option value={options.id} key={index}>{options.title}</option>
                            })
                        }
                    </select>
                </div>
            }
            {
                inputs.industryId != null &&
                <SelectPagination eventHandler={eventHandler} inputs={inputs} />
            }
        </section >
    )
}
export default Classification
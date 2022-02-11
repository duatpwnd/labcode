import "../ModifyProject.scoped.scss"
import { useEffect, useState, } from "react"
import axios from "axios";
import apiUrl from "src/utils/api";
import SelectPagination from "./select-pagination/SelectPagination";
const Classification = ({ eventHandler, inputs }) => {
    const [classification, setClassification] = useState<{ [key: string]: { [key: string]: any }[] }>({
        versions: [{}],
        countries: [{}],
        industries: [{}],
    });

    useEffect(() => {
        // 버전, 국가, 산업 조회
        axios.all([axios.get(apiUrl.versions), axios.get(apiUrl.countries), axios.get(apiUrl.industries)]).then(axios.spread((res1, res2, res3) => {
            console.log(res1.data.data, res2.data.data, res3.data.data);
            setClassification({
                versions: res1.data.data,
                countries: res2.data.data,
                industries: res3.data.data,
            })
        }))
            .catch((err) => {
                console.log("조회에러", err);
            })
    }, []);
    return (
        <section>
            <h2 className="h3-title">프로젝트 분류</h2>
            <div className="row">
                <label htmlFor="versionId">버전</label>
                <select className="select-box" id="versionId" value={inputs.versionId || ""} onChange={(e) => eventHandler(e)}>
                    {
                        classification.versions.map((options, index) => {
                            return <option value={options.id} key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            <div className="row">
                <label htmlFor="countryId">국가</label>
                <select className="select-box" id="countryId" value={inputs.countryId || ""} onChange={(e) => eventHandler(e)}>
                    {
                        classification.countries.map((options, index) => {
                            return <option value={options.id} key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            <div className="row">
                <label htmlFor="industryId" >산업</label>
                <select className="select-box" value={inputs.industryId || ""} id="industryId" onChange={(e) => eventHandler(e)}>
                    <option value="null">산업을 선택해주세요.</option>
                    {
                        classification.industries.map((options, index) => {
                            return <option value={options.id} key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            <SelectPagination eventHandler={eventHandler} inputs={inputs} />
        </section >
    )
}
export default Classification
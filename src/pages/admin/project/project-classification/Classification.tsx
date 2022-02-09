import { useEffect, useState } from "react"
import axios from "axios";
import apiUrl from "src/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "../ModifyProject.scoped.scss"
const Classification = ({ eventHandler, industryId }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [classification, setClassification] = useState<{ [key: string]: { [key: string]: any }[] }>({
        versions: [{}],
        countries: [{}],
        industries: [{}]
    });
    useEffect(() => {
        axios.all([axios.get(apiUrl.versions), axios.get(apiUrl.countries), axios.get(apiUrl.industries)]).then(axios.spread((res1, res2, res3) => {
            console.log("버전:", res1.data.data, "국가:", res2.data.data, "산업:", res3.data.data);
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
            <h3 className="h3-title">프로젝트 분류</h3>
            <div className="row">
                <label htmlFor="versions">버전</label>
                <select className="select-box" id="versions" onChange={(e) => eventHandler(e)}>
                    {
                        classification.versions.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            <div className="row">
                <label htmlFor="versions">국가</label>
                <select className="select-box">
                    {
                        classification.countries.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            <div className="row">
                <label htmlFor="industryId" >산업</label>
                <select className="select-box" id="industryId" onChange={(e) => eventHandler(e)}>
                    <option value="null">산업을 선택해주세요.</option>
                    {
                        classification.industries.map((options, index) => {
                            return <option value={options.key} key={index}>{options.title}</option>
                        })
                    }
                </select>
            </div>
            <div className="row">
                <label htmlFor="versions">대분류</label>
                <select className="select-box classify-box">
                    <option value="null">대분류를 선택해주세요.</option>
                    {
                        classification.countries.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </select>
                <button className="edit-btn" onClick={() => industryId != null && navigate(`/projects/${params.projectId}/manage/${industryId}`)}>편집</button>


            </div>
            <div className="row">
                <label htmlFor="versions">소분류</label>
                <select className="select-box classify-box">
                    <option value="null">소분류를 선택해주세요.</option>
                    {
                        classification.countries.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </select>
                <button className="edit-btn" onClick={() => navigate(`/projects/${params.projectId}/manage`)}>편집</button>
            </div>
        </section>
    )
}
export default Classification
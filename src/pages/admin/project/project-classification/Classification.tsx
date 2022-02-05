import styled from "styled-components";
import { useEffect, useState } from "react"
import axios from "axios";
import apiUrl from "src/utils/api";
import "../ModifyProject.scoped.scss"
const SelectBox = styled.select`
    width: calc(100% - 180px);
    box-sizing: border-box; 
    padding:10px 16px;
    border-radius: 8px;
    color: #303538;
    background: url(${require('images/arrow_bottom.svg').default}) #F6F7F8 no-repeat right 10px center /
    16px 16px;
    @media all and (max-width: 767px) {
        width: 100%;
        margin-top: 10px;
    }
`
const Classification = () => {
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
                <SelectBox id="versions">
                    {
                        classification.versions.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </SelectBox>
            </div>
            <div className="row">
                <label htmlFor="versions">국가</label>
                <SelectBox>
                    {
                        classification.countries.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </SelectBox>
            </div>
            <div className="row">
                <label htmlFor="versions">산업</label>
                <SelectBox>
                    {
                        classification.industries.map((options, index) => {
                            return <option key={index}>{options.title}</option>
                        })
                    }
                </SelectBox>
            </div>
        </section>
    )
}
export default Classification
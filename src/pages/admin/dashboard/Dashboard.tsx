import "./Dashboard.scoped.scss"
import Doughnut from "src/components/chart/Doughnut"
import GroupedBar from "src/components/chart/GroupedBar"
import LineChart from "src/components/chart/LineChart"
import KoreaMap from "src/components/chart/KoreaMap"
import { useEffect } from "react"
const Dashboard = () => {
    useEffect(() => {
    }, [])
    return (
        <div className="contents">
            <div className="chart-wrap">
                <div className="box">
                    <span className="statistic-ico"></span>
                    <div className="statistic-info">
                        <strong className="number">300</strong>
                        <span>오늘 유저</span>
                    </div>
                </div>
                <div className="box">
                    <span className="statistic-ico"></span>
                    <div className="statistic-info">
                        <strong className="number">300</strong>
                        <span>오늘 유저</span>
                    </div>
                </div>
                <div className="box">
                    <span className="statistic-ico"></span>
                    <div className="statistic-info">
                        <strong className="number">300</strong>
                        <span className="user">오늘 유저</span>
                    </div>
                </div>
                <div className="chart chart1">
                    <div className=" grouped-bar">
                        <GroupedBar />
                    </div>
                    <div className="total">
                        <strong>이번주 유저수</strong>
                        <span className="ago">4분전</span>
                    </div>
                </div>
                <div className="chart">
                    <div className="line">
                        <LineChart />
                    </div>
                    <div className="total">
                        <strong>월별 유저수</strong>
                        <span className="ago">4분전</span>
                    </div>
                </div>
                <div className="chart">
                    <div className=" grouped-bar">
                        <GroupedBar />
                    </div>
                    <div className="total">
                        <strong>이번주 유저수</strong>
                        <span className="ago">4분전</span>
                    </div>
                </div>
            </div>
            <div className="bottom-chart-wrap">
                <div className="map-chart">
                    <h2 className="h2-title">지역별 유저</h2>
                    <KoreaMap data={{
                        서울: 2,
                        경기도: 1,
                        인천: 5,
                        강원도: 16545,
                        충청북도: 12,
                        충청남도: 15,
                        세종: 19,
                        대전: 25,
                        경상북도: 1555,
                        대구: 239,
                        울산: 56,
                        경상남도: 20,
                        부산: 4,
                        제주도: 12,
                        광주: 9,
                        전라남도: 12,
                        전라북도: 1555,
                    }} />
                </div>
                <div className="doughnut-wrap">
                    <Doughnut className="gender-chart" data={{
                        title: "성별 유저",
                        label: ["남자", "여자"],
                        datasets: [
                            {
                                data: [100, 50],
                                backgroundColor: [
                                    '#5138E5',
                                    '#EA43CF',
                                ],
                                borderWidth: 0,
                            },
                        ],
                        labels: [],

                    }} />
                    <Doughnut className="age-chart" data={{
                        title: "연령별 유저",
                        label: ["10대", "20대", "30대", "40대", "50대"],
                        datasets: [
                            {
                                data: [100, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(81, 56, 229, 1)',
                                    'rgba(115, 210, 125, 1)',
                                    'rgba(234, 67, 207, 1)',
                                    'rgba(242, 213, 104, 1)',
                                    'rgba(242, 162, 104, 1)',
                                ],
                                borderColor: [
                                    'rgba(81, 56, 229, 1)',
                                    'rgba(115, 210, 125, 1)',
                                    'rgba(234, 67, 207, 1)',
                                    'rgba(242, 213, 104, 1)',
                                    'rgba(242, 162, 104, 1)',

                                ],
                                borderWidth: 1,
                            },
                        ],
                        labels: [],
                    }} />
                </div>
            </div>
        </div>
    )
}
export default Dashboard
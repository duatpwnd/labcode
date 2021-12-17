import "./Dashboard.scoped.scss"
import Doughnut from "src/components/chart/Doughnut"
import GroupedBar from "src/components/chart/GroupedBar"
import LineChart from "src/components/chart/LineChart"
const Dashboard = () => {
    var mapVars = "rMateOnLoadCallFunction=mapReadyHandler";

    return (
        <div>

            <div className="statistic-box">
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
            </div>
            <div className="chart-wrap">
                <div className="chart">
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
                    준비중
                </div>
            </div>

            <Doughnut data={{
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
            <Doughnut data={{
                title: "연령별 유저",
                label: ["10대", "20대", "30대", "40대", "50대"],
                datasets: [
                    {
                        data: [100, 70, 50, 30, 20],
                        backgroundColor: [
                            '#5138E5',
                            '#73D27D',
                            '#EA43CF',
                            "#F2D568",
                            "#F2A268"
                        ],

                        borderWidth: 0,
                    },
                ],
                labels: [],
            }} />

        </div>
    )
}
export default Dashboard
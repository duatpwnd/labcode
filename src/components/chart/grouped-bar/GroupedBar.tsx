import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const GroupedBar = () => {
    const options = {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 17,
                right: 24,
                top: 30,
                bottom: 18,
            },
        },
        plugins: {
            tooltip: {
                interaction: {
                    xAlign: "center", //'left','center','right'
                    yAlign: 'bottom', //'top','center','bottom'
                    mode: 'point'
                },

                caretSize: 0,
                displayColors: false,
                enabled: true,
                usePointStyle: false,
                callbacks: {
                    title: function () { return []; },
                    label: function (context) {
                        return data.datasets[0].data[context.dataIndex] + "/" + data.datasets[1].data[context.dataIndex] + "명";
                    },

                },

            },
            legend: {
                display: false
            },
            title: {
                display: false,
                text: "Chart.js Bar Chart - Stacked"
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "white",
                },
                grid: {
                    borderDash: [3, 3],
                    color: "#ccc",
                    borderWidth: 0
                }
            },
            y: {
                ticks: {
                    color: "white",
                    maxTicksLimit: 4,
                },
                grid: {
                    borderDash: [3, 3],
                    color: "#ccc",
                    borderWidth: 0,
                }
            }
        },
        interaction: {
            mode: "index" as const,
            intersect: true
        }
    };
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = {
        labels,
        datasets: [
            {

                hoverBackgroundColor: [
                    '#5138E5',
                    '#5138E5CC'
                ],
                borderColor: "transparent",
                borderWidth: 2,
                borderRadius: 10,
                data: [40, 59, 10, 51, 56, 55, 40],
                backgroundColor: "#CCCCCC",
                categoryPercentage: 0.5,
            },
            {
                hoverBackgroundColor: [
                    '#5138E5',
                    '#5138E5CC'
                ],
                borderColor: "transparent",
                borderWidth: 2,
                borderRadius: 10,
                data: [45, 60, 10, 41, 16, 5, 20],
                backgroundColor: "#FFFFFF",
                categoryPercentage: 0.5
            }
        ]
    };
    return (
        <Bar options={options} data={data} />
    )
}
export default GroupedBar

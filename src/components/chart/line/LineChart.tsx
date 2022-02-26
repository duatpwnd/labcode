import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const LineChart = () => {
    const options = {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 12,
                right: 24,
                top: 21,
                bottom: 13
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "white"
                },
                grid: {
                    color: "transparent",
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
                    borderWidth: 0
                }
            }
        },

        plugins: {
            tooltip: {
                interaction: {
                    xAlign: "center", //'left','center','right'
                    yAlign: 'bottom', //'top','center','bottom'

                },
                caretSize: 0,
                displayColors: false,
                enabled: true,
                usePointStyle: false,
                callbacks: {
                    title: function () { return []; },
                    label: function (context) {
                        return context.formattedValue + "명"
                    },

                }
            },
            legend: {
                position: "top" as const,
                display: false
            },
            title: {
                display: false,
                text: "Chart.js Line Chart"
            }
        }
    };
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = {
        labels,
        datasets: [
            {
                hoverBackgroundColor: "#5138E5",
                label: "Dataset 1",
                data: [
                    0, 100, 150, 200, 250, 300, 250, 200, 400, 450, 500, 600
                ],
                borderColor: "white",
                backgroundColor: "white",
            },

        ]
    };
    useEffect(() => {

    }, [])
    return (
        <Line options={options} data={data} />
    )
}
export default LineChart

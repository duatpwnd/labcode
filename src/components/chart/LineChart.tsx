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
        responsive: true,
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
                min: 0,
                max: 600,
                grid: {
                    borderDash: [3, 3],
                    color: "#ccc",
                    borderWidth: 0
                }
            }
        },
        plugins: {
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
                label: "Dataset 1",
                scaleGridLineColor: "rgba(0,0,0,.05)",
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

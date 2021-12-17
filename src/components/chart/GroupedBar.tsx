import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
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
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: "Chart.js Bar Chart - Stacked"
            }
        },
        responsive: true,
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
                min: 0,
                max: 60,
                grid: {
                    borderDash: [3, 3],
                    color: "#ccc",
                    borderWidth: 0,
                }
            }
        },
        interaction: {
            mode: "index" as const,
            intersect: false
        }
    };
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = {
        labels,
        datasets: [
            {
                borderColor: "transparent",
                borderWidth: 2,
                borderRadius: 10,
                data: [40, 59, 10, 51, 56, 55, 40],
                backgroundColor: "#CCCCCC",
                categoryPercentage: 0.5,
            },
            {
                borderColor: "transparent",
                borderWidth: 2,
                borderRadius: 10,
                data: [45, 60, 50, 41, 16, 5, 20],
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

import React, { useEffect } from 'react';
import "./Doughnut.scoped.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughuntChart = ({ data, className }) => {
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
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

        },

    };
    useEffect(() => {
        console.log("data", data);
    }, [])
    return (
        <div className={className + " doughnut-wrap"} >
            <h2>{data.title}</h2>
            <div className="doughnut">
                <Doughnut data={data} options={options} />
            </div>
            <div className="ico-wrap">{
                data.label.map((el, index) => {
                    const bg = data.datasets[0].backgroundColor;
                    return (
                        <span className='ico' key={index}>
                            <span className='circle' style={{
                                backgroundColor: bg[index]
                            }}></span>{el}
                        </span>
                    )
                })}
            </div>
        </div>

    )
}
export default DoughuntChart
import React, { useEffect } from 'react';
import "./Doughnut.scoped.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
Tooltip.positioners.custom = function (elements, position) {
    console.log(position.x);
    if (!elements.length) {
        return false;
    }
    //adjust the offset left or right depending on the event position
    return {
        x: position.x,
        y: position.y - 20
    }
}
const DoughuntChart = ({ data, className }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            tooltip: {
                interaction: {
                    position: "custom",
                    xAlign: "center", //'left','center','right'
                    padding: 8
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

        },

    };
    useEffect(() => {
        console.log("data", data);
    }, [])
    return (
        <div className={className + " doughnut-chart"} >
            <h2>{data.title}</h2>
            <div className="doughnut">
                <Doughnut data={data} options={options} />
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

        </div>

    )
}
export default DoughuntChart
import React, { useEffect } from 'react';
import "./Doughnut.scoped.scss"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughuntChart = ({ data }) => {
    useEffect(() => {
        console.log("data", data);
    }, [])
    return (
        <div className="doughnut-wrap">
            <h2>{data.title}</h2>
            <div className="doughnut">
                <Doughnut data={data} />
            </div>
            <div className="ico-wrap">{
                data.label.map((el, index) => {
                    const bg = data.datasets[0].backgroundColor;
                    console.log(`${data}`);
                    return (
                        <span className='ico'>
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
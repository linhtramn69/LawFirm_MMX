import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export function DoughnutChart(props) {
    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'left'
            },
            title: {
                display: true,
                text: props.title,
            },
        },
        responsive: true,
        interaction: {
            mode: 'nearest',
            intersect: false,
        }
    };
    const data = {
        labels: ['Thành lập doanh nghiệp', 'Tư vấn đầu tư', 'Tranh chấp đất đai', 'Tư vấn sỡ hữu trí tuệ'],
        datasets: [
            {
                label: props.title,
                data: props.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            },
        ],
    };
    return <Pie data={data} />;
}
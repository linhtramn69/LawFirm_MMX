import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { matterService } from '~/services';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};
let labels = [];
for(let i = ((new Date()).getFullYear())-4; i<=(new Date()).getFullYear(); i++){
    labels.push(i)
}

export function CustomerOldLine() {

    let arr = []
    const [tile, setTile] = useState()

    useEffect(() => {
        const getTile = async () => {
            arr = (await matterService.thongKeKhachHangCu()).data;
            setTile(arr)
        }
        getTile()
    }, [])
console.log(tile);
    const data = {
        labels,
        datasets: [
            {
                label: 'Tỷ lệ %',
                data: tile,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Line options={options} data={data} />;
}
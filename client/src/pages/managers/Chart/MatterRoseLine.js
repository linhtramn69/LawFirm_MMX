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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { billService, matterService } from '~/services';
import { useToken } from '~/store';
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
        // title: {
        //     display: true,
        //     text: 'Tổng tiền hoa hồng',
        // },
    },
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function MatterRoseLine() {

    let arr = []
    const {token} = useToken();
    const [bill, setBill] = useState()

    useEffect(() => {
        const getBills = async () => {
            arr = (await matterService.getRoseByMonth({quyen: token.account.quyen, _id: token._id, year: new Date().getFullYear()})).data;
            setBill(arr)
        }
        getBills()
    }, [])
    
    const data = {
        labels,
        datasets: [
            {
                label: "VNĐ",
                data: bill,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Line options={options} data={data} />;
}
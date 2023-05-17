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
import { billService } from '~/services';
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

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function BillThuLine() {

    let arr = []
    const [bill, setBill] = useState()

    useEffect(() => {
        const getBills = async () => {
            arr = (await billService.findByMonthYearAndType({loai_hoa_don: "KH", year: new Date().getFullYear()})).data;
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
                borderColor: '#1677ff',
                backgroundColor: '#1677ff',
            },
        ],
    };
    return <Line options={options} data={data} />;
}
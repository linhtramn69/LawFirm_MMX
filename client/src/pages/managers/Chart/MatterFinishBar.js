import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { matterService } from '~/services';
import { useEffect } from 'react';
import { useToken } from '~/store';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    }
};

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function MatterFinishBar() {

    let arr = [];
    const {token} = useToken();
    const [matter, setMatter] = useState();

    useEffect(() => {
        const getMatters = async () => {
            arr = (await matterService.findFinishedMatterByYear({"year": new Date().getFullYear(), "quyen": token.account.quyen, "id": token._id})).data;
            setMatter(arr)
        }
        getMatters()
    }, [])

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: matter,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Bar options={options} data={data} />;
}
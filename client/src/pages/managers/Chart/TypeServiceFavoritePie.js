import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { quoteService } from '~/services';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);


export function TypeServiceFavoritePie() {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const getData = async () => {
      setDataSource((await quoteService.findByTypeServiceAndYear()).data)
    }
    getData()
  }, [])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Lĩnh vực được quan tâm / ${moment().year()}`,
      },
    },
  };
  const data = {
    labels: dataSource.map((item) => item._id),
    datasets: [
      {
        label: 'Tổng',
        data: dataSource.map((item) => item.count),
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
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} options={options} />;
}

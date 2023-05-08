import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { quoteService } from '~/services';
import moment from 'moment';

ChartJS.register(ArcElement, Tooltip, Legend);


export function ProvincePie() {
    const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const getData = async() => {
      setDataSource((await quoteService.findByProvinceAndYear()).data)
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
            text: `Khách hàng theo khu vực / ${moment().year()}`,
        },
    },
};
console.log(dataSource);
    const data = {
        labels: dataSource.map((item) => {
          if(item._id != null ){
            return item._id
          }
        } ),
        datasets: [
          {
            label: 'Tổng',
            data: dataSource.map((item) => {
              if(item._id){
                return item.count
              }
            }),
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
      
  return <Pie data={data} options={options}/>;
}

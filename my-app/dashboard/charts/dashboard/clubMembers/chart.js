import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ClubMembers = () => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023'], // Replace with your yearly data
    datasets: [
      {
        label: 'TEC',
        data: [0, 450, 500, 550, 600], // Sample data for TEC
        borderColor: 'rgba(255, 99, 132, 0.8)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'LCH',
        data: [0, 220, 300, 350, 400], // Sample data for LCH
        borderColor: 'rgba(54, 162, 235, 0.8)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'ESO',
        data: [0, 180, 200, 250, 300], // Sample data for ESO
        borderColor: 'rgba(75, 192, 192, 0.8)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'IIE',
        data: [0, 150, 200, 220, 280], // Sample data for IIE
        borderColor: 'rgba(255, 206, 86, 0.8)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'HWB',
        data: [0, 80, 120, 150, 180], // Sample data for HWB
        borderColor: 'rgba(153, 102, 255, 0.8)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Members',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div> 
      <Line data={data} options={options} />
    </div>
  );
};

export default ClubMembers;

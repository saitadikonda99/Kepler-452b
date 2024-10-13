import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsBarChart = ({ statsData }) => {
  // Define chart data
  const data = {
    labels: ['Members', 'Activities', 'Projects'],
    datasets: [
      {
        label: ' ',
        data: [statsData.Members, statsData.Activities, statsData.Projects],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'none',
      },
      title: {
        display: true,
        text: 'Club Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
       
    },
    label: {
      display: false, // Set to false to hide labels
    },
    
  };

  return <Bar data={data} options={options} />;
};

export default StatsBarChart;

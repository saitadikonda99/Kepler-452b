import React from 'react';
import { Line } from 'react-chartjs-2';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsLineChart = ({ statsData }) => {
  const data = {
    labels: ['Members', 'Activities', 'Projects'],
    datasets: [
      {
        label: 'Statistics',
        data: [statsData.Members, statsData.Activities, statsData.Projects],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Growth',
        data: [statsData.Members * 0.8, statsData.Activities * 1.2, statsData.Projects * 1.5],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Club Statistics & Growth'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(255,255,255,0.1)',
        },
        ticks: {
          color: 'white'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },

        ticks: {
          color: 'white'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        }
      }
    },
  };

  return <Line data={data} options={options} />;
};

export default StatsLineChart;


import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TotalMembersChart = () => {
  const data = {
    labels: ['2021', 'Jan', 'May', '2022', 'Jan', 'May', '2023', 'Jan', 'May', '2024', 'Jan', 'May'],  
    datasets: [
      {
        label: 'Total Members',
        data: [200, 200, 400, 600, 1200, 2000, 2532, 3044, 3803, 4604, 5023, 5800],  
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 177, 193)', 
        pointBorderColor: 'rgb(255, 99, 132)', 
        pointRadius: 8,  
        pointHoverRadius: 10,  
        pointStyle: 'circle',  
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
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 6000,  
        title: {
          display: true,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      
    },
  };

  return <Line data={data} options={options} />;
};

export default TotalMembersChart;

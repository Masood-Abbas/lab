import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
            label: 'Reports',
            data: [12, 19, 3, 5, 2],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, []);

  return <canvas ref={chartContainer} />;
};

export default LineChart;
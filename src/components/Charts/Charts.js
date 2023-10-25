import './Charts.css';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Charts = () => {
  const [series, setSeries] = useState([44, 55, 41, 17, 35]);
  const [labels, setLabels] = useState(['A', 'B', 'C', 'D', 'E']);
  const backendURL = process.env.REACT_APP_BACKEND_URL; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/get-components-length`);
        if (response.ok) {
          const data = await response.json();
          const countValues = data.map(item => item.count);
          const labelValues = data.map(item => item.category);
          setSeries(countValues);
          setLabels(labelValues);
        } else {
          console.log("Error fetching components");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  //options for polar chart
  const options = {
    chart: {
      id: 'basic-polar-area',
      foreColor: '#333', 
    },
    labels: labels,
    colors: ['#366BA1', '#4482C1', '#6699CC', '#88B0D7', '#ABC7E3'], 
  };

  //options for column chart
  const columnOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to true for horizontal bars
        columnWidth: '50%', // Adjust the width of the bars here (percentage or number of pixels)
      },
    },
    xaxis: {
      categories: ['Gaming PCs', 'Content PCs', 'Office/Home', 'Custom/Others'],
    },
     colors: ['#8699A3', '#8699A3', '#8699A3', '#8699A3'],
  };

  const columnSeries = [
    {
      name: ['Gaming PCs', 'Content PCs', 'Office/Home', 'Custom/Others'],
      data: [30, 40, 45, 50],
      barWidth: '40%',
    },
  ];

  return (
    <>
      <div className='charts-container'>
        <div className='chart'>
          <Chart options={columnOptions} series={columnSeries} type="bar" width={400} />
        </div>
    
        <div className='chart'>
          <Chart options={options} series={series} type='polarArea' width={400} />
        </div>
      </div>
    </>
  );
};

export default Charts;

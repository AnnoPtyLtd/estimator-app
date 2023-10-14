import './Charts.css';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts'

const Charts = () => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([44, 55, 41, 17, 35]);
    const [labels, setLabels] = useState(['A', 'B', 'C', 'D', 'E']);
  
    const options2 = {
        chart: {
          id: 'basic-line'
        },
        series: [
          {
            name: 'Series 1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
          }
        ],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      };

    return (
        <div className='charts-container'>
            <div className='chart'>
                <Chart options={options} series={series} type='polarArea' width={400} />
            </div>
            <div className='chart'>
            <Chart options={options2} series={options2.series} type="line" width={400} />
            </div>
        </div>
    );
}



export default Charts

// import './Charts.css';
// import React, { useState, useEffect } from 'react';
// import Chart from 'react-apexcharts'

// const Charts = () => {
//   const [options, setOptions] = useState({});
//   const [series, setSeries] = useState([44, 55, 41, 17, 35]);
//   const [labels, setLabels] = useState(['A', 'B', 'C', 'D', 'E']);

//   const options2 = {
//     chart: {
//       id: 'basic-line'
//     },
//     series: [
//       {
//         name: 'Series 1',
//         data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
//       }
//     ],
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
//     }
//   };


//   //options for column chart
//   const columnOptions = {
//     chart: {
//       type: 'bar',
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false, // Set to true for horizontal bars
//         columnWidth: '50%', // Adjust the width of the bars here (percentage or number of pixels)
//       },
//     },
//     xaxis: {
//       categories: ['Gaming PCs', 'Content PCs', 'Office/Home', 'Custom/Others'],
//     },
//   };

//   const columnSeries = [
//     {
//       name: 'Series 1',
//       data: [30, 40, 45, 50],
//       barWidth: '40%',
//     },
//   ];



//   useEffect(() => {
//     const func = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/get-components-length`);
//         if (response.ok) {
//           const data = await response.json();
//           const countValues = data.map(item => item.count);
//           const labelValues = data.map(item => item.category);
//           setSeries(countValues);
//           setLabels(labelValues);
//         } else {
//           console.log("Error fetching components");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     func();
//   }, []);

//   return (
//     <>
//       <div className='charts-container'>
//         <div className='chart'>
//           <Chart options={{ ...options, labels: labels }} series={series} type='polarArea' width={400} />
//         </div>

//       </div>
//       <div className='charts-container'>
//         <div className='chart'>
//           <Chart options={columnOptions} series={columnSeries} type="bar" width={400} />
//         </div>
//       </div>
//     </>
//   );
// }



// export default Charts


import './Charts.css';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Charts = () => {
  const [series, setSeries] = useState([44, 55, 41, 17, 35]);
  const [labels, setLabels] = useState(['A', 'B', 'C', 'D', 'E']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-components-length`);
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
  };

  const columnSeries = [
    {
      name: 'Series 1',
      data: [30, 40, 45, 50],
      barWidth: '40%',
    },
  ];

  const options = {
    chart: {
      id: 'basic-polar-area',
      foreColor: '#333', // Set the color for chart elements (monochrome)
    },
    labels: labels,
    colors: ['#333', '#666', '#999', '#ccc', '#ddd'], // Colors for chart segments
  };

  return (
    <>
      <div className='charts-container'>
        <div className='chart'>
          <Chart options={columnOptions} series={columnSeries} type="bar" width={400} />
        </div>
      </div>
      <div className='charts-container'>
        <div className='chart'>
          <Chart options={options} series={series} type='polarArea' width={400} />
        </div>
      </div>
    </>
  );
};

export default Charts;

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from "prop-types";

export const LineChart = (props) => {
  const { riskDetailsLine, yearRange } = props;
  const [useDate, setUseDate] = useState('')
  useEffect(() => {
    if (yearRange.startYear) {
      let { month, date, year } = yearRange.startYear;
      let { endYear } = yearRange;
      let startYear = endYear.year != new Date().getFullYear() ? year : new Date().getFullYear();
      let d = ` ( ${month}/${date}/${startYear} - ${endYear.month}/${endYear.date}/${endYear.year} )`
      setUseDate(d)
    }
  }, [yearRange])
  const state = {
    series: [
      {
        name: "High",
        data: riskDetailsLine.HightCount
      },
      {
        name: "Medium ",
        data: riskDetailsLine.MediumCount
      },
      {
        name: "Low ",
        data: riskDetailsLine.LowCount
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 8,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#f92d49", '#f9cd13', '#11b684'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        // text: 'Average High & Low Temperature',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          offsetY: 20,
          offsetX: 0,
          text: `Month ${useDate}`
        }
      },
      yaxis: {
        title: {
          text: 'Risk Count'
        },
        min: 0,
        max: 20
      },
      legend: {
        show: true,
        offsetY: -15,
        offsetX: 0,
      }
    },


  };

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      <div style={{ textAlign: 'center',paddingBottom:10 }}><i className="material-icons" style={{fontSize:14}}>info_outline</i> <span style={{paddingBottom:10}}> Date range starts from the current year onward.</span></div>
    </div>
  )
}
LineChart.propTypes = {
  riskDetailsLine: PropTypes.any,
  yearRange: PropTypes.any,
};

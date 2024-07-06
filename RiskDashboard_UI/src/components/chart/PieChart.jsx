import React, { useEffect, useRef, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

const PieChart = (props) => {
  const pieChartRef = useRef();
  let { data, setFilterRiskDataFunction } = props
  let state = {

    series: data,
    options: {
      legend: {
        show: true,
        position: 'bottom'
      },
      // fill: {
      //   type: 'gradient',
      // },
      chart: {
        id: "chart",
        zoom: {
          enabled: true
        },
        width: 700,
        type: 'pie',
        events: {
          // click: function (event, chartContext, config) {
          //   let chartName = ["WIP", "Open", "Occured", "Closed"];
          //   let filterList = filterData("status", chartName[config.dataPointIndex], null);

          // },
          Selection: function (event, chartContext, config) {
          },
          dataPointSelection: function (event, chartContext, config) {
            setFilterRiskDataFunction(config.dataPointIndex, config.w.config.chart.type)
            // setListData(filterList)
          }
        },
      },

      colors: ["#fb947a", "#be87f7", "#767777", "#0dba84"],
      labels: ["WIP", "open", "occured", "Closed"],
      responsive: [{
        breakpoint: 880,
        offsetX: 0,
        offsetY: 0,
        options: {
          chart: {
            width: 600
          },
        }
      }],

    },
  };
  return (
    <ReactApexChart ref={pieChartRef} options={state.options} series={state.series} type="pie" height={250} />
  )
}

export default PieChart;

PieChart.propTypes = {
  data: PropTypes.any,
  setFilterRiskDataFunction: PropTypes.any,
};

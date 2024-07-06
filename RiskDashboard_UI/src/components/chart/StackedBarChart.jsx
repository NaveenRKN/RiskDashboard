import React from 'react'
import ReactApexChart from 'react-apexcharts';
import PropTypes from "prop-types";

export const StackedBarChart = (props) => {
  const { data, setFilterRiskDataFunction } = props;
  const state = {

    series: [{
      name: "High",
      data: data.highRiskData,
      color: '#f92d49'
    },
    {
      name: 'Medium',
      data: data.mediumRiskData,
      color: '#f9cd13'
    },
    {
      name: 'Low',
      data: data.lowRiskData,
      color: '#11b684'
    }],
    options: {
      chart: {
        type: 'bar',
        height: 450,
        stacked: true,
        toolbar: {
          show: false
        },
        events: {

          Selection: function (event, chartContext, config) {
          },
          dataPointSelection: function (event, chartContext, config) {
            let a = config.selectedDataPoints;
            let keyValue = 0
            a.forEach(function (value, key) {
              keyValue = key
            });
            setFilterRiskDataFunction(config.dataPointIndex, config.w.config.chart.type, keyValue)
          }
        },
      },
      dataLabels: {
        enabled: true
      },
      color: [],
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: '13px',
                fontWeight: 900
              }
            }
          }
        },
      },

      stroke: {
        width: 1,
        // colors: ['#fff']
      },
      title: {
        text: ''
      },
      legend: {
        show: true
      },

      xaxis: {
        categories: ["Operational",
          "Compliance",
          "Business",
          "External",
          "Information Security",
          "Management Risk",
          "Privacy",
          "Privact HIPAA",
          "Resource",
          "Technical"
        ],
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      fill: {
        opacity: 1
      },
    },
  };
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}
StackedBarChart.propTypes = {
  data: PropTypes.any,
  setFilterRiskDataFunction: PropTypes.any,
};

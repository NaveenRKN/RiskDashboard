import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import PropTypes from "prop-types";

export const Circularchart = (props) => {
  const { data, setFilterRiskDataFunction } = props;
  const state = {
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
        type: 'donut',
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

      colors: ["#f92d49", '#f9cd13', '#11b684'],
      labels: ['High', 'Medium', 'Low'],
      responsive: [{
        breakpoint: 880,
        offsetX: 0,
        offsetY: 0,
        options: {
          chart: {
            width: 600
          },
          legend: {
            show: true
          }
        }
      }],

    }
  }
  // const state = {
  //   series: data,
  //   options: {
  //     chart: {
  //       height: 390,
  //       type: 'radialBar',
  //       toolbar: {
  //         show: false
  //       },

  //     },
  //     plotOptions: {
  //       radialBar: {
  //         offsetY: 0,
  //         startAngle: 0,
  //         endAngle: 270,
  //         hollow: {
  //           margin: 5,
  //           size: '40%',
  //           background: 'transparent',
  //           image: undefined,
  //         },
  //         dataLabels: {
  //           name: {
  //             show: true,
  //             formatter: function (val, opts) {
  //               // return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
  //             },
  //           },
  //           value: {
  //             show: true,
  //             formatter: function (val, opts) {
  //               return val
  //               // return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
  //             },
  //           },
  //           total: {
  //             show: false,
  //           }
  //         }
  //       }
  //     },
  //     colors: ["#f92d49", '#f9cd13', '#11b684'],
  //     labels: ['High', 'Medium', 'Low'],
  //     legend: {
  //       show: true,
  //       floating: true,
  //       fontSize: '16px',
  //       position: 'left',
  //       offsetX: 45,
  //       offsetY: 50,
  //       labels: {
  //         useSeriesColors: true,
  //       },
  //       markers: {
  //         size: 0
  //       },
  //       formatter: function (seriesName, opts) {
  //         return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
  //       },
  //       itemMargin: {
  //         vertical: 3
  //       }
  //     },
  //     responsive: [{
  //       breakpoint: 480,
  //       options: {
  //         legend: {
  //           show: false
  //         }
  //       }
  //     }]
  //   },


  // };
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="pie" height={350} />
    </div >
  )
}
Circularchart.propTypes = {
  data: PropTypes.any,
  setFilterRiskDataFunction: PropTypes.any,
};

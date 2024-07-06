import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import PropTypes from "prop-types";
export const Columnchart = (props) => {
  const { data, setFilterRiskDataFunction } = props;
  const state = {

    series: [{
      data: data
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        },
        events: {
          Selection: function (event, chartContext, config) {
          },
          dataPointSelection: function (event, chartContext, config) {
            setFilterRiskDataFunction(config.dataPointIndex, config.w.config.chart.type + 'column')
          }
        },
      },
      title: {
        text: ''
      },
      //   colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ["No of risk in between ", "0-6 Month"],
          ["No of risk in between", "6-12 Month"],
          ["No of risk in between", "12-18 Month"],
          ["No of risk in between", "18-24 Month"],
          ["No of risk in between", "> 65 Month"],
        ],
        labels: {
          style: {
            // colors: colors,
            fontSize: '12px'
          }
        }
      }
    },


  };
  //    state = {

  //         series: [{
  //           name: 'Inflation',
  //           data: [2,50,98,46,57]
  //         }],
  //         options: {
  //           chart: {
  //             height: 350,
  //             type: 'bar',
  //           },
  //           plotOptions: {
  //             bar: {
  //               borderRadius: 10,
  //               dataLabels: {
  //                 position: 'top', // top, center, bottom
  //               },
  //             }
  //           },
  //           dataLabels: {
  //             enabled: true,
  //             formatter: function (val) {
  //               return val + "%";
  //             },
  //             offsetY: -20,
  //             style: {
  //               fontSize: '12px',
  //               colors: ["#304758"]
  //             }
  //           },

  //           xaxis: {
  //             categories: [["Risks above","2000 days"],
  //             ["No of Risks betweeen","500 - 1000 days"],
  //            [ "No of Risks i between","1001-2000 days"],
  //             ["No of Risks between","250-501 days"],
  //             ["No of Risks in between","0-200 days"]],
  //             position: 'bottom',
  //             // labels: {
  //             //     show: true,
  //             //     formatter: function (val) {
  //             //       return val + "%";
  //             //     }
  //             //   },
  //             axisBorder: {
  //               show: false
  //             },
  //             axisTicks: {
  //               show: false
  //             },
  //             crosshairs: {
  //               fill: {
  //                 type: 'gradient',
  //                 gradient: {
  //                   colorFrom: '#D8E3F0',
  //                   colorTo: '#BED1E6',
  //                   stops: [0, 100],
  //                   opacityFrom: 0.4,
  //                   opacityTo: 0.5,
  //                 }
  //               }
  //             },
  //             tooltip: {
  //               enabled: true,
  //             }
  //           },
  //           yaxis: {
  //             axisBorder: {
  //               show: false
  //             },
  //             axisTicks: {
  //               show: false,
  //             },
  //             labels: {
  //               show: false,
  //               formatter: function (val) {
  //                 return val + "%";
  //               }
  //             }

  //           },
  //           title: {
  //             text: 'Monthly Inflation in Argentina, 2002',
  //             floating: true,
  //             offsetY: 330,
  //             align: 'center',
  //             style: {
  //               color: '#444'
  //             }
  //           }
  //         },


  //       };
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}
Columnchart.propTypes = {
  data: PropTypes.any,
  setFilterRiskDataFunction: PropTypes.any,
};


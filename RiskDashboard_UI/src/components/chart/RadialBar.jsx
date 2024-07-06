

import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import PropTypes from "prop-types";

export const RadialBar = (props) => {
    const { data,   tableChange } = props; 
    const state = {
        series: data,
        options: {
            chart: {
                height: 390,
                type: 'radialBar',
                toolbar: {
                    show: false
                }
            },

            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 5,
                        size: '40%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            formatter: function (val, opts) { 
                                tableChange(val)
                                // return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                            },
                        },
                        value: {
                            show: true,
                            formatter: function (val, opts) { 
                                return val
                                // return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                            },
                        },
                        total: {
                            show: false,
                        }
                    }
                }
            },
            colors: ["#f92d49", '#f9cd13', '#f9a3a4d9'],
            labels: ['Open', 'WIP', 'Occurred'],
            legend: {
                show: true,
                floating: true,
                fontSize: '16px',
                position: 'left',
                offsetX: 45,
                offsetY: 50,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    size: 0
                },
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
                itemMargin: {
                    vertical: 3
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },


    };
    return (
        <div>
            <ReactApexChart options={state.options} series={state.series} type="radialBar" height={350} />
        </div >
    )
}
RadialBar.propTypes = {
    data: PropTypes.any,
    tableChange: PropTypes.any,
  };
  
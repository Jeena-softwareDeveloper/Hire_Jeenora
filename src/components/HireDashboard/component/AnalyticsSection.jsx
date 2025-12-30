import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetDashboardAnalytics } from '../../../hooks/useDashboard';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../../utils/utils';

const AnalyticsSection = () => {
    const [activeTimeFrame, setActiveTimeFrame] = useState('week');
    const { data: analyticsData, isLoading, isFetching } = useGetDashboardAnalytics(activeTimeFrame);

    const timeFrames = [
        { id: 'week', label: 'Last 7 Days' }
    ];

    const chartData = {
        series: analyticsData?.chartData?.series || [
            {
                name: "Applications",
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 135, 150]
            }
        ],
        options: {
            chart: {
                background: 'transparent',
                foreColor: '#fff',
                toolbar: {
                    show: true,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true
                    }
                },
                zoom: { enabled: true },
                animations: { enabled: true, speed: 800 }
            },
            colors: ['#22c55e', '#3b82f6', '#f59e0b'],
            dataLabels: { enabled: false },
            stroke: {
                curve: 'smooth',
                width: 3,
                lineCap: 'round'
            },
            xaxis: {
                categories: analyticsData?.chartData?.categories || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { colors: '#fff' } }
            },
            yaxis: {
                labels: { style: { colors: '#fff' } },
                title: {
                    text: 'Number of Applications',
                    style: { color: '#fff' }
                }
            },
            grid: {
                borderColor: '#ffffff20',
                strokeDashArray: 5,
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } }
            },
            legend: {
                position: 'top',
                labels: { colors: '#fff' },
                itemMargin: { horizontal: 20 }
            },
            tooltip: {
                theme: 'dark',
                x: { show: true },
                y: {
                    formatter: function (val) {
                        return val + ' applications'
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: { height: 300 },
                        legend: { position: 'bottom' }
                    }
                }
            ]
        },
    };

    return (
        <div className="bg-gradient-to-r from-green-800 to-emerald-900 rounded-2xl p-6 shadow-lg relative min-h-[450px]">
            {isFetching && !isLoading && (
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
                    <PropagateLoader color='#fff' size={10} />
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white">Application Analytics</h3>
                    <p className="text-emerald-200 text-sm">Track application activity over time</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    {timeFrames.map((frame) => (
                        <button
                            key={frame.id}
                            onClick={() => setActiveTimeFrame(frame.id)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${activeTimeFrame === frame.id
                                ? 'bg-white text-green-900 font-medium'
                                : 'text-emerald-200 hover:bg-emerald-700'
                                }`}
                        >
                            {frame.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                    <PropagateLoader color='#fff' />
                </div>
            ) : (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={400}
                    className="apex-chart"
                />
            )}
        </div>
    );
};

export default AnalyticsSection;

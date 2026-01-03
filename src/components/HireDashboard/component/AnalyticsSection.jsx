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
                foreColor: '#64748b', // Slate-500
                toolbar: { show: false },
                zoom: { enabled: false },
                animations: { enabled: true, speed: 800 }
            },
            colors: ['#06b6d4'], // Cyan-500 (Blue-Green)
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100]
                }
            },
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
                labels: {
                    style: { colors: '#94a3b8', fontSize: '12px', fontFamily: 'Outfit' }
                }
            },
            yaxis: {
                labels: {
                    style: { colors: '#94a3b8', fontSize: '12px', fontFamily: 'Outfit' }
                },
            },
            grid: {
                borderColor: '#e2e8f0', // Slate-200
                strokeDashArray: 4,
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                padding: { top: 0, right: 0, bottom: 0, left: 10 }
            },
            legend: {
                show: false
            },
            tooltip: {
                theme: 'light',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Outfit',
                },
                x: { show: true },
                y: {
                    formatter: function (val) {
                        return val + ' applications'
                    }
                },
                marker: { show: true },
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: { height: 300 }
                    }
                }
            ]
        },
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/50 relative min-h-[400px]">
            {isFetching && !isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
                    <PropagateLoader color='#06b6d4' size={10} />
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">Application Analytics</h3>
                    <p className="text-slate-500 text-sm mt-1">Track application activity over time</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    {timeFrames.map((frame) => (
                        <button
                            key={frame.id}
                            onClick={() => setActiveTimeFrame(frame.id)}
                            className={`px-4 py-2 text-sm rounded-lg transition-all shadow-sm border ${activeTimeFrame === frame.id
                                ? 'bg-white text-slate-800 font-semibold border-slate-200 ring-1 ring-slate-100'
                                : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'
                                }`}
                        >
                            {frame.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="h-[350px] flex items-center justify-center">
                    <PropagateLoader color='#06b6d4' />
                </div>
            ) : (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="area"
                    height={350}
                    className="w-full"
                />
            )}
        </div>
    );
};

export default AnalyticsSection;


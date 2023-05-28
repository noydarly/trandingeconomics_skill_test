import React from 'react';
import Chart from 'react-apexcharts';

const GDPChart = ({ id, chartData, width, height, color }) => {
    const chartRef = React.useRef(null);
    const options = {
        chart: {
            id: id
        },
        xaxis: {
            categories: chartData.map(item => item.DateTime)
        },
        colors: [color || '#ff0000']
    };

    const chartSeries = [
        {
            name: 'GDP',
            data: chartData.map(item => item.Value),
        },
    ];

    return (
        <div ref={chartRef} style={{ width: width, height: height, marginTop: '50px' }}>
            <Chart options={options} series={chartSeries} type="line" />
        </div>
    );
};

export default GDPChart;

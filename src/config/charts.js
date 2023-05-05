export const singleRangBarChartConfig = {
    chart: {
        type: "rangeBar",
        events: {
            click(_, __, config) {
                const dataIndex = config.dataPointIndex
                const seriesIndex = config.seriesIndex
                console.log(seriesIndex, dataIndex)
            },
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: false,
            dataLabels: {
                hideOverflowingLabels: false,
            },
            barHeight: "50%",
        },
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return val[1] - val[0] + " h"
        },
        style: {
            colors: ["#f3f4f5", "#fff"],
        },
    },
    xaxis: {
        type: "numberic",
    },
    yaxis: {
        show: true,
        style: {
            fontSize: "16px",
            fontWeight: 600,
        },
    },
    grid: {
        row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 0.7,
        },
    },
}

export const mutilSeriesRangeBarChartConfig = {
    chart: {
        height: 450,
        type: "rangeBar",
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: "80%",
            rangeBarGroupRows: false,
        },
    },
    xaxis: {
        type: "datetime",
    },
    stroke: {
        width: 1,
    },
    fill: {
        type: "solid",
        opacity: 0.6,
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            return opts.w.globals.seriesNames[opts.seriesIndex]
        },
        style: {
            colors: ["#f3f4f5", "#fff"],
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "left",
    },
}

var graphicWindBars = {

    chart: {
        type: 'windbarb'
    },

    title: {
        text: 'Highcharts Wind Barbs'
    },

    credits: {
        enabled: false
    },

    exporting: { 
        enabled: false
    },

    xAxis: {
        type: 'datetime',
        offset: 40
    },

    /*plotOptions: {
        series: {
            pointStart: Date.UTC(2017, 0, 29),
            pointInterval: 36e5
        }
    },*/

    series: [{
        type: 'windbarb',
        data: [
        ],
        name: 'Wind',
        color: 'blue',
        showInLegend: false,
        tooltip: {
            valueSuffix: ' m/s'
        }
    }, {
        type: 'area',
        keys: ['x','y', 'rotation'], // rotation is not used here
        data: [
        ],
        color: 'blue',
        fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, 'blue'],
                [1, 'green']
            ]
        },
        name: 'Wind speed',
        tooltip: {
            valueSuffix: ' m/s'
        }
    }]

};

module.exports = graphicWindBars;
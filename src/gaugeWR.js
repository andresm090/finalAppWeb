var gaugeWR = {

    series: [{
            "name": "velocidad",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 0
        }, {
            "name": "0.5-2 m/s",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 1
        }, {
            "name": "2-4 m/s",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 2
        }, {
            "name": "4-6 m/s",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 3
        }, {
            "name": "6-8 m/s",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 4
        }, {
            "name": "8-10 m/s",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 5
        }, {
            "name": "&gt; 10 m/s",
            "data": [
                ["N", 0],
                ["NNE", 0],
                ["NE", 0],
                ["ENE", 0],
                ["E", 0],
                ["ESE", 0],
                ["SE", 0],
                ["SSE", 0],
                ["S", 0],
                ["SSW", 0],
                ["SW", 0],
                ["WSW", 0],
                ["W", 0],
                ["WNW", 0],
                ["NW", 0],
                ["NNW", 0]
            ],
            "_colorIndex": 6
        }],

    chart: {
        polar: true,
        type: 'column'
    },

    title: {
        text: 'Veleta'
    },

    credits: {
      enabled: false
      //text: 'IoT aplication',
      //href: 'http://localhost:3000/'
    },

    exporting: { 
      enabled: false
    },

    pane: {
        size: '85%'
    },

    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical',
        enabled: false
    },

    xAxis: {
        tickmarkPlacement: 'on', 
        categories: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
    },

    yAxis: {
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        title: {
            text: 'Vel. (m/s)'
        },
        labels: {
            formatter: function () {
                return this.value + 'm/s';
            }
        },
        reversedStacks: false
    },

    tooltip: {
        valueSuffix: 'm/s'
    },

    plotOptions: {
        series: {
            stacking: 'normal',
            shadow: false,
            groupPadding: 0,
            pointPlacement: 'on'
        }
    },

    responsive: {
        rules: [{
            condition: {
                maxWidth: 360
            },
            chartOptions: {
                chart: {
                    className: 'small-chart' // definir en css
                }
            }
        }]
    }

};

module.exports = gaugeWR;
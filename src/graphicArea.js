var graphicArea = {

	title: {
        text: 'Radiacion'
    },

    credits: {
        enabled: false
    },

    exporting: { 
        enabled: false
    },

    xAxis: {
        type: 'datetime',
        offset: 0
    },

    yAxis: {
        title: {
            text: 'C°'
        }
    },

    /*plotOptions: {
        series: {
            pointStart: Date.UTC(2017, 0, 29),
            pointInterval: 36e5 // por hora
            //pointInterval: 600000 // 10 minutales
        }
    },*/

    series: [{
        type: 'area',
        keys: ['y', 'x'], // rotation is not used here
        data: [
            [9.8],
            [10.1],
            [11.3],
            [10.9]
        ],
        color: 'red',
        fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, 'red'],
                [1, 'yellow']
            ]
        },
        name: 'Radiacion solar',
        tooltip: {
            valueSuffix: ' Kw/m2'
        }
    }]

}

module.exports = graphicArea;
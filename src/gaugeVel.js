var gaugeVel = {

	chart: {
        type: 'gauge',
        alignTicks: false,
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },

    title: {
        text: 'Anemómetro'
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
        startAngle: -150,
        endAngle: 150
    },

    yAxis: [{
        min: 0,
        max: 100,
        lineColor: '#339',
        tickColor: '#339',
        minorTickColor: '#339',
        offset: -25,
        lineWidth: 2,
        labels: {
            distance: -20,
            rotation: 'auto'
        },
        tickLength: 5,
        minorTickLength: 5,
        endOnTick: false
    }, {
        min: 0,
        max: 360,
        tickPosition: 'outside',
        lineColor: '#933',
        lineWidth: 2,
        minorTickPosition: 'outside',
        tickColor: '#933',
        minorTickColor: '#933',
        tickLength: 5,
        minorTickLength: 5,
        labels: {
            distance: 12,
            rotation: 'auto'
        },
        offset: -20,
        endOnTick: false
    }],

    series: [{
        name: 'Velocidad',
        data: [0],
        dataLabels: {
            formatter: function () {
            },
            backgroundColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#DDD'],
                    [1, '#FFF']
                ]
            }
        },
        tooltip: {
            valueSuffix: ' m/s'
        }
    }]

};

module.exports = gaugeVel;
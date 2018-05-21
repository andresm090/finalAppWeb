var gaugeTemp = {

	chart: {
		type: 'gauge',
		plotBackgroundColor: null,
		plotBackgroundImage: null,
		plotBorderWidth: 0,
		plotShadow: false
	},

	title: {
		text: 'Termometro'
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
		endAngle: 150,
		background: [{
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#FFF'],
					[1, '#333']
				]
			},
			borderWidth: 0,
			outerRadius: '109%'
		}, {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#333'],
					[1, '#FFF']
				]
			},
			borderWidth: 1,
			outerRadius: '107%'
		}, {
			// default background
		}, {
			backgroundColor: '#DDD',
			borderWidth: 0,
			outerRadius: '105%',
			innerRadius: '103%'
		}]
	},

	// the value axis
	yAxis: {
		min: -20,
		max: 60,

		minorTickInterval: 'auto',
		minorTickWidth: 1,
		minorTickLength: 10,
		minorTickPosition: 'inside',
		minorTickColor: '#666',

		tickPixelInterval: 30,
		tickWidth: 2,
		tickPosition: 'inside',
		tickLength: 10,
		tickColor: '#666',
		labels: {
			step: 2,
			rotation: 'auto'
		},
		title: {
			text: 'C°'
		},
		plotBands: [{
			from: -20,
			to: 0,
			color: '#2E9AFE' // azul
		},	{
			from: 0,
			to: 25,
			color: '#55BF3B' // verde
		}, {
			from: 25,
			to: 40,
			color: '#DDDF0D' // amarillo
		}, {
			from: 40,
			to: 60,
			color: '#DF5353' // rojo
		}]
	},

	series: [{
		name: 'temperatura',
		data: [0],
		tooltip: {
			valueSuffix: ' C°'
		}
	}],

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

module.exports = gaugeTemp;
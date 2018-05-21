var gaugeInc = {

	title: {
        text: 'Inclinacion panel fotovoltaico'
    },

    yAxis: {
        title: {
            text: ''
        },
        max: 15
    },
    credits: {
            enabled: false
        },

        exporting: { 
	  		enabled: false
		},
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 1
        }
    },

    tooltip: {
    	enabled: false
    },

    series: [{
        name: 'Panel Fotovoltaico',
        data: [{x:0, y:0}, {x:0, y:0}]
    	}, {
    	name:'a',
      	data: [{
      		x: 1.7,
            y: 13,
            marker: {
                symbol: 'url(/public/images/sun.png)'
            }
        }]
    	}, {
        name: 'soporte',
        data: [{x:0, y:0}, {x:0, y:0}]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 200
            },
        }]
    }

};

module.exports = gaugeInc;


/*
Serie de datos para Invierno (Valores esperados entre los 60° de inclinación)

series: [{
        name: 'Panel Fotovoltaico',
        data: [{x:1, y:1}, {x:5, y:16}]
    }, {
    	name:'a',
      data: [{
      			x: 1.7,
            y: 13,
            marker: {
                symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
            }
        }]
    }, {
        name: 'soporte',
        data: [{x:3, y:0}, {x:3, y:8.5}]
    }],

*/

/*
Serie de datos para Otoño (Valores esperados entre los 40° de inclinación)

series: [{
    name: 'Panel Fotovoltaico',
    data: [{x:1, y:1}, {x:5, y:12.5}]
}, {
	name:'a',
  data: [{
  			x: 1.7,
        y: 13,
        marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
        }
    }]
}, {
    name: 'soporte',
    data: [{x:3, y:0}, {x:3, y:6.5}]
}],

*/

/*
Serie de datos para Primavera (Valores esperados entre los 20° de inclinación)

series: [{
        name: 'Panel Fotovoltaico',
        data: [{x:1, y:1}, {x:5, y:10}]
    }, {
    	name:'a',
      data: [{
      			x: 1.7,
            y: 13,
            marker: {
                symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
            }
        }]
    }, {
        name: 'soporte',
        data: [{x:3, y:0}, {x:3, y:5.5}]
    }],
*/

/*
Serie de datos para Verano (Valores esperados entre los 12° de inclinación)

series: [{
        name: 'Panel Fotovoltaico',
        data: [{x:1, y:1}, {x:5, y:7}]
    }, {
    	name:'a',
      data: [{
      			x: 1.7,
            y: 13,
            marker: {
                symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
            }
        }]
    }, {
        name: 'soporte',
        data: [{x:3, y:0}, {x:3, y:4}]
    }],
*/
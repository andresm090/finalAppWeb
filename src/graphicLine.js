var graphicLine = {

	title: {
        text: 'Potencia (Consumida - Generada)'
    },

    subtitle: {
        text: 'KwH'
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
            text: 'KwH'
        }
    },

    /*plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },*/

    series: [{
        name: 'Potencia',
        keys: ['y', 'x'], 
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

};

module.exports = graphicLine;
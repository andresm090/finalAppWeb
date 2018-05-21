var statebarPN = {

    chart: {
        type: 'bar',
        plotBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
                [0, '#FFFFFF'],
                [0.1, '#FFFFFF'],
                [0.5, '#FFFFFF'],
                [0.9, '#FFFFFF'],
                [1, '#FFFFFF']
            ]
        },
        height: 360,
    },
    title: {
        text: 'Potencia del Aerogenerador'
    },
    subtitle: {
        text: 'Potencia Nominal / Potencia Instantánea'
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    xAxis: {
        categories: ['1'],
        title: {
            text: 'N° Aerogenerador'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Potencia (Watt)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' Watt'
        //pointFormat: '<b>{series.name}</b> (Con un maximo esperado del {point.y}% de 1000W)'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
    },
    series: [{
        name: 'Potencia Instantánea',
        pointPadding: 0.4,
        color: '#C02316',
        data: [0]
    },{
        name: 'Potencia Nominal',
        pointPadding: 0.65,
        color: '#93CEEA',
        data: [0]
    }]


};

module.exports = statebarPN;

/*

chart: {
        inverted: true,
        marginLeft: 135,
        type: 'bullet'
    },
    title: {
        text: null
    },
    legend: {
        enabled: false
    },
    yAxis: {
        gridLineWidth: 0
    },
    plotOptions: {
        series: {
            pointPadding: 0.25,
            borderWidth: 0,
            color: '#000',
            targetOptions: {
                width: '200%'
            }
        }
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    xAxis: {
        categories: ['<span class="hc-cat-title">Potencia</span><br/>Watt']
    },
    yAxis: {
        plotBands: [{
            from: 0,
            to: 20,
            color: '#666'
        }, {
            from: 20,
            to: 25,
            color: '#999'
        }, {
            from: 25,
            to: 100,
            color: '#bbb'
        }],
        labels: {
            format: '{value}%'
        },
        title: null
    },
    series: [{
        data: [{
            y: 30,
            z: 300,
            target: 90
        }]
    }],
    tooltip: {
        pointFormat: '<b>{point.z}</b> (Con un maximo esperado del {point.target}% de 1000W)'
    }


*/
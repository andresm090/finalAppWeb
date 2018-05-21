var gaugeVA = {

    chart: {
        type: 'gauge',
        plotBorderWidth: 1,
        plotBackgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
                [0, '#93CEEA'],
                [0.3, '#FFFFFF'],
                [1, '#93CEEA']
            ]
        },
        plotBackgroundImage: null,
        height: 220
    },

    title: {
        text: 'Consumos y estado de las baterías'
    },

    subtitle: {
        text: 'Voltaje Banco de Baterias - Amperaje consumido'
    },

    credits: {
      enabled: false
      //text: 'IoT aplication',
      //href: 'http://localhost:3000/'
    },

    exporting: { 
      enabled: false
    },

    pane: [{
        startAngle: -45,
        endAngle: 45,
        background: null,
        center: ['25%', '145%'],
        size: 300
    }, {
        startAngle: -45,
        endAngle: 45,
        background: null,
        center: ['75%', '145%'],
        size: 300
    }],

    tooltip: {
        enabled: false
    },

    yAxis: [{
        min: 0,
        max: 48,
        minorTickPosition: 'outside',
        tickPosition: 'outside',
        labels: {
            rotation: 'auto',
            distance: 20
        },
        plotBands: [{
            from: 36,
            to: 48,
            color: '#C02316',
            innerRadius: '100%',
            outerRadius: '105%'
        }],
        pane: 0,
        title: {
            text: 'V<br/><span style="font-size:8px">Voltímetro</span>',
            y: -40
        }
    }, {
        min: 0,
        max: 100,
        minorTickPosition: 'outside',
        tickPosition: 'outside',
        labels: {
            rotation: 'auto',
            distance: 10
        },
        plotBands: [{
            from: 80,
            to: 100,
            color: '#C02316',
            innerRadius: '100%',
            outerRadius: '105%'
        }],
        pane: 1,
        title: {
            text: 'Amp<br/><span style="font-size:8px">Amperímetro</span>',
            y: -40
        }
    }],

    plotOptions: {
        gauge: {
            dataLabels: {
                enabled: false
            },
            dial: {
                radius: '100%'
            }
        }
    },

    series: [{
        name: 'Voltímetro',
        data: [0],
        yAxis: 0
    }, {
        name: 'Amperímetro',
        data: [0],
        yAxis: 1
    }]

};

module.exports = gaugeVA;
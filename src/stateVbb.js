var gaugeStateVbb = {

	chart: {
        type: 'solidgauge',
        height: '100%',
    },

    title: {
        text: 'Estado de Carga',
        style: {
            fontSize: '18px'
        }
    },

    credits: {
    	enabled: false
    },

    exporting: { 
    	enabled: false
    },

    tooltip: {
    	enabled: false,
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
            fontSize: '16px',
        },
        //pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
        /*positioner: function (labelWidth) {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }*/
    },

    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
            outerRadius: '100%',
            innerRadius: '90%',
            backgroundColor: '#EEE',
            borderWidth: 1
        }]
    },

    yAxis: {
    	stops: [
            [0.3, '#FE2E2E'], // red
            [0.6, '#DDDF0D'], // yellow
            [0.8, '#55BF3B'] // green
        ],
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: true,
                //format: '<span style=\"font-family: &quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif; font-size: 11px; position: absolute; white-space: nowrap; font-weight: bold; color: rgb(0, 0, 0); margin-left: 0px; margin-top: 0px; left: 5px; top: 5px;\"><div style=\"z-index:-9999; text-align:center; width:70px;\"><span style=\"font-size:16px;color:black\">{point.y}</span><br><span style=\"font-size:11px; color: #888888; position:relative; top:-6px;\"> {series.name}</span></div><hr style=\"margin-top:-4px; width:50%; height:5px/><br><div style=\"z-index:-9999; text-align:center; margin-top:-10px; font-weight:normal; font-size:16px; color:#999999;\">{point.x} %</div></span>',
                format: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                shadow: false,
                borderWidth: 0,
                /*style: {
            		fontSize: '16px',
            		fontFamily: 'Helvetica',
            		textAlign:'center'
        		},*/
        		x: 5,
        		y: -37
            },
            linecap: 'round',
            stickyTracking: true,
            rounded: true
        }
    },

    series: [{
        name: 'Volt',
        data: [{
            color: '#FE2E2E',
            radius: '100%',
            innerRadius: '90%',
            y: 0,
            x: 0
        }],
    }]

};

module.exports = gaugeStateVbb;
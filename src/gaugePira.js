var gaugePira = {

	chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '120%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        credits: {
            enabled: false
        },

        exporting: { 
	  		enabled: false
		},

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.4, '#DDDF0D'], // yellow
                [0.7, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            tickPixelInterval: 324,
            tickWidth: 0,
            min: 0,
            max: 324,

            title: {
            	text: "Radiacion Solar",
            	style: {
            		fontSize: '18px',
            		color: "#000000"
        		},
        		y: -110
            },
            
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },

        series: [{
            name: 'Radiación Solar',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">w/m²</span></div>'
            },
            tooltip: {
                valueSuffix: ' w/m²'
            }
        }]

};

module.exports = gaugePira;
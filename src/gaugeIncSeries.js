var gaugeIncSeries = {

	invierno: [{
        name: 'Panel Fotovoltaico',
        data: [{x:1, y:1}, {x:5, y:16}]
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
        data: [{x:3, y:0}, {x:3, y:8.5}]
    }],

    otonio: [{
    	name: 'Panel Fotovoltaico',
    	data: [{x:1, y:1}, {x:5, y:12.5}]
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
    	data: [{x:3, y:0}, {x:3, y:6.5}]
	}],

	primavera: [{
        name: 'Panel Fotovoltaico',
        data: [{x:1, y:1}, {x:5, y:10}]
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
        data: [{x:3, y:0}, {x:3, y:5.5}]
    }],

    verano: [{
    	name: 'Panel Fotovoltaico',
    	data: [{x:1, y:1}, {x:5, y:7}]
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
        data: [{x:3, y:0}, {x:3, y:4}]
    }]
};

module.exports = gaugeIncSeries;
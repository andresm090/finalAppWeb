var mqtt = require('mqtt');
global.config = require('../config/config');

//funcion to manager mqtt
var serverMQTT = function () {

	this.url = 'mqtt://'+global.config.broker.host;//this url of mosquitto
	this.client = null;
  
	this.getClient = function () {
		if(!this.client)  
			this.client = mqtt.connect(this.url);
			console.log('Conectado al servidor MQTT');
		return this.client;
	};
    
	this.connect = function (callback) {
		var client = this.getClient();
		client.on('connect', function () {
			callback(client);
		});
	};
	
	this.observer = function (callback) {
		var client = this.getClient();
		client.on('message', callback);
	};
}

module.exports = serverMQTT;
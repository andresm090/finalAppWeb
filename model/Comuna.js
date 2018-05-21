var mongoose = require('mongoose');
var Generador = require('../model/Generador');
var autoNumber = require('mongoose-auto-number');
var Schema = mongoose.Schema;

var ComunaSchema = new Schema({
	nombre: {type: String, required: true, trim: true, default: ''},
	localidad: {type: String, required: true, trim: true, default: ''},
	departamento: {type: String, required: true, trim: true, default: ''},
	encargado: {type: String, trim: true, default: ''},
	poblacion: {type: Number, min: 1},
	point_geom: [{latitud: Number, longitud: Number}],
	activo: {type: Boolean, default: true},
	id_topic: {type: Number, autoIncrement: true}
})

ComunaSchema.methods.getAerogeneradores = function (){
	var aux;
	Generador.find({'comuna': this.id,'tipo': 'aerogenerador'}, (err, aeros) => {
		if (err) {
			return [];
		} else {
			var aerogeneradores = [];
			for (var i = 0; i < aeros.length; i++){
				aerogeneradores.push(aeros[i]);
			}
			return (aerogeneradores);
		}
	});
		
};

ComunaSchema.virtual('fullName').get(function () {
  var p = Generador.find({'comuna': this.id,'tipo': 'aerogenerador'}, (err, aeros) => {
  		//console.log(aeros);
		return "pepe";
	});
  return p;
});

ComunaSchema.plugin(autoNumber.plugin, 'comuna');
module.exports = mongoose.model('comuna', ComunaSchema);
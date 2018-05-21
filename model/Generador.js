var mongoose = require('mongoose');
var autoNumber = require('mongoose-auto-number');
var Schema = mongoose.Schema;

var GeneradorSchema = new Schema({
	tipo: {type: String, required: true, enum: ['aerogenerador', 'panel fotovoltaico']},
	caracteristicas: {type: Array, default:[]},
	bbaterias: {type: Array, default:[]},
	comuna: {type: mongoose.Schema.Types.ObjectId, ref: 'comuna'},
	activo: {type: Boolean, default: true},
	id_topic: {type: Number, autoIncrement: true},
	sufijo: {type: String, required: true, enum: ['Ag', 'Ps']},
	sensoresC: {type: Array, default:[]},
	sensoresP: {type: Array, default:[]},
	actuadores: {type: Array, default:[]},
})

GeneradorSchema.methods.isAerogenerador = function (){
	if (this.tipo == 'aerogenerador') {
		return true;
	}
	return false;
};

GeneradorSchema.methods.getTagPotencia = function (){
	if (this.tipo == 'aerogenerador') {
		return "aerogenerador/energia";
	}
	return "fotovoltaica/energia";
};

GeneradorSchema.methods.getTagClima = function (){
	if (this.tipo == 'aerogenerador') {
		return "aerogenerador/clima";
	}
	return "fotovoltaica/clima";
};


GeneradorSchema.plugin(autoNumber.plugin, 'generador');
module.exports = mongoose.model('generador', GeneradorSchema);
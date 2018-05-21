var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = new Schema({
	valor: {type: Number, required: true},
	topico: {type: String, required: true},
	producedAt: {type: Date, required: true},
	generador: {type: mongoose.Schema.Types.ObjectId, ref: 'generador'}, 
}, {
	timestamps: true
})

module.exports = mongoose.model('evento', EventoSchema);
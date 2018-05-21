var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatoSchema = new Schema({
	valor: {type: Number, required: true},
	unidad: {type: String, required: true},
	topico: {type: String, required: true},
	producedAt: {type: Date, required: true},
	generador: {type: mongoose.Schema.Types.ObjectId, ref: 'generador'},
	tipo: {type: String, required: true},
	TAG: {type: String, required: true},
}, {
	timestamps: true
})

module.exports = mongoose.model('dato', DatoSchema);
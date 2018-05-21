var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firtsname: {type: String, trim: true, default: ''},
	lastname: {type: String, trim: true, default: ''},
	username: {type: String, required: true, lowercase: true, unique: true},
	email: {type: String, required: true, lowercase: true, unique: true}, 
	password: {type: String, required: true},
	tipo: {type: String, required: true, enum: ['user', 'admin'], default: 'user'},
	suscripciones: {type: Array, default:[]},
}, {
	timestamps: true
})

UserSchema.pre('save', function (next) {

	if (!this.isModified('password')) {
		return next();
  	}

  	bcrypt.genSalt(10, (err, salt) => {
  		if (err) {
  			next(err);
  		}

  		bcrypt.hash(this.password, salt, null, (err, hash) => {
  			if (err){
  				next(err);
  			}
  			this.password = hash;
  			next();
  		});
  	});
});

UserSchema.methods.compararPassword = function (password, cb){
	bcrypt.compare(password, this.password, (err, iguales) =>{
		if (err){
			return cb(err);
		}
		cb(null, iguales);
	});
};

UserSchema.methods.isAdministrador = function () {
	if (this.tipo == 'admin') {
		return true;
	}
	return false;
};

module.exports = mongoose.model('user', UserSchema);

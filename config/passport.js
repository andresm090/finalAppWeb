var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/User');

passport.serializeUser((user, done) => {
	done(null, user._id);

});

passport.deserializeUser((id, done) =>{
	User.findById(id, (err, user) => {
		done(err, user);
	})
});

passport.use(new LocalStrategy(
	{usernameField: 'email'},
	(email, password, done) => {
		User.findOne({email}, (err, user) => {
			if(!user){
				return done(null, false, {message: `Este email: ${email} no esta registrado`});
			} else {
				user.compararPassword(password, (err, iguales) => {
					if (iguales){
						return done(null, user);
					} else {
						return done(null, false, {message: 'La contraseña no es valida'});
					}
				});
			}
		});
	}
));

exports.isAuthenticate = (req, res, next) => {
	if (req.isAuthenticated()){
		return next();
	}
	res.status(401).send('Debes ingresar para acceder a este recurso');
}
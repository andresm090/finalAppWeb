var passport = require('passport');
var User = require('../model/User');

exports.postSignup = (req, res, next) => {
	var user = new User({
		firtsname: req.body.firtsname,
		lastname: req.body.lastname,
		username: req.body.username,
		email: req.body.email,
		tipo: req.body.tipo, 
		password: req.body.password
	});

	User.findOne({email: req.body.email}, (err, userExist) => {
		if (userExist){
			return res.status(400).send('Ese email ya esta registrado');
		} else {
			user.save((err) => {
				if (err) {
					next(err);
				}
				req.logIn(user, (err) => {
					if (err){
						next(err);
					}
					//res.send('Nuevo usuario creado');
					res.locals.user = req.user || null;
					res.redirect('/');
				}); 
			});
		}
	});
}

exports.postLogin = (req, res, next) => {
	passport.authenticate('local', (err, user, info) =>{
		if (err){
			next(err);
		}
		if (!user){
			//return res.status(400).send('Email o contraseña no validos');
			req.flash('error', 'Email o contraseña no validos');
			return res.redirect('/login');
		}
		req.logIn(user, (err) => {
			if (err){
				next(err);
			}
			res.locals.user = req.user || null;
			//res.send('Login exitoso');
			res.redirect('/comunas');
		});
	})(req, res, next);
}

exports.logout = (req, res) => {
	req.logout();
	//res.locals.user = null;
	res.redirect('/');
	//res.send('Logout exitoso');
}
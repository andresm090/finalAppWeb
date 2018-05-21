var passport = require('passport');
var User = require('../model/User');
var topicos = {
	'aerogenerador/clima': false, 
	'aerogenerador/energia': false, 
	'fotovoltaica/clima': false, 
	'fotovoltaica/energia':false
};

exports.getTopicos = (req, res, next) => {
	u = req.user;
	for (topico in topicos){
		topicos[topico] = false;
	}
	if(u.suscripciones.length > 0){
		var a = u.suscripciones;
		for (var i = 0; i < a.length; i++) {
			//console.log(a[i]);
			//console.log(topicos[a[i]]);
			topicos[a[i]] = true;
		}
	}
	res.locals.user = req.user || null;
	res.render('suscripciones', {topicos: topicos});
};

exports.saveTopicos = (req, res, next) => {
	u = req.user;
	u.suscripciones = [];
	for (topico in topicos){
		if (req.param(topico)){
			u.suscripciones.push(topico);
		}
	}
	u.save((err) => {
		if (err) {
			next(err);
		}
		res.locals.user = req.user || null;
		res.redirect('/comunas');
	});
};

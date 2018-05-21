var passport = require('passport');
var Comuna = require('../model/Comuna');
var Generador = require('../model/Generador');
var Evento = require('../model/Evento');
var sensoresCA = require('../src/sensoresCA');
var sensoresCP = require('../src/sensoresCP');
var sensoresE = require('../src/sensoresE');
var actuadores = require('../src/actuadores');


exports.getformNuevoAerogenerador = (req, res, next) => {
	res.locals.user = req.user;
	return res.render('nuevo_aerogenerador');
}; 

exports.saveAerogenerador = (req, res, next) => {

	var vt;
	var at;

	var caracteristicas = {
		'fabricante': req.body.fabricante,
		'modelo-serie':req.body.modelo,
		'potencia':req.body.pn,
		'diametro-rotor':req.body.diametro,
		'h':req.body.h,
		'vel-arranque':req.body.velm,
		'vel-parada':req.body.velp,
		'palas':req.body.npalas,
		'generacion':req.body.generacion
	};

	var conexion = req.body.conexion;
	var v = req.body.vol;
	var a = req.body.capacidad;
	var cantBat = req.body.nbaterias;

	if (conexion == 'Serie'){
		vt = v*cantBat;
		at = a;
	} else {
		vt = v;
		at = a*cantBat;
	}

	var bbaterias = {
		'voltaje': v,
		'capacidad': a,
		'cant de baterias': cantBat,
		'conexion': conexion,
		'voltaje total': vt,
		'capacidad total': at,
	};

	var generador = new Generador ({
		tipo: 'aerogenerador',
		caracteristicas: caracteristicas,
		bbaterias: bbaterias,
		comuna: req.params.id,
		sufijo: 'Ag',
		sensoresC: sensoresCA,
		sensoresP: sensoresE,
		actuadores: actuadores[0],
	});

	generador.save((err) => {
		if (err){
			next(err);
		}
		res.locals.user = req.user || null;

		req.flash('info', 'Nuevo aerogenerador registrado');
		return res.redirect('/admin');
	}); 
};

exports.getformNuevoPanelFotovoltaico = (req, res, next) => {
	res.locals.user = req.user;
	return res.render('nuevo_panelf');
}; 

exports.savePanelFotovoltaico = (req, res, next) => {

	var vt;
	var at;
	
	var caracteristicas = {
		'fabricante': req.body.fabricante,
		'modelo-serie':req.body.modelo,
		'potencia':req.body.pmax,
		'corriente-max':req.body.ipmax,
		'voc':req.body.voc,
		'isc':req.body.isc,
		'dimensiones':req.body.dimensiones,
		'peso':req.body.peso,
		'cant-celdas':req.body.celdas,
		'temp-op': req.body.tempOp
	};

	var conexion = req.body.conexion;
	var v = req.body.vol;
	var a = req.body.capacidad;
	var cantBat = req.body.nbaterias;

	if (conexion == 'Serie'){
		vt = v*cantBat;
		at = a;
	} else {
		vt = v;
		at = a*cantBat;
	}

	var bbaterias = {
		'voltaje': v,
		'capacidad': a,
		'cant de baterias': cantBat,
		'conexion': conexion,
		'voltaje total': vt,
		'capacidad total': at,
	};

	var generador = new Generador ({
		tipo: 'panel fotovoltaico',
		caracteristicas: caracteristicas,
		bbaterias: bbaterias,
		comuna: req.params.id,
		sufijo: 'Ps',
		sensoresC: sensoresCP,
		sensoresP: sensoresE,
		actuadores: actuadores[1],
	});

	var evento = new Evento({
		valor: parseInt(req.body.inclinacion),
		topico: "/Ei",
		producedAt: new Date,
		generador: generador.id,
	});

	generador.save((err) => {
		if (err){
			next(err);
		}
		res.locals.user = req.user || null;

		evento.save((err) => {
			if (err){
				next(err);
			}
			req.flash('info', 'Nuevo panel fotovoltaico registrado');
			return res.redirect('/admin');
		});
	});
};

exports.getformModifyGenerador = (req, res, next) => {

	Generador.findById(req.params.id, (err, generador) => {
		if (err) {
			return res.send('Ha surgido un error.');
		} else {
			res.locals.user = req.user;
			if (generador.isAerogenerador()){
				return res.render('modify_aerogenerador', {generador: generador});
			}
			Evento.findOne({"generador": generador.id}, {}, { sort: { 'createdAt' : -1 } }, function(err, evento) {
		  		return res.render('modify_panel_fotovoltaico', {generador: generador, inc: evento.valor});
			});
		}

	});
};

exports.ModifyGenerador = (req, res, next) => {

	Generador.findById(req.params.id, (err, generador) => {
		if (err) {
			return res.send('Ha surgido un error.');
		} else {
			
			var caracteristicas;
			var vt;
			var at;

			if (generador.isAerogenerador()){

				caracteristicas = {
					'fabricante': req.body.fabricante,
					'modelo-serie':req.body.modelo,
					'potencia':req.body.pn,
					'diametro-rotor':req.body.diametro,
					'h':req.body.h,
					'vel-arranque':req.body.velm,
					'vel-parada':req.body.velp,
					'palas':req.body.npalas,
					'generacion':req.body.generacion
				};				
				//return res.render('modify_aerogenerador', {generador: generador});
			} else {

				caracteristicas = {
					'fabricante': req.body.fabricante,
					'modelo-serie':req.body.modelo,
					'potencia':req.body.pmax,
					'corriente-max':req.body.ipmax,
					'voc':req.body.voc,
					'isc':req.body.isc,
					'dimensiones':req.body.dimensiones,
					'peso':req.body.peso,
					'cant-celdas':req.body.celdas,
					'temp-op': req.body.tempOp
				};

				var evento = new Evento({
					valor: parseInt(req.body.inclinacion),
					topico: "/Ei",
					producedAt: new Date,
					generador: generador.id,
				});

				evento.save((err) => {
					if (err){
						res.locals.user = req.user || null;
						req.flash('info', 'ERROR: No se pudieron registrar los cambios');
						return res.redirect('/admin');
					}
				});
			}

			var conexion = req.body.conexion;
			var v = req.body.vol;
			var a = req.body.capacidad;
			var cantBat = req.body.nbaterias;

			if (conexion == 'Serie'){
				vt = v*cantBat;
				at = a;
			} else {
				vt = v;
				at = a*cantBat;
			}

			var bbaterias = {
				'voltaje': v,
				'capacidad': a,
				'cant de baterias': cantBat,
				'conexion': conexion,
				'voltaje total': vt,
				'capacidad total': at,
			};

			generador.caracteristicas = caracteristicas;
			generador.bbaterias = bbaterias;

			generador.save((err) => {
				if (err){
					next(err);
				}
				res.locals.user = req.user || null;
				req.flash('info', 'Los nuevos cambios han sido registrados');
				return res.redirect('/admin');
			});

			//return res.render('modify_panel_fotovoltaico', {generador: generador});
		}

	});
};

exports.deleteGenerador = (req, res, next) => {

	Generador.findById(req.body.id, (err, generador) => {
		if (err) {
			return res.send('Ha surgido un error.');
		} else {
			generador.activo = false;
			generador.save();
		}
	});
	
	return res.send('200 OK');
};

exports.activateGenerador = (req, res, next) => {
	Generador.findById(req.body.id, (err, generador) => {
		if (err) {
			return res.send('Ha surgido un error.');
		} else {
			generador.activo = true;
			generador.save();
		}

	});
	return res.send('200 OK');
};

exports.getDetalleGenerador = (req, res, next) => {
	Generador.findById(req.params.id, (err, generador) => {
		if (err) {
			return res.send('Ha surgido un error.');
		} else {
			res.locals.user = req.user || null;
			Comuna.populate(generador, {path: "comuna"}, (err, generador) => {
				if (err){
					return res.send('Ha surgido un error.');
				}
				
				return res.render('panel_detalle_generadores', {generador: generador});	
			});
		}

	});
};

// metodo que almacena aquellos sensores que publicaran los datos procesados a otros dashboard
// Funciona pero puedo mejorarse
exports.savePreferenciasPublish = (req, res, next) => {
	Generador.findById(req.params.id, (err, generador) => {
		if (err) {
			return res.send('Ha surgido un error.');
			//return "ha ocurrido un erro";
		} else {
			//console.log(req.body.sC1);
			//console.log (generador.sensoresC[0]['re_publica']);
			var sensC;
			var actuadres;
			if (generador.isAerogenerador()){

				sensC = [{
					nombre: generador.sensoresC[0]['nombre'],
					unidad: generador.sensoresC[0]['unidad'],
					tipo: generador.sensoresC[0]['tipo'],
					sufijo: generador.sensoresC[0]['sufijo'],
					activo: generador.sensoresC[0]['activo'],
					re_publica: req.body.sC0,
					topico: generador.sensoresC[0]['topico'],
				}, {
					nombre: generador.sensoresC[1]['nombre'],
					unidad: generador.sensoresC[1]['unidad'],
					tipo: generador.sensoresC[1]['tipo'],
					sufijo: generador.sensoresC[1]['sufijo'],
					activo: generador.sensoresC[1]['activo'],
					re_publica: req.body.sC1,
					topico: generador.sensoresC[1]['topico'],
				}, {
					nombre: generador.sensoresC[2]['nombre'],
					unidad: generador.sensoresC[2]['unidad'],
					tipo: generador.sensoresC[2]['tipo'],
					sufijo: generador.sensoresC[2]['sufijo'],
					activo: generador.sensoresC[2]['activo'],
					re_publica: req.body.sC2,
					topico: generador.sensoresC[2]['topico'],
				}];

				actuadores = [{
					nombre: generador.actuadores[0]['nombre'],
					tipo: generador.actuadores[0]['tipo'],
					activo: generador.actuadores[0]['activo'],
					re_publica: req.body.a0,
					topico: generador.actuadores[0]['topico'],
					activado: generador.actuadores[0]['activado'],
				}];

			} else {
				sensC = [{
					nombre: generador.sensoresC[0]['nombre'],
					unidad: generador.sensoresC[0]['unidad'],
					tipo: generador.sensoresC[0]['tipo'],
					sufijo: generador.sensoresC[0]['sufijo'],
					activo: generador.sensoresC[0]['activo'],
					re_publica: req.body.sC0,
					topico: generador.sensoresC[0]['topico'],
				}, {
					nombre: generador.sensoresC[1]['nombre'],
					unidad: generador.sensoresC[1]['unidad'],
					tipo: generador.sensoresC[1]['tipo'],
					sufijo: generador.sensoresC[1]['sufijo'],
					activo: generador.sensoresC[1]['activo'],
					re_publica: req.body.sC1,
					topico: generador.sensoresC[1]['topico'],
				}];

				actuadores = [{
					nombre: generador.actuadores[0]['nombre'],
					tipo: generador.actuadores[0]['tipo'],
					activo: generador.actuadores[0]['activo'],
					re_publica: req.body.a0,
					topico: generador.actuadores[0]['topico'],
					activado: generador.actuadores[0]['activado'],
				}];
			}

			sensE = [{
				nombre: generador.sensoresP[0]['nombre'],
				unidad: generador.sensoresP[0]['unidad'],
				tipo: generador.sensoresP[0]['tipo'],
				sufijo: generador.sensoresP[0]['sufijo'],
				activo: generador.sensoresP[0]['activo'],
				re_publica: req.body.sP0,
				topico: generador.sensoresP[0]['topico'],
			}, {
				nombre: generador.sensoresP[1]['nombre'],
				unidad: generador.sensoresP[1]['unidad'],
				tipo: generador.sensoresP[1]['tipo'],
				sufijo: generador.sensoresP[1]['sufijo'],
				activo: generador.sensoresP[1]['activo'],
				re_publica: req.body.sP1,
				topico: generador.sensoresP[1]['topico'],
			}, {
				nombre: generador.sensoresP[2]['nombre'],
				unidad: generador.sensoresP[2]['unidad'],
				tipo: generador.sensoresP[2]['tipo'],
				sufijo: generador.sensoresP[2]['sufijo'],
				activo: generador.sensoresP[2]['activo'],
				re_publica: req.body.sP2,
				topico: generador.sensoresP[2]['topico'],
			}];

			generador.sensoresC = sensC;
			generador.sensoresP = sensE;
			generador.actuadores = actuadores;
			//console.log (generador.sensoresC[0]['re_publica']);
			
			//console.log(generador.sensoresC[0]);
			
			//generador.save();
			/*generador.sensoresC[1]['re_publica'] = req.body.sC1;

			if (generador.isAerogenerador()){
				generador.sensoresC[2]['re_publica'] = req.body.sC2;
			}

			generador.sensoresP[0]['re_publica'] = req.body.sP0;
			generador.sensoresP[1]['re_publica'] = req.body.sP1;
			generador.sensoresP[2]['re_publica'] = req.body.sP2;*/
			generador.save((err) => {
				if (err){
					console.log("errores");
					return res.send("<div id=\"alertMsj\" class=\"alert alert-success alert-dismissible\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <strong> Ha surgido un error.</strong>");	
				}		
			});
			res.locals.user = req.user || null;
			return res.send("<div id=\"alertMsj\" class=\"alert alert-success alert-dismissible\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <strong> Datos guardados exitosamente!!</strong>");	

		}

	});
};

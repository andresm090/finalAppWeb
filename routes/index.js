var express = require('express');
var router = express.Router();
var controllerUser = require('../controllers/usercontroller');
var topicontroller = require('../controllers/topicontroller');
var comunacontroller = require('../controllers/comunacontroller');
var datocontroller = require('../controllers/datocontroller');
var generadorcontroller = require('../controllers/generadorcontroller');
var mailcontroller = require('../controllers/mailcontroller');

var passportConfig = require('../config/passport');

var Comuna = require('../model/Comuna');
var Generador = require('../model/Generador');
var User = require('../model/User');
var Evento = require('../model/Evento');
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  //req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
  res.locals.user = req.user || null;
  res.render('home', { message: req.flash('info')});
});

router.get('/topicos', passportConfig.isAuthenticate, topicontroller.getTopicos);
router.post('/topicos', passportConfig.isAuthenticate, topicontroller.saveTopicos);

/* Rutas de autenticacion*/

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/signup', controllerUser.postSignup);

router.get('/login', function(req, res, next) {
  res.render('login', {errors : req.flash('error')});
});
router.post('/login', controllerUser.postLogin);

router.get('/logout', passportConfig.isAuthenticate, controllerUser.logout);

//rutas del dashboard

router.get('/generador/:id(*)', passportConfig.isAuthenticate, datocontroller.getfPanelControl);

router.get('/getDataC/:id(*)', passportConfig.isAuthenticate, datocontroller.getTrCaracteristicas);
router.get('/getDataTR2/:id(*)', passportConfig.isAuthenticate, datocontroller.getTrDatosTR);
router.get('/getDataH/:id(*)', passportConfig.isAuthenticate, datocontroller.getTrDatosH);
router.get('/getDataP/:id(*)', passportConfig.isAuthenticate, datocontroller.getTrPublicacionDatos);

router.post('/getHistoricos/:id(*)', passportConfig.isAuthenticate, datocontroller.getHistoricos);
router.post('/getGrapArea/:id(*)', passportConfig.isAuthenticate, datocontroller.getGrapArea);
router.post('/getGrapWIndBar/:id(*)', passportConfig.isAuthenticate, datocontroller.getGrapWIndBar);
router.post('/getGrapLine/:id(*)', passportConfig.isAuthenticate, datocontroller.getGrapLine);
router.post('/getWindRose/:id(*)', passportConfig.isAuthenticate, datocontroller.getWindRose);
router.post('/getRegEvent/:id(*)', passportConfig.isAuthenticate, datocontroller.getTableEventoGenerador);

router.post('/sendMail', passportConfig.isAuthenticate, mailcontroller.sendMailPublicacion);

//rutas para administracion 

router.get('/admin', passportConfig.isAuthenticate, comunacontroller.getPanelAdministrador);

router.get('/admin/nuevaComuna', passportConfig.isAuthenticate, comunacontroller.getformNuevaComuna);
router.post('/admin/nuevaComuna', passportConfig.isAuthenticate, comunacontroller.saveComuna);

router.post('/admin/delComuna', passportConfig.isAuthenticate, comunacontroller.deleteComunas);
router.post('/admin/delComunaByID', passportConfig.isAuthenticate, comunacontroller.deleteComunaByID);

router.post('/admin/activarComuna', passportConfig.isAuthenticate, comunacontroller.activateComuna);

router.get('/admin/:id(*)/modificar', passportConfig.isAuthenticate , comunacontroller.getformModifyComuna);
router.post('/admin/:id(*)/modificar', passportConfig.isAuthenticate, comunacontroller.modifyComuna);

router.post('/admin/getDetalle', passportConfig.isAuthenticate, comunacontroller.getModalDetalle);
router.post('/admin/getDetalleGeneradores', passportConfig.isAuthenticate, comunacontroller.getModalDetalleGeneradores);

router.get('/admin/:id(*)/nuevoaerogenerador', passportConfig.isAuthenticate , generadorcontroller.getformNuevoAerogenerador);
router.post('/admin/:id(*)/nuevoaerogenerador', passportConfig.isAuthenticate, generadorcontroller.saveAerogenerador);

router.get('/admin/:id(*)/nuevopanelfotovoltaico', passportConfig.isAuthenticate, generadorcontroller.getformNuevoPanelFotovoltaico);
router.post('/admin/:id(*)/nuevopanelfotovoltaico', passportConfig.isAuthenticate, generadorcontroller.savePanelFotovoltaico);

router.get('/admin/:id(*)/modificarGenerador', passportConfig.isAuthenticate , generadorcontroller.getformModifyGenerador);
router.post('/admin/:id(*)/modificarGenerador', passportConfig.isAuthenticate , generadorcontroller.ModifyGenerador);

router.post('/admin/delGenerador', passportConfig.isAuthenticate, generadorcontroller.deleteGenerador);
router.post('/admin/activarGenerador', passportConfig.isAuthenticate, generadorcontroller.activateGenerador);

router.get('/admin/:id(*)/detalleGenerador', passportConfig.isAuthenticate , generadorcontroller.getDetalleGenerador);

router.post('/admin/:id(*)/savePreferencias', passportConfig.isAuthenticate, generadorcontroller.savePreferenciasPublish);

//rutas para gestion de mapa web

router.get('/comunas', passportConfig.isAuthenticate, comunacontroller.getMapComunas);
router.get('/comunas/:id(*)/getGeneradores', passportConfig.isAuthenticate, comunacontroller.getGeneradores);
router.get('/comunas/:id(*)/getEstadoGenerador', passportConfig.isAuthenticate, comunacontroller.verificarEstadoGenerador);
router.get('/comunas/:id(*)/getEventos', passportConfig.isAuthenticate, comunacontroller.getEventos);

// rutas de prueba

router.get('/prueba', passportConfig.isAuthenticate, function(req, res, next){
	res.locals.user = req.user;
	res.render('prueba_datos', {gaugeTemp: gaugeTemp, gaugeVel: gaugeVel});
});

router.get('/prueba2', passportConfig.isAuthenticate, function(req, res, next){
	res.locals.user = req.user;
	res.render('datos_principal');
});

router.get('/getPanelAero', passportConfig.isAuthenticate, function(req, res, next){
	res.render('tabs_panel_aero');

});

router.get('/getDataTR', passportConfig.isAuthenticate, function(req, res, next){
	res.render('tr_aero', {gaugeTemp: gaugeTemp, gaugeVel: gaugeVel, gaugeVA: gaugeVA});

});

//recupera el ultimo usuario registrada. Cambiar a 1 si se busca el mas antiguo
router.get('/ultimo', function(req, res, next) {
  User.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, user) {
  	res.json(user);
	});
});

/*router.get('/secuencia', function(req, res, next) {
	var event = new Evento({
			valor: 15,
			topico: 'topic',
			producedAt: new Date(),
			generador: '5a445d2a2c45b60ae8089cca', 
	});
  	
  	event.save((err) => {
			if (err){
				errores = true;
			}
		});
  	res.send('OK.');
});*/

module.exports = router;

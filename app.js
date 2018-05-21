global.config = require('./config/config');
var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportConfig = require('./config/passport');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var swig = require('swig');
var index = require('./routes/index');
var users = require('./routes/users');
var mqtt = require('./src/serverMQTT');
var repo = require('./src/repository');
var controllerUser = require('./controllers/usercontroller');
var gaugeIncSeries = require('./src/gaugeIncSeries');
var autoNumber = require('mongoose-auto-number');

var MONGO_URL = 'mongodb://'+global.config.db.host+':'+global.config.db.port+'/'+global.config.db.database;

//var http = require('http').Server(app);
var io = require('socket.io').listen(global.config.socket.port);

var connectionsArray = []; // Arreglo de socket
var serverMQTT = new mqtt();
var repository = new repo();
var swig = new swig.Swig();

var app = express();

//Configuracion de la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err) => {
	throw err;
	process.exit(1);
});

autoNumber.init(mongoose.connection);

//Configuracion para manejo de sesiones
app.use(session ({
	secret: global.config.session.password,
	resave: global.config.session.resave,
	saveUninitialized: global.config.session.saveUninitialized,
	store: new mongoStore({
		url: MONGO_URL,
		autoReconnect: global.config.db.autoReconnect
	})
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());


// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use('*/public',express.static('public'));

//Definicion de los manejadores de rutas
app.use('/', index);
app.use('/users', users);

//Conexion al Broker, implementacion con guardado de datos.
// En desarrollo, probado funcionando.
//El codigo que se encuentra abajo comentado, corresponde con la primera version funcional.
serverMQTT.connect(function(clientMQTT) {

	//Topicos reales de la app
	clientMQTT.subscribe('+/+/C/+');
	clientMQTT.subscribe('+/+/P/+');
	clientMQTT.subscribe('+/+/Ei');
	clientMQTT.subscribe('+/+/Ef');

	serverMQTT.observer(function(topic, value) {
		console.log(value.toString());
		repository.procesarTopico(topic, function(generador, tipo, variable){
			switch(tipo) {
				case "P":
					repository.saveDataPotencias(value.toString(), generador, topic, function(v, a, w, err){
						if (err) {
							console.log("Ocurrio un problema en el resguardo ");
						}
						//Notifico a los clientes
						connectionsArray.forEach(function(tmpSocket) {
							tmpSocket.emit(generador.id+'/p', v, a, w);
						});

						if (generador.sensoresP[0]['re_publica']){
							clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresP[0]['topico'], v.toString());
						}
						if (generador.sensoresP[1]['re_publica']){
							clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresP[1]['topico'], w.toString());
						}
						if (generador.sensoresP[2]['re_publica']){
							var consumo = v*a;
							clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresP[2]['topico'], consumo.toString());
						}

					});
					break;
				case "C":
					if (generador.isAerogenerador()){
						repository.saveDataCLimaAero(value.toString(), generador, topic, variable, function (t, v, d, s, err){
							if (err){
								console.log("Ocurrio un problema en el resguardo ");
							}
							//Notifico a los clientes
							connectionsArray.forEach(function(tmpSocket) {
								tmpSocket.emit(generador.id+'/c', t, v, d, s);
							});
							if (generador.sensoresC[0]['re_publica'] && (v != null)){
								clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresC[0]['topico'], v.toString());
							}
							if (generador.sensoresC[1]['re_publica'] && (d != null)){
								clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresC[1]['topico'], d.toString()+"° - "+s);
							}
							if (generador.sensoresC[2]['re_publica'] && (t != null)){
								clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresC[2]['topico'], t.toString());
							}
						});
					} else {
						repository.saveDataCLimaPanelF(value.toString(), generador, topic, variable, function (t, r, err){
							if (err){
								console.log("Ocurrio un problema en el resguardo ");
							}
							//Notifico a los clientes
							connectionsArray.forEach(function(tmpSocket) {
								tmpSocket.emit(generador.id+'/c', t, r);
							});
							if (generador.sensoresC[0]['re_publica'] && (r != null)){
								clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresC[0]['topico'], r.toString());
							}
							if (generador.sensoresC[1]['re_publica'] && (t != null)){
								clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.sensoresC[1]['topico'], t.toString());
							}
						});
					}
					break;
				default:
					repository.saveEvento(value, generador, topic);
					if (tipo == "Ef"){
						//Notifico a los clientes
						connectionsArray.forEach(function(tmpSocket) {
							tmpSocket.emit('mapComuna/e', Number(value), generador.comuna.id);
							tmpSocket.emit(generador.id+'/e', Number(value));
						});
						if (generador.actuadores[0]['re_publica']){
							clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.actuadores[0]['topico'], value);
						}
					}
					if (tipo == "Ei") {
						//Notifico a los clientes
						connectionsArray.forEach(function(tmpSocket) {
							tmpSocket.emit('mapComuna/i', generador.comuna.id, generador.id);
							var inc = Number(value)
							switch(inc) {
								case 60:
									tmpSocket.emit(generador.id+'/e', gaugeIncSeries.invierno, inc);
									break;
								case 20:
									tmpSocket.emit(generador.id+'/e', gaugeIncSeries.primavera, inc);
									break;
								case 12: 
									tmpSocket.emit(generador.id+'/e', gaugeIncSeries.verano, inc);
									break;
								default:
									tmpSocket.emit(generador.id+'/e', gaugeIncSeries.otonio, inc);
							}
						});
						
						if (generador.actuadores[0]['re_publica']){
							clientMQTT.publish("C"+generador.comuna.id_topic+"/"+generador.sufijo+generador.id_topic+"/"+generador.actuadores[0]['topico'], value + "°");
						}
					}
					break;
			}
		});
	});
});

//coneccion de los websocket
io.on('connection', function(socket){
	console.log('Numero de conexión:' + connectionsArray.length); 

	socket.on('disconnect', function(){
		var socketIndex = connectionsArray.indexOf(socket);
		console.log('socketID = %s got disconnected', socketIndex);
		if (~socketIndex) {
			connectionsArray.splice(socketIndex, 1);
	    }
	});
 
 	console.log('Nuevo Socket conectado!');
 	connectionsArray.push(socket);
});

//Captura el status 404 y renderiza a la vista correspondiente
app.use(function(req, res, next) {
  //res.status(404).send('Sorry cant find that!');
  res.locals.user = req.user;
  res.status(404).render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

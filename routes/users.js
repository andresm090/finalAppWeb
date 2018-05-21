var express = require('express');
var router = express.Router();


/*app.post('/signup', controllerUser.postSignup);
app.post('/login', controllerUser.postLogin);
app.get('/logout', passportConfig.isAuthenticate ,controllerUser.logout);*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET home page. */
/*router.get('/', function(req, res, next) {
  req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
  res.render('index', { title: 'Broker MQTT', cuenta: req.session.cuenta });
});*/

module.exports = router;

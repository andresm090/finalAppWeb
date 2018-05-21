global.config = require('../config/config');
var nodemailer = require('nodemailer');


exports.sendMailPublicacion = (req, res, next) => {

	var email = req.body.email;
	var asunto = req.body.asunto;
	res.locals.user = req.user;

	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dashboardappIot@gmail.com',
            pass: 'abc123456789def'
        },
        tls: {
        	rejectUnauthorized: false
    	}
    });

	var mailOptions = {
	    from: 'AppIot <dashboardappIot@gmail.com>',
	    to: email,
	    subject: asunto,
	    text: 'Hola ' + req.user.firtsname +" "+req.user.lastname 
	    	+ ', a continuación le brindamos sus credenciales de accesso: \n\nDirección del Broker: mqtt://' + global.config.broker.host + 
	    	"\nPuerto de escucha: " + global.config.broker.port 
	    	+ "\nUsuario: No aplica \nPassword: No aplica \n\n\n Saludos del equipo de IoT Aplication.",  
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if (error){
	        console.log(error); 
	    } else {
	        console.log("Email sent");
	        //console.log('Message sent: ' + info.response);
	    }
	});
	transporter.close();
	return res.send("<div id=\"alertMsj\" class=\"alert alert-success alert-dismissible\" role=\"alert\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <strong> Email enviado</strong>");
	
};
# Trabajo Final Aplicaciones Web 2018
Este proyecto está enfocado para la monitorización y gestión de sensores, el propósito es el tratamiento de información y la recopilación de datos desde diferentes sensores ambientales y de índole energético. El principal objetivo es el control de equipos de generación de energía a partir de recursos renovables (aerogeneradores y paneles fotovoltaicos); aunque podría ampliarse una amplia variedad de usos.  

El proyecto captura los datos por medio del protocolo MQTT, utilizando un Server-Side (nodejs) como mediador, para luego exponerlo en un dashboard (panel de instrumentos).
Para lograr una mejor recepción de los datos en tiempo real se utilizó la tecnología de WebSockets. El dashboard establece un canal de comunicación persistente entre el cliente (en este caso el browser) y el servidor (la aplicación). 

Es necesario la implementación o uso de un Broker de mensajes, como intermediario entre los que publican los datos (sensores) y los que se suscriben ellos (plataforma web). El mismo es el encargado de la gestión de los mensajes transmitidos. Este proyecto trabaja bajo el modelo publicador/suscriptor.

## Topologia del modelo 

![Modelo](https://raw.githubusercontent.com/andresm090/finalAppWeb/master/asserts/esquema.jpg)

Para el diseño de los medidores (Gauges) se hizo uso de la librería [Highcharts](https://www.highcharts.com/) escrita en JavaScript.

Cada sensor pública los valores relevados, en un tópico preestablecido por la plataforma, basado en la comuna o punto geográfico establecido, en el tipo de generador y el tipo de variable. En el momento que se da de alta un equipo de generación se generan un grupo de sensores y actuadores preestablecidos para el control de dicho equipo. Para conocer en qué tópico debe publicar cada sensor se debe acceder al panel administrador, seleccionar el equipo de generación cuyos sensores se desea conocer y elegir la opción de “ver detalle”; en la misma se podrá apreciar cada sensor y sus respectivos canales de suscripción.

## Esquema de tópico utilizado

![Topicos](https://raw.githubusercontent.com/andresm090/finalAppWeb/master/asserts/Esquema-Topicos.jpg)

## Dependencias 

El sistema debe contar con: 
- [nodejs](https://nodejs.org/es/)
- [npm](https://www.npmjs.com/)
- [mongodb](https://www.mongodb.com/es) 

y el uso de algun Broke MQTT publico como:
 - [ignorelist](mqtt.ignorelist.com).
 - [Mosquitto Test Server](https://test.mosquitto.org/).
 
 Aunque tambien es posible instalar y configurar un Broker local:
 - [Mosquitto](https://mosquitto.org/).
 
 ## Como usarlo

Ingresar a la consola e instalar las dependncias.

```sh
$ git clone https://github.com/andresm090/finalAppWeb

$ cd finalAppWeb

$ npm install
```
La configuración de conexión tanto del Broker MQTT, como de la base de datos y otros aspectos se encuentran en el archivo [config](https://raw.githubusercontent.com/andresm090/finalAppWeb/master/config/config.js).
Tener en cuenta de establecer los valores correspondientes al entorno a utilizar.

Iniciar la base de datos Mongodb.

Para iniciar el servidor utilizar el siguiente comando.

```sh
$ npm start
```

## Acceder al sistema

Para ingresar al sistema acceder a la siguiente url [http://localhost:3000/](http://localhost:3000/).

**Nota:** El sistema maneja 2 tipos de perfiles, usuarios administradores y usuarios estandar. Para poder visualizar los gauges de los sensores, es necesario dar de alta los puntos de toma de datos (Comunas) y los equipos generadores de dichos puntos. Para ello es necesario contar con una cuenta administrador. 
A partir de ahí, cualquier tipo de usuario, puede ubicar los puntos en el mapa web a traves de la opción [Mapa de Comunas](http://localhost:3000/comunas) ubicada en la barra de navegación y acceder a los distintos dispositivos de generación y por ende a los sensores instalados en ellos. 
Tener en cuenta que, de acuerdo a las suscripciones que posea cada usuario, los gauges a visualizar varian. Estos varian de acuerdo al tipo de equipo generador y al tipo de variables de interes (cliamticas o energeticas). Para suscribirse a estos topicos, se debe desplegar el menu de usuario y acceder a la opcion de [Mis suscripciones](http://localhost:3000/topicos).

    
## Consideraciones Finales

Para los publicadores es posible utilizar sensores IoT que publiquen sus valores por Internet, sensores conectados a placas que permitan transmitir los valores recolectados o simularlos por medio de aplicaciones que permitan la publicación de datos por medio del protocolo MQTT.

Algunas aplicaciones útiles para probar la aplicación:

- [MyMQTT](https://play.google.com/store/apps/details?id=at.tripwire.mqtt.client&hl=es_AR) 
- [MQTT Dash](https://play.google.com/store/apps/details?id=net.routix.mqttdash&hl=es_AR)

Cada sensor (real o simulado) debe publicar en el topico correspondiente.

El mapa web esta preparado para la visualizacion de puntos geograficos dentro de la provincia del Chubut.

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

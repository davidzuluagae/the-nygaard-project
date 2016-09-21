// Web_Server.js
'use strict'

var path = require('path');
var config = require("../Config/config.js");

// var config = require(  path.join("../","Config.config.js")   );

console.log("   Starting REST API - Web Server");


//- Get if in HTTPS mode of not from the config file
	//# Need HTTPS??  
		var https_mode = false;
		var http = require('http');
		var server_port = config.webServer.port;
		

/// just Log that theWeb Server has been started up..
	var printStartingServer = function(server_port){
		console.log("          Starting Up : ");
		console.log("    localhost: "+server_port);
	};

//// Pass an Express App and Returns HTTP Server Object to Callback
exports.startServer = function(app, callback_WithServer){
	///////////#######################################
	///###   Set up  Server Object
		printStartingServer();
		////###    Define Server Object with HTTPS or NOT
				//-  http server over non-encryped tcp
				var httpServer = http.createServer(app);
					httpServer.listen(server_port);
				printStartingServer(server_port);   /// Log Starting Server 
				
				///////////#######################################
				callback_WithServer( httpServer );
};

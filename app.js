'use strict'


//////###################################
////// Include Dependencies 
	

	//####################################
	//##  WebServer module  DEPENDENCIES 
		var express = require('express');   // needed in this file because I want app in scope from all main runtime functions.. 
		var config = require('./Config/config.js');
		var db = require("./Server/DataBases.js");   
		var app = express();		//## MAIN ExpressJS APP OBJECT
			


			// Define App Locals   --> from the config file..
				app.locals.title        = config.appLocals.title;
				app.locals.domainURL    = config.appLocals.domainURL;
				app.locals.contactEmail = config.appLocals.contactEmail;
				app.locals.keywords     = config.appLocals.keywords;
			
	//////####################################
	////  OPEN DATABASE CONNECTIONS  
		// db.mongoAdmin.start().then(function(output){
		// 		console.log("                    ALL DONE ");
		// 		console.log(output);
		// }).catch(function(reason){
		// 		console.log(reason);
		// });

	/// Test Stoping the mongoAdmin_IO
		// setTimeout(function(){
		// 	db.mongoAdmin.stop().then(function(data){
		// 		console.log("Done Closing......");
		// 	}).catch(function(reason){
		// 		console.log(reason);
		// 	});
		// },5000);




			
	/////############################
	//// Sweet Custom Node Modules.. 
		//##  HTTP Webserver --> ExpressJS 
			var WebServer = require("./Server/Web_Server.js");
		//##  HANDLE Middle Ware for Web Server 
			var Express_Middleware = require('./Server/ExpressJS_Middleware.js');
	


	////////################################
	////////    Middle Ware  -->  Process incoming Traffic to the WebServer.. 
		//## Attach My Middle Ware   -- Passport Authentication Middle ware 
			Express_Middleware.attach(app,function(data){
				console.log("\n   --> Custom ExpressJS Middleware Attached");
			    // 	console.log(data);
			});



	//////###################################
	//## Start Up the WebServer...    Returns Running Server Object ...  
			WebServer.startServer(app, function(server){
					console.log("\n   --> Server Successfully Started..");
					// console.log( Object.keys(server) );
			});

////### EXPORT app for testing.. 
		module.exports = app;


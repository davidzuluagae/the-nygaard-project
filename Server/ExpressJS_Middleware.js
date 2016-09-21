//- 
/*
	Handles Middleware For ExpressJS WebServer..
		PassportJS Imlement..  
		exports.attach --> gets called from app.js
*/
"use strict"

//- 
var path = require('path');
var compress = require('compression');
var express = require('express');
var bodyParser = require('body-parser');

//-  CROSS ORIGIN REQUESTING 
var cors = require('cors');

//// WHITELIST FOR CORS
    var whitelist = ['http://localhost', 'http://localhost:8080','http://wiki.astir.io:8080'];
    // var whitelist = ['http://localhost', 'http://localhost:13373'];
    // var whitelist = ['http://google.com'];
    var corsOptions = {
      origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
      }
    };

//-  DATASTORE Interface..  
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var routes = require('./Routes/index.js');       //##  ROUTING FOR WEBTRAFFIC.. 

//////###################################
////// Configuration 
var config = require('../Config/config.js');

//-  Attch All My Custom Middle ware...    Gets Middle-ware Attached from -> Main RunTime Thread
exports.attach = function(app, callback_withData) {

    ///##############################################
    //// CACHING  
        app.disable('view cache');

    ///##############################################
    //// Compress Comm  Gzip for performance .. 
        app.use(compress());

    ///##############################################
    ///// STATIC DIRECTORY  / PUBLIC ASSETS like css & js
        let pub_dir = config.webServer.public_directory;

    //// WHITELISTED IP ADDRESSED defined in API config file.. 
        let whiteListed_IPs = config.webServer.whitelist_ip;
        console.log(typeof whiteListed_IPs);


    //////////////////////////////////////////////////////
    ////  Parse Post Params into nice JSON Objects..  
        app.use(bodyParser.json()); // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
            extended: true
        }));

    ///##############################################
    ///  PASSPORT SESSION   --> use oAuth2 Wrappr and secure all APIs
        app.use(cookieParser());
        // app.use(require('express-session')({
        //     secret: config.webServer.session_secret,
        //     cookie: {
        //         _expires: (config.webServer.session_length_hours * 3600000),
        //     },
        //     resave: false,
        //     saveUninitialized: false
        // }));

    ////===##########################################################
    /////////////////////////////////////////////
    ////====------  REST-API Routing Middleware  --> Reuse these middlewares and abstract..  ..
            /////==#################################
            ////     CORS  - Cross Origin Resquests   
                /// Send Headers Allowing Allow External Apps to Connect
                    app.use( cors(corsOptions)  );
            
            ////===##############################   
            ///// CUSTOM OBJECT TO PASS THROUGH MIDDLEWARE ABOUT THIS REQUEST.. 
                //// Parse Incoming IP Address & Endpoint & Log it..
                    app.use(function(req, res, next) {                      
                            ///--  
                                console.log("\n################################========================-------\n    ==> --> LOGGING THIS INCOMING REQUEST.. ");    
                                const thisReq_IP = ((req.headers['X-Real-IP'] || req.connection.remoteAddress).split("ffff:"))[1];
                                req.astir = {
                                    req_method : req.method,
                                    ip: thisReq_IP,
                                    endpoint: req._parsedUrl.pathname,
                                    request_at : (new Date()).getTime(),
                                    postHeaders : (req.headers),
                                    // Grab the Parameters from this post
                                        postParams : (Object.assign(req.params, req.body)),
                                        formData : req.formData,

                                    ///---------=======
                                    /// app.locals Pass through to req.astir
                                        app_Title : app.locals.title,
                                        // app_DomainURL : app.locals.domainURL,
                                        // app_ContactEmail : app.locals.contactEmail,
                                        // app_Keywords : app.locals.keywords,
                                };

                            ///-- Logging Initial for all Requests
                                // console.log("req.astir.formData");
                                // console.log(req);

                            // console.log("    "+req.astir.endpoint);
                            // console.log(req.astir.postParams);

                            next();
                    });

            ////===##############################   
            //// IP WHITELISTED??  Boot if not IP is not on the white list..
                /////#### CHECK FOR THIS BEING IN WHITELISTED IP RANGE
                    // app.use(function(req, res, next){
                    //         /// Check if this incoming request is from a whitelisted IP range..
                    //             // console.log("Checking incoming IP: "+req.astir.ip+" is from a whitelisted IP range..");
                    //             // console.log();
                                
                    //             if(whiteListed_IPs.indexOf(req.astir.ip) !== -1){
                    //                 // console.log(" Yep IS ON THE LIST..");
                    //                 next();
                    //             }else{
                    //                 console.log("  ERROR --> NOT ON LIST BOOTED..");
                    //                 console.log("     LOGGING THIS UNAUTHED IP ADDRESS..");
                    //                 next();
                    //                 /// Do NoT Responde..
                    //             }
                    // });


            ////===##############################   
            //// GET REQUESTS INCOMING  -- Boot all these people.. 
                app.use(function(req, res, next) {
                    if (req.method === 'GET') {
                        /// Special Handling of GET requests only..
                        console.log("###############################");
                        console.log("      --> THIS GET REQUEST    ");
                        console.log("    LOGGING ATTEMPTED GET REQUEST ");
                        next();
                        /// DO NOT RESPOND TO GET REQUESTS....
                    }else{ 
                        // console.log("/// Not A Get Request... ");
                            next();
                    }
                });
            
            ////===##############################   
            //// POST REQUESTS INCOMING from AUTHED IP Addresses 
                ////  --> Parse Post Params and store --> req.astir.postParams 
                    app.use(function(req, res, next) {
                        //////////////  Parse Any Incoming POST REQUEST Like From CONTACT FORM..
                            if (req.method === "POST") {
                                /// Set Response Headers for JSON");
                                    res.setHeader('Content-Type', 'application/json');
                                //  example stringified response..  --> res.send(JSON.stringify({ a: 1 }));


                                ///-  Add URL String Query Params if it has one..
                                    let QueryParamLength = Object.keys(req.query).length;
                                    if( QueryParamLength >= 1){
                                        // console.log(req.query);
                                        req.astir.queryString = req.query;
                                    }
                                    
                                // console.log("      ======================");
                                // console.log("      --> THIS POST REQUEST    ");
                                // console.log(" EndPoint :   "+req.astir.endpoint+"  Post Stats: ");
                                // console.log(req.astir);
                                // console.log(Object.keys( req  ));

                                next();
                            } else {
                                ///-  IGNORE REQUEST IF IT IS NOT A POST REQUEST..
                                next();
                            }
                    });


    ////===##########################################################   
    /////////////////////////////////////////////
    /////  BLOGGING API SPECIFIC MIDDLE-WARES 
            // app.use(function(req,res,next){
            //     ///
            // });



    ////##################################
    ////### ROUTING FOR ENDPOINTS  
        console.log(  "   ROUTING   ");
        app.use('/', routes);

    ///## Tell Main thread about this MiddleWare Being Processed..  
        const data = {
            msg: "\n--> Init Express Middleware for Get and Post Request"
        };
        callback_withData(data.msg);
};
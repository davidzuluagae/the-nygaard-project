// config.js

/*
//  Config Flat File for WebStore...
        WebServer Configuration
        FACEBOOK/GOOGLE  API
        DATABASE - MongoDB / Neo4j


*/
'use strict'
const appName = "the-nygaard-project";
// var privateKey  = fs.readFileSync('sslcert/zeeram.com.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/349a0bbaa1c74d55.crt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};
var path = require('path');
var productionConfig = {
        ///- Mongo DATABASE 
           db: 'mongodb://localhost/API_nygaard',
        
        //-  Application Information
            appLocals: {
               title : "Server --> "+appName,
                    domainURL : "default",
                   contactEmail : "default",
                    keywords : "API Not For You.",
            },

        ///- WEB SERVER CONFIG
            webServer : {
                whitelist_ip : [
                    "127.0.0.1",          /// localhost
                    // "54.227.115.243",  /// wiki.astir.io
                ],
                port : 1337,
                public_directory : path.join(__dirname,"../Client"),
                session_secret : 'default',
                session_length_hours : 36,  // Will Last for 36 hours 
            },

        //- Email Sender - Config Via Gmail..  
            sendEmail_service : "Gmail",
            sendEmail_user : 'updateMail@gmail.com',
            sendEmail_pass : 'updatePassword',
};

var developmentConfig = {
        ///- Mongo DATABASE 
           db: 'mongodb://localhost/API_nygaard',
        
        //-  Application Information
            appLocals: {
               title : " --> "+appName,
                    domainURL : "default",
                   contactEmail : "default",
                    keywords : "API Not For You.",
            },

        ///- WEB SERVER CONFIG
            webServer : {
                whitelist_ip : [
                    "127.0.0.1",          /// localhost
                    // "54.227.115.243",  /// wiki.astir.io
                ],
                port : 5000,
                public_directory : path.join(__dirname,"../Client"),
                session_secret : 'default',
                session_length_hours : 36,  // Will Last for 36 hours 
            },

        //- Email Sender - Config Via Gmail..  
            sendEmail_service : "Gmail",
            sendEmail_user : 'updateMail@gmail.com',
            sendEmail_pass : 'updatePassword',
};




module.exports = developmentConfig;
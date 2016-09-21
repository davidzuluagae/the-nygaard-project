///// Uniform and abstract MongoDB interaction

'use strict'


let config = require("../Config/config");
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');   // uniform Mongoose Promise handling...   




/// PROMISES for MongoDB Interaction and Admin
exports.mongoAdmin = {
    start: function(){
        return new Promise(function(resolve, reject){
            console.log(" Creating Connections to The Databases for this API");
            
            //- Open Connection to MongoDB for this Server to use.. 
                exports.mongoAdmin.openMongoConnection().then(function(){
                    console.log("      ===>    Started mongoAdmin IO");
                
                }).then(function(){
                    /// Start Up DB Access Logger    
                        console.log("      ===> Starting Up MongoDB : Access Logger");
                
                }).catch(function(reason){
                    //// FAILED TO START mongoDB Admin Module
                    console.log("ERROR WITH MONGO DB CONNECTION.. ");console.log(reason);
                
                });

            ////////// // / 
                if(true){
                    resolve({
                        startTime_mongoDB_IO_conn : ( new Date() ).getTime()  
                    });
                }else{
                    reject();
                }
        });
    },
    //= Get Number of Live Connections 
    connectionCount: function() {
        return new Promise(function(resolve, reject) {
            let connectionCount = 0;
            console.log(" --> Total MongoDB Connections : " + connectionCount);
            if (true) {
                resolve(connectionCount);
            } else {
                console.log(" FAILED TO GET CONNECTION COUNT  to MongoDB connectionCount");
                reject( /* reason */ );
            }
        });
    },
    
    //- 
    restartMongoConnection: function() {
        return new Promise(function(resolve, reject) {
            console.log(" --> Restarting Current MongoDB Connection");
            if (true) {
                resolve();
            } else {
                console.log(" FAILED TO RESTART CONNECTION to MongoDB restartMongoConnection");
                reject( /* reason */ );
            }
        });
    },

    // 
    openMongoConnection: function(dbURL) {
        let thisMongoURI;
        if (dbURL) {
            thisMongoURI = dbURL;
        } else {
            thisMongoURI = config.db;
        }
        return new Promise(function(resolve, reject) {
            console.log(" --> Attempting to Open New MongoDB Connection");
            mongoose.connect(thisMongoURI);

            if (true) {
                resolve();
            } else {
                console.log(" FAILED TO OPEN CONNECTION to MongoDB openMongoConnection");
                reject( /* reason */ );
            }
        });

    },

    //= Close Mongo DB Connection 
        closeMongoConnection: function() {
            return new Promise(function(resolve, reject) {
                console.log(" --> Closing Current MongoDB Connection");
                mongoose.connection.close();

                if (true) {
                    resolve( /* value */ ); // fulfilled successfully
                } else {
                    console.log(" FAILED TO CLOSE CONNECTION to MongoDB closeMongoConnection");
                    reject( /* reason */ ); // error, rejected
                }
            });
        },
};

//- ALIAS 
    exports.mongoAdmin.stop = exports.mongoAdmin.closeMongoConnection;

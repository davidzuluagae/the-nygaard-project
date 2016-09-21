// REST API  POST ROUTING.. ROUTING  
'use strict'
/*
		Handles API routing and view Routing 
*/

var config = require("../../Config/config");
	// console.log(config);
var express = require('express'); //-  ExpressJS Web Server Module ..  
var router = express.Router();
var path = require("path");
var mongoose = require('mongoose');
	mongoose.Promise = require('bluebird');
	mongoose.connect( config.db );


////===----------------------------------====/////
////===-------------------------------
/////    NORMAL ROUTING 
	//=  Submit New Blog for Review
	// 	router.post("/new_blog", function(req, res) {

	// 		let newBlog_Content = req.astir.postParams.content;
	// 	    console.log("\n\nIncoming Content:");
	// 	    console.log(typeof newBlog_Content);
	// 	    console.log(newBlog_Content);
	// 	    	console.log("CONFIRMING PARAMS ");
	// 	    	if(req.astir.postParams.content && req.astir.postParams.title){
	// 				   console.log("   ###############################");
	// 			       console.log("   ###   CREATE NEW BLOG ARTICLE ");
	// 			       let testBlog = 	new Blog_Article( req.astir.postParams );
	// 					// let Blog_DB = 
								
	// 						console.log(" SEARCHING FOR MATCHING ARTICLE NAME ALREADY IN DB");
	// 						testBlog.confirmNewBlogIsOKtoWrite(function(data){
	// 							if(data.success === false){
	// 								console.log("!!!!ERROR MESSAGE"); 
	// 								console.log(data.msg); 
	// 								let returnOBJECT = {success : false, msg: data.msg};
	// 								returnOBJECT = JSON.stringify(returnOBJECT);
	// 								res.send(returnOBJECT);
	// 							}else{
	// 								console.log("Go Ahead and save this Model Data It doesnt have conflictions in the DB");
	// 								console.log(data.msg); 
	// 								///// USE PROMISE SYNTAX WHEN WRITING TO MONGO..
	// 								let saveBlog_Article_Promise = testBlog.save(); 
	// 									saveBlog_Article_Promise.then(function(data){
	// 										console.log("!!!!successfully Saved the new Article");
	// 										console.log(data);
	// 										 	  let returnOBJECT = {success : true, title: data.title, msg: "Wrote new Blog Article" };
	// 											  	  returnOBJECT = JSON.stringify(returnOBJECT);

	// 											  res.send(returnOBJECT);
	// 									}).catch(function(err){
	// 										console.log("ERROR WRITING BLOG ARTICLE TO DATABASE");
	// 										let returnOBJECT = {success : false, title: data.title, msg: "FAILED to write new Blog Article" };
	// 											  	  returnOBJECT = JSON.stringify(returnOBJECT);
	// 												  res.send(returnOBJECT);
	// 									});
	// 							}
	// 						});	

	// 	    	}else{
	// 	    		console.log("Params Were Not Passed");
	// 	    		console.log(req.astir.postParams);
	// 	    		let returnOBJECT = {success : false,  msg: "Params Were Not Passed" };
	// 				  	  returnOBJECT = JSON.stringify(returnOBJECT);
	// 					  res.send(returnOBJECT);
	// 	    	}

	router.get("/health", function(req, res){
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify({ status: "up" }));
	});


	// 	});
	

	// //= Fetch Blog Article
	// 	router.post("/submit_your_blog", function(req, res){
	// 		let resOBJ = {name: "Submit Blog for Review"}; 
	// 		res.send(JSON.stringify( resOBJ ));	
	// 	});		

	// //= UPDATE EXISTING BLOG ARTICLE..
	// 	router.post("/update_blog", function(req, res){
	// 		// Parse user who made request and Which Blog They Desire to Update..
	// 		// Make Sure This User Has Permissions to Update This Blog..

	// 		let resOBJ = {name: "testOBJECT"}; 
	// 		res.send(JSON.stringify( resOBJ ));	
	// 	});
		
	// //= Delete Blog Article
	// 	router.post("/delete_article", function(req, res){
	// 		let resOBJ = {name: "Delete Blog Article"}; 
	// 		res.send(JSON.stringify( resOBJ ));	
	// 	});



module.exports = router;
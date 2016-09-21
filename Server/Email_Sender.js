// Email_Sender.js

'use strict'

var nodemailer = require("nodemailer");

/// Get Configuration for Emailer 
var config = require('../Config/config');


/// Set Up Email Transport  with Configuration  from flat file.. .  
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: config.sendEmail_service,
	    auth: {
	        user: config.sendEmail_user,
	        pass: config.sendEmail_pass
	    }
	});


// function(send2, subject, message)
  exports.sendMail_email2client_postFillingOutForm = function(send2, callback){
        smtpTransport.sendMail({
           from: "Crowley Carpets <crowleycarpets@gmail.com>", // sender address
           to: "<"+send2+">", // comma separated list of receivers
           subject: "Thanks for contacting us at Crowley Carpets!", // Subject line
           text: "We aim to get back to you within 24 hours regarding your project request.\nWe look forward to speaking with you soon!\nBest Regards,\nJosh\nCrowley Carpets Ltd."

        }, function(error, response){
           if(error){
               console.log(error);
           }else{
               console.log("Email Message Sent: " + response.message);
               if(callback){
                  callback();
               }
           }
        });
  };


//-  Send Email to JOSH to let him know that a new Contact Email -->  
  exports.sendMail_email2josh_postFillingOutForm = function(send2, formValues, callback){
        smtpTransport.sendMail({
           from: "Crowley Carpets - SERVER Process <RuvoSounds@gmail.com>", // sender address
           to: "<"+send2+">", // comma separated list of receivers
           subject: "NEW Crowley Carpets Inquirey", // Subject line
           text: JSON.stringify(formValues, null, '\t')

        }, function(error, response){
           if(error){
               console.log(error);
           }else{
               console.log("Email Message sent: " + response.message);
               if(callback){
                  callback();
               }
           }
        });
  };

 // ///  RUN EMAIL TEST
 // exports.sendMail("adeptpro33@gmail.com", function(){
 // 		console.log("   DONE SENDING EMAIL..");
 // });



///// When User Updated Their Email Send Notification To Old And New Emails..  
  // exports.sendEmailHasBeenUpdatedNotifications = function(oldEmail, newEmail){
  //     console.log(" ####  Sending Email to Old Email Letting them Know Account has NEW Linked Email ");
  //     console.log(" ####    Sending Email to New Account Email Post Email Change..");
  // };  

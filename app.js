// Libs
var express = require('express');
var aws = require('aws-sdk');

// Configuration
const port = process.env.port || 8081; 
const snsTopic = process.env.snsTopic;
const apiKey = process.env.apiKey;

// The app
var app = express();

app.get('/', function(req, res) {
  res.send( 'That was easy' );
});

app.get('/health', function(req, res) {
  res.json({ "STATUS": "UP" });
});

app.listen(port);
console.log("Server listening on: http://localhost:%s", port);
console.log("Will publish events to: %s", snsTopic);
console.log("API Key: %s", apiKey);

// Export the app for unit testing
module.exports = app;
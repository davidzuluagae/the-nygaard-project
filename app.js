// Libs
var express = require('express');
var AWS = require('aws-sdk');

// Configuration TODO: Move to seprate file / instance tags. 
const PORT=8081; 

// The app
var app = express();

app.get('/', function(req, res) {
  res.send( 'That was easy' );
});

app.get('/health', function(req, res) {
  res.send( JSON.stringify({ "STATUS": "UP" }) );
});

app.listen(PORT);
console.log("Server listening on: http://localhost:%s", PORT);
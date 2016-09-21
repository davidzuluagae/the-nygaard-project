var express = require('express');

const PORT=8081; 

var app = express();

app.get('/', function(req, res) {
  res.send( 'That was easy' );
});

app.get('/health', function(req, res) {
  res.send( JSON.stringify({ "STATUS": "UP" }) );
});

app.listen(PORT);
console.log("Server listening on: http://localhost:%s", PORT);
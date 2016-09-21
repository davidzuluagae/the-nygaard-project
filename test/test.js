var request = require('supertest');
var app = require('../app.js');

describe('GET /', function() {
  it('Should be status code 200', function(done) {
    request(app).get('/').expect(200,done)
  });
  it('Should have proper content', function(done) {
  	request(app).get('/')
  		.expect(/That was easy/, done);
  });
});

describe('GET /health', function() {
  it('Should be status code 200', function(done) {
    request(app).get('/').expect(200,done)
  });
});
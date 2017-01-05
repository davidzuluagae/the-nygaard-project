// Libs
const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const binary = require('binary');

// Configuration
const PORT = process.env.PORT || 8081;
const SNS_TOPIC = process.env.SNS_TOPIC;
const API_KEY = process.env.API_KEY;
const REGION = process.env.REGION || 'us-west-2';

// The app
let app = express();

aws.config.update({REGION});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('That was easy');
});

app.post('/', function (req, res) {

    if (req.body.apiKey == API_KEY) {
        let {Message, Subject} = req.body;
        let sns = new aws.SNS();
        sns.publish(
            {
                TargetArn: SNS_TOPIC,
                Message,
                Subject
            },
            (err, data) => {
                if (err) {
                    console.log(`Error sending a message ${err}`);
                    res.send(`Error sending a message ${err}`);
                } else {
                    console.log(`Sent message: ${data.MessageId}`);
                    res.send(`Sent message: ${data.MessageId}`);
                }
            });

  } else {
  	res.send(`Negative: ${JSON.stringify(req.body)}`);
  }

});

app.get('/health', (req, res) => {
    res.json({"STATUS": "UP"});
});

app.listen(PORT);
console.log("Server listening on: http://localhost:%s", PORT);
console.log("Will publish events to: %s", SNS_TOPIC);
console.log("API Key: %s", API_KEY);

// Export the app for unit testing
module.exports = app;
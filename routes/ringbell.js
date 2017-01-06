const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const router = express.Router();

// Props.
const API_KEY = process.env.API_KEY;
const REGION = process.env.REGION || 'us-west-2';
const upload = multer({dest: 'uploads/'});
const SNS_TOPIC = process.env.SNS_TOPIC;

aws.config.update({REGION});

router.get('/', (req, res) => {
    res.send('That was easy');
});

router.post('/', upload.single('photo'),
    function (req, res, next) {
        //todo: implement file handler, see https://www.npmjs.com/package/multer
        let file = req.file;
        next();
    }, function (req, res) {

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

console.log('Will publish events to: %s', SNS_TOPIC);
console.log('API Key: %s', API_KEY);
module.exports = router;

let express = require('express');
const speech = require('@google-cloud/speech');
const fs = require('fs');
var cors = require('cors')
const record = require('node-record-lpcm16');



let app = express();
app.use(cors({ credentials: true, origin: true }))


app.use(express.static('../client'))

// Creates a client
const client = new speech.SpeechClient({
    keyFilename: '/Users/dan/Desktop/voice-reg-726cf482388e.json'
});

const filename = './sample.wav';
const encoding = 'LINEAR16';
const sampleRateHertz = 8000;
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};




app.get('/voice', (req, res) => {
    client
    .recognize(request)
    .then(data => {
        const response = data[0];
        const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        res.json({
            message: transcription
        })
    })
    .catch(err => {
        console.error('ERROR:', err);
        res.json({
            error: "error"
        })
    });
})


app.listen(3000, () => {
    console.log("listening to port 3000")
});
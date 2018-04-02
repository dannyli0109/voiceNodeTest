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

// const filename = './sample.wav';
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
    },
    interimResults: true, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
        // console.log(data)
        return process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : `\n\nReached transcription time limit, press Ctrl+C\n`
        )
    }

    );

// Start recording and send the microphone input to the Speech API
record
    .start({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0',
    })
    .on('error', console.error)
    .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');
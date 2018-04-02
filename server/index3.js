let express = require('express');
const speech = require('@google-cloud/speech');
const fs = require('fs');
var cors = require('cors')
const record = require('node-record-lpcm16');
var ss = require('socket.io-stream');
var streamBuffers = require('stream-buffers');




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
        console.log(data)
        // console.log(data)
        // return process.stdout.write(
        //     data.results[0] && data.results[0].alternatives[0]
        //         ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        //         : `\n\nReached transcription time limit, press Ctrl+C\n`
        // )
    });
let server = app.listen(3000);

app.use(express.static('../client'));

console.log("My socket server is running");


let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log(socket.id)

    socket.on('blob', blobData)

    function blobData(data) {
        console.log(data)
        // var stream = ss.createBlobReadStream(data);
        // console.log(stream)

        // ss(socket).on('stream', function(stream) {
        //     console.log(stream)
        // })
        // console.log(data)
        // data.pipe(recognizeStream)
        // let out = Buffer.from(data).toString('base64')
        // console.log(out)
        // request.uri = out;
    }
}




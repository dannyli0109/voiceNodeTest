// fetch('/voice')
//     .then(res => {
//         return res.json()
//     })
//     .then(body => {
//         console.log(body.message)
//     })
let socket
socket = io.connect('/')
stream = ss.createStream();

function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

function getStream(type) {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {};
    constraints[type] = true;
    getUserMedia(constraints, function (stream) {
        // var mediaControl = document.querySelector(type);
        let chunks = [];
        let track = stream.getAudioTracks()
        // let audio = document.querySelector("#audio").srcObject = stream

        // audio.onloadedmetadata = function() {
        //     console.log("hello")
        // }
        // const recorder = new MediaRecorder(stream);
        // console.log(recorder)

        // let mediaRecorder = new MediaStreamRecorder(stream);
        // let a = window.webkitURL.createObjectURL(stream)

        // console.log(a)

        // socket.emit('blob', track)



        // recorder.ondataavailable = e => {
        //     console.log(e.data)
        //     chunks.push(e.data)
        //     const blob = new Blob(chunks, {type: 'audio/webm'})
        //     socket.emit('blob', blob)
            
        // }

        // recorder.start(500);
        // // setTimeout to stop recording after 4 seconds
        // setTimeout(() => {
        //     // this will trigger one final 'ondataavailable' event and set recorder state to 'inactive'
        //     recorder.stop();
        // }, 4000);

    }, function (err) {
        alert('Error: ' + err);
    });
}

getStream("audio")

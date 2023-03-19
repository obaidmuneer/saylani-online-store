import { useContext, useState } from "react"
import RecordRTC from "recordrtc"
import axios from "axios";
import { GlobalContext } from "../context/context";

const blobToBuffer = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = reader.result;
            console.log(buffer);
            resolve(buffer);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}

function convertToAudioFile(blobOrBuffer, mimeType, fileName) {
    const blob = new Blob([blobOrBuffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play()
    console.log(url);
    console.log(audio);
}

const useRecorder = () => {
    const [audioRecording, setAudioRecording] = useState({})
    const [recStream, setRecStream] = useState(null)
    const [isRec, setIsRec] = useState(false)
    const { state } = useContext(GlobalContext)

    const startRec = () => {
        // // Create a new instance of SpeechRecognition
        // const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
        // let recognition = new SpeechRecognition()

        // // Set the recognition options, such as language
        // recognition.lang = "en-US";

        // // Set the interimResults option to true to get intermediate results
        // recognition.interimResults = true;

        // // Start the recognition
        // recognition.start();

        // // Listen for the "result" event to get the speech recognition results
        // recognition.addEventListener("result", (event) => {
        //     // Get the latest result
        //     let latestResult = event.results[event.results.length - 1];
        //     console.log(latestResult);

        //     // Get the transcript
        //     let transcript = latestResult[0].transcript;

        //     // Check if the user is still speaking
        //     let isSpeaking = latestResult.isFinal === false;


        //     console.log(transcript, isSpeaking);



        // });


        // Listen for the "end" event to know when the recognition has stopped
        // recognition.addEventListener("end", () => {
        //     console.log("Recognition stopped.");
        // });





        return new Promise(async (resolve, reject) => {
            try {
                setIsRec(true)
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log('mic', stream);
                setRecStream(stream)

                const recorder = new RecordRTC.RecordRTCPromisesHandler(stream, {
                    type: 'audio',
                    mimeType: 'audio/webm',
                    sampleRate: 44100,
                    desiredSampRate: 16000,
                    recorderType: RecordRTC.MediaStreamRecorder,
                    numberOfAudioChannels: 1
                });
                recorder.startRecording();

                setAudioRecording(recorder)
                resolve(recorder)

            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    const stopRec = async () => {
        await audioRecording.stopRecording()
        setIsRec(false)
        // console.log(audioRecording);

        // const blob = await audioRecording.blob
        // const url = URL.createObjectURL(blob)
        // const audio = new Audio(url);
        // console.log(audio);
        // audio.play()


        // convertToAudioFile(blob, 'audio/mp3', 'my-audio-file.mp3');
    }

    return { isRec, audioRecording, recStream, startRec, stopRec }
}
export default useRecorder




//https://github.com/mInzamamMalik/google-speech-api-from-browser/
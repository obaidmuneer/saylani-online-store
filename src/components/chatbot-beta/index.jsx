import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    ConversationHeader,
    Avatar,
    ExpansionPanel,
    InputToolbox,
    SendButton,
    AttachmentButton,
} from "@chatscope/chat-ui-kit-react";
import { useState, useRef, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import useCart from "../../hooks/useCart";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import { BsMicFill } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import './styles.css'
import useRecorder from "../../hooks/useRecorder";
import hark from 'hark'


const ChatbotBeta = ({ userId }) => {
    const { state } = useContext(GlobalContext)
    const { isRec, audioRecording, recStream, startRec, stopRec } = useRecorder()
    const { getCart } = useCart()

    const [chat, setChat] = useState([])

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const sendDataToDialogflow = async (msg, audioData) => {
        try {
            const res = await axios.post(`${state.api}dialogflow`, { msg, userId, audioData })
            console.log(res);
            if (res.fulfillmentText === '') {
                throw new Error('Something went wrong')
            }
            let audioBufer = res.data.messages.pop().audio;
            // console.log(res.data.messages[0]);

            // let base64 = btoa(String.fromCharCode(...new Uint8Array(audioBufer.data)));
            // the above code will not work for large file

            const base64 = _arrayBufferToBase64(audioBufer.data)
            if (!msg) {
                setChat(prev => [...prev, {
                    sender: 'user',
                    text: res.data.queryText
                }])

            }
            setChat(prev => [...prev, res.data.messages[0]])

            const flag = ['orderItem', 'updateItem', 'itemPrice - order'].includes(res.data.intent)
            // console.log(flag);
            if (flag) getCart()


            document.querySelector("#myaudio").src = "data:audio/mp3;base64," + base64;
            document.querySelector("#myaudio").play()

            // var audioFile = new Audio("data:audio/mp3;base64," + base64);
            // audioFile.play();
        } catch (error) {
            console.log(error);
            setChat(prev => [...prev, {
                sender: 'chatbot',
                text: 'Something went wrong'
            }])
            let utterance = new SpeechSynthesisUtterance();
            utterance.text = "something went wrong!";
            utterance.voice = speechSynthesis.getVoices()[1];
            speechSynthesis.speak(utterance);

        }
    }

    const stopRecording = async () => {
        // setIsRec(true)
        await stopRec()
        const blob = audioRecording.blob
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = async function () {
            // console.log(reader.result);
            const base64Data = reader.result.split(',')[1]; // Extract the base64 data from the data URI
            // console.log(base64Data);

            // Send the base64Data to Dialogflow
            sendDataToDialogflow(null, base64Data)
        };
    };

    const handleSubmit = async (e) => {
        // console.log(userId);
        // console.log(e);
        setChat(prev => [...prev, {
            sender: 'user',
            text: e
        }])
        sendDataToDialogflow(e, null)
        document.querySelector("#myaudio").pause()
    }

    // useEffect(() => {
    //     if (isRec) {
    //         (async () => {
    //             // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //             var speechEvents = hark(recStream, {});
    //             speechEvents.on('stopped_speaking', async function (e) {
    //                 console.log('stopped_speaking', e);
    //                 console.log('i am working');
    //                 await stopRecording()
    //                 // speechEvents.stop();
    //             });
    //         })()
    //     }
    // }, [isRec])

    return (
        <div style={{ position: "fixed", bottom: '75px', right: '5px', width: '300px' }}>

            <ExpansionPanel title="Saylani Online Store" open={false} >
                <MainContainer style={{ height: "400px", border: 'none' }} >
                    <ChatContainer >
                        <MessageList >
                            {
                                chat.map((msg, i) => {
                                    return <Message key={i} model={{
                                        message: msg?.text,
                                        sentTime: "just now",
                                        sender: msg?.sender,
                                        direction: msg?.sender === 'chatbot' ? "incoming" : 'outgoing'
                                    }}>
                                        <Avatar src={'https://images-platform.99static.com//X0F3CDfCL6LcdPsSJNtRXSGn86Q=/108x1101:902x1895/fit-in/500x500/99designs-contests-attachments/126/126736/attachment_126736972'} name="Joe" />
                                    </Message>
                                })
                            }
                        </MessageList>

                        <InputToolbox >
                            {/* <AudioRecorder onRecordingComplete={addAudioElement} /> */}
                            <MessageInput style={{ alignItems: 'center', border: 'none', width: '90%' }} attachButton={false} onSend={(e) => handleSubmit(e)} placeholder="Type message here" />
                            <IconButton icon={<BsMicFill />} bg={'red.400'} onClick={() => {
                                isRec ? stopRecording() : startRec()
                            }} />

                        </InputToolbox>
                    </ChatContainer>
                </MainContainer>
            </ExpansionPanel>

            <div style={{ display: 'none' }} >
                <audio controls id="myaudio"></audio>
            </div>

        </div>
    )
}

export default ChatbotBeta
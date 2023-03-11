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
} from "@chatscope/chat-ui-kit-react";
import { useState, useRef, useContext } from "react";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import { AudioRecorder } from 'react-audio-voice-recorder';
import useCart from "../../hooks/useCart";

const ChatbotBeta = ({ userId }) => {
    const { state } = useContext(GlobalContext)
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
        const res = await axios.post(`${state.api}dialogflow`, { msg, userId, audioData })
        console.log(res.data.messages);
        let audioBufer = res.data.messages.pop().audio;

        const base64 = _arrayBufferToBase64(audioBufer.data)
        setChat(prev => [...prev,
        !msg && {
            sender: 'user',
            text: res.data.queryText
        },
        res.data.messages[0]])

        const flag = ['orderItem', 'updateItem',].includes(res.data.intent)
        // console.log(flag);
        if (flag) {
            getCart()
        }


        var audioFile = new Audio("data:audio/mp3;base64," + base64);
        audioFile.play();
    }


    const addAudioElement = async (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = async function () {
            // console.log(reader.result);
            const base64Data = reader.result.split(',')[1]; // Extract the base64 data from the data URI
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




        // let base64 = btoa(String.fromCharCode(...new Uint8Array(audioBufer.data)));
        // the above code will not work for large file
        // document.querySelector("#myaudio").src = "data:audio/mp3;base64," + base64;
        // document.querySelector("#myaudio").play()
    }
    return (
        <div style={{ position: "fixed", bottom: '75px', right: '5px', width: '270px' }}>
            <AudioRecorder onRecordingComplete={addAudioElement} />
            <ExpansionPanel title="Chat Bot" open={false} >
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
                        <MessageInput attachButton={false} onSend={(e) => handleSubmit(e)} placeholder="Type message here" />
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
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
import { Button, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { BsMicFill } from "react-icons/bs";
import { IconBase } from "react-icons/lib";
import './styles.css'
import useRecorder from "../../hooks/useRecorder";
import hark from 'hark'
import useChat from "../../hooks/useChat";


const ChatbotBeta = ({ userId }) => {
    const { sendMsg, handleSubmit, chat, } = useChat()
    const { isRec, audioRecording, recStream, startRec, stopRec } = useRecorder()

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
            // sendDataToDialogflow(null, base64Data)
            sendMsg(null, base64Data)
        };
    };


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
                            <Tooltip label={isRec ? 'Stop' : 'Start'} >
                                <IconButton icon={<BsMicFill />} bg={isRec ? 'green.400' : 'red.400'}
                                    _hover={{
                                        bg: `green.600`,
                                    }}
                                    onClick={() => {
                                        isRec ? stopRecording() : startRec()
                                    }} />
                            </Tooltip>

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
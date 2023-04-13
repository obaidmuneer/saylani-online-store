import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import useCart from "./useCart";
import usePatch from "./usePatch";
import { useNavigate } from "react-router-dom";

const useChat = () => {

    const { state, dispatch } = useContext(GlobalContext)
    const userId = state.user._id
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

    const handleSubmit = async (e) => {
        // console.log(userId);
        // console.log(e);
        setChat(prev => [...prev, {
            sender: 'user',
            text: e
        }])
        // sendDataToDialogflow(e, null)
        sendMsg(e, null)
        document.querySelector("#myaudio").pause()
    }


    //sendDataToDialogflow
    const sendMsg = async (msg, audioData) => {
        try {
            const res = await axios.post(`${state.api}dialogflow`, { msg, userId, audioData })

            console.log(res.data.fulfillmentText);
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

            document.querySelector("#myaudio").src = "data:audio/mp3;base64," + base64;
            document.querySelector("#myaudio").play()
            if (['orderItem', 'updateItem', 'itemPrice - order', 'payment'].includes(res.data.intent)) {
                getCart()
            }
            // else if (res.data.intent === 'checkout_followup') {
            //     // const { name, address } = res.data.params.field
            //     console.log(res.data.params.fields);
            //     if (res.data.params.fields?.address.stringValue) {
            //         patch('checkout', {
            //             name: res.data.params.fields?.name.structValue.fields.name.stringValue,
            //             address: res.data.params.fields?.address.stringValue
            //         })
            //         patch('chatbot', true)
            //         navigate('/payment', { replace: true })
            //     }
            // }

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

    return { sendMsg, chat, handleSubmit }
}

export default useChat
import React from 'react'
import useCart from '../../hooks/useCart';

const Chatbot = ({ userId }) => {
    const { getCart } = useCart()

    const dfMessenger = document.querySelector('df-messenger');
    dfMessenger?.addEventListener('df-response-received', function (event) {
        // console.log(event.detail.response.queryResult.fulfillmentMessages[0].text.text[0]);
        // console.log(event.detail.response.queryResult.intent.displayName);
        if (event.detail.response.queryResult.intent.displayName === 'orderItem') {
            getCart()
        }

        // https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger

    });

    return (
        <div><df-messenger user-id={userId} intent="WELCOME" chat-title="Saylani Store" agent-id="7f35dae3-605e-415e-8bda-93d8e6d10337"
            language-code="en"></df-messenger></div>
    )
}

export default Chatbot
import { PaymentElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import useChat from "../../hooks/useChat";
import useOrder from "../../hooks/useOrder";
import axios from "axios";
import { GlobalContext } from "../../context/context";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const sec_c = useColorModeValue('white', 'gray.800')
  const { state } = useContext(GlobalContext)
  const naviagte = useNavigate()

  const stripe = useStripe();
  const elements = useElements();
  const { sendMsg, handleSubmit: sendChat } = useChat()
  const { placeOrder } = useOrder()

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/checkout`,
      },
      redirect: 'if_required'
    });
    // console.log(paymentIntent.id);
    // console.log(paymentIntent.amount);
    // console.log(paymentIntent.receipt_email); 
    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // console.log(paymentIntent);
      try {
        console.log(state.cart._id, paymentIntent.id);
        setTimeout(async () => {
          setMessage("Payment Status: " + paymentIntent.status);
          const res = await axios.post(`${state.api}payment`, { payment_id: paymentIntent.id })
          // console.log(res.data.payment[0].payment_id);
          if (state.checkout && res.data.payment[0].payment_id === paymentIntent.id) {
            placeOrder(state.checkout)
            // state.chatbot && await sendMsg(`confirm the payment of ${paymentIntent.amount} from ${paymentIntent.receipt_email}`)
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        width={'full'}
        mt={2}
        bg={`green.400`}
        disabled={isProcessing || !stripe || !elements}
        color={sec_c}
        _hover={{
          bg: `green.600`,
        }}
        isLoading={isProcessing}
        type='submit' >
        {isProcessing ? "Processing ... " : "Pay now"}
      </Button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
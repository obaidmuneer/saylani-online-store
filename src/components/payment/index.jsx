import { useContext, useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GlobalContext } from "../../context/context";
import CheckoutForm from "../checkoutForm";
import { Center } from "@chakra-ui/react";

function Payment() {
    const { state } = useContext(GlobalContext)
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        state.cart && fetch(`${state.api}stripe/config`).then(async (r) => {
            const { publishableKey } = await r.json();
            console.log(publishableKey);
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        state.cart && fetch(`${state.api}stripe/create-payment-intent`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: state.cart.total,
                email: state.user.email,
                cart_id: state.cart._id,
                userId: state.user._id
            })
        }).then(async (result) => {
            var { clientSecret } = await result.json();
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            <Center flexDir={'column'} >
                {state.cart.total && <h1>Total Amount: {state.cart.total} rs</h1>}
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm />
                    </Elements>
                )}
            </Center>
        </>
    );
}

export default Payment;
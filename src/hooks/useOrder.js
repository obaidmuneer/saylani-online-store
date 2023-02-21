import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useOrder = () => {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const placeOrder = async ({ name, address }) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${state.api}orders/place`, {
                cart_id: state?.cart?._id,
                name,
                address,
            }, { withCredentials: true })
            console.log(res.data);
            // dispatch({
            //     type: 'cart',
            //     payload: res.data.cart
            // })
            toast({
                title: res.data.messege.text,
                status: res.data.messege.type,
                position: 'bottom-right',
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: 'Something went wrong',
                status: 'error',
                position: 'bottom-right',
                isClosable: true,
            })
        }
        setIsLoading(false)
    }



    return { placeOrder, isLoading }
}

export default useOrder
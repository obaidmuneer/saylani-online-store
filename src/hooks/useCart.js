import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useCart = () => {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const addToCart = async (id) => {
        setIsLoading(true)
        // console.log(id);
        const res = await axios.post(`${state.api}orders`, {
            product_id: id,
            quantity: 1,
            cart_id: state?.cart?._id
        }, { withCredentials: true })
        // console.log(res.data.cart);
        dispatch({
            type: 'cart',
            payload: res.data.cart
        })
        toast({
            title: res.data.messege.text,
            status: res.data.messege.type,
            position: 'bottom-right',
            // containerStyle: {
            //     mb: "70px"
            // },
            isClosable: true,
        })
        setIsLoading(false)
    }

    return { addToCart, isLoading }
}

export default useCart
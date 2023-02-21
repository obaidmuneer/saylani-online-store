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
        try {
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

    const updateCart = async (id, qty) => {
        setIsLoading(true)
        try {
            const res = await axios.put(`${state.api}orders`, {
                cart_id: state?.cart?._id,
                product_id: id,
                quantity: qty,
            }, { withCredentials: true })
            // console.log(res.data);
            dispatch({
                type: 'cart',
                payload: res.data.cart
            })
            toast({
                title: res.data.messege.text,
                status: res.data.messege.type,
                position: 'bottom-right',
                isClosable: true,
            })
        } catch (error) {
            // console.log(error.response.data);
            toast({
                title: error.response.data.messege.text,
                status: error.response.data.messege.type,
                position: 'bottom-right',
                isClosable: true,
            })
        }
        setIsLoading(false)
    }

    const deleteCart = async () => {
        setIsLoading(true)
        try {
            const res = await axios.delete(`${state.api}orders/${state?.cart?._id}`, { withCredentials: true })
            console.log(res.data);
            dispatch({
                type: 'cart',
                payload: []
            })
            toast({
                title: res.data.messege.text,
                status: res.data.messege.type,
                position: 'bottom-right',
                isClosable: true,
            })
        } catch (error) {
            // console.log(error.response.data);
            toast({
                title: error.response.data.messege.text,
                status: error.response.data.messege.type,
                position: 'bottom-right',
                isClosable: true,
            })
        }
        setIsLoading(false)
    }

    return { addToCart, updateCart, deleteCart, isLoading }
}

export default useCart
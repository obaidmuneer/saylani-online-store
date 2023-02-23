import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useOrder = () => {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    const [sucess, setSucess] = useState(false)
    const toast = useToast()

    const getOrders = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${state.api}orders`, { withCredentials: true })
            // console.log(res.data.orders);
            dispatch({
                type: 'adminOrders',
                payload: res.data.orders
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

    const placeOrder = async ({ name, address }) => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${state.api}orders`, {
                cart_id: state?.cart?._id,
                name,
                address,
            }, { withCredentials: true })
            console.log(res.data);
            dispatch({
                type: 'cart',
                payload: []
            })
            dispatch({
                type: 'orders',
                payload: [res.data.order, ...state.orders]
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

    const updateOrder = async (id, status) => {
        setIsLoading(true)
        try {
            // const indexItem = state.adminOrders.findIndex(order => order._id === id)
            // console.log(indexItem);
            const res = await axios.put(`${state.api}orders`, {
                order_id: id,
                status,
            }, { withCredentials: true })
            // console.log(res.data);
            toast({
                title: res.data.messege.text,
                status: res.data.messege.type,
                position: 'bottom-right',
                isClosable: true,
            })
            setSucess(true)
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



    return { getOrders, placeOrder, updateOrder, isLoading, sucess }
}

export default useOrder
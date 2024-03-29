import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useProducts = () => {
    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${state.api}products?page=${state.products.length}`)
            // console.log(res.data.products);
            dispatch({
                type: "products",
                payload: res.data.products
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: 'error',
                payload: error.message
            })
        }
        setIsLoading(false)
    }

    const searchProducts = async (text) => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${state.api}products/search?search=${text}`)
            console.log(res.data.products);
            dispatch({
                type: "products",
                payload: res.data.products
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: 'error',
                payload: error.message
            })
        }
        setIsLoading(false)
    }

    const getProdsByCategory = async (text) => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${state.api}products/${text}`)
            console.log(res.data.products);
            dispatch({
                type: "products",
                payload: res.data.products
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: 'error',
                payload: error.message
            })
        }
        setIsLoading(false)
    }

    const postProduct = async (formData) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${state.api}products`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const data = await response.json()
            if (response.ok) {
                dispatch({
                    type: 'products',
                    payload: [data.product, ...state.products]
                })
            } else {
                throw new Error(data)
            }

        } catch (error) {
            console.log(error.message);
            toast({
                title: 'Something went wrong',
                status: 'error',
                position: 'bottom-right',
                isClosable: true,
            })
        }
        setIsLoading(false)
    }
    return { getProducts, postProduct, searchProducts, getProdsByCategory, isLoading }
}

export default useProducts
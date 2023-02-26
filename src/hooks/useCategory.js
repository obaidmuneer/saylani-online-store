import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useCategory = () => {
    const toast = useToast()

    const { state, dispatch } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false)

    const getCategory = async () => {
        try {
            const res = await axios.get(`${state.api}category`)
            // console.log(res.data);
            dispatch({
                type: "category",
                payload: res.data.category
            })

        } catch (error) {
            console.log(error.message);
            dispatch({
                type: 'error',
                payload: error.message
            })
        }
    }

    const postCategory = async (formData) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${state.api}category`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            const data = await response.json()
            if (response.ok) {
                dispatch({
                    type: 'category',
                    payload: [data.category, ...state.category]
                })
            }else{
                throw new Error(data)
            }
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

    return { getCategory, postCategory, isLoading }
}

export default useCategory
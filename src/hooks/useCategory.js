import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";

const useCategory = () => {

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
            dispatch({
                type: 'category',
                payload: [data.category, ...state.category]
            })
        } catch (error) {
            console.log(error.message);
        }
        setIsLoading(false)

    }

    return { getCategory, postCategory, isLoading }
}

export default useCategory
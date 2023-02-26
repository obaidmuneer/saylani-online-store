import axios from "axios"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/context"

const useAuth = () => {
    const { state, dispatch } = useContext(GlobalContext)
    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`${state.api}users/profile`, {
                    withCredentials: true
                })
                dispatch({
                    type: 'signin',
                    payload: result.data.user
                })
                dispatch({
                    type: 'cart',
                    payload: result.data.cart
                })
                dispatch({
                    type: 'orders',
                    payload: result.data.orders
                })
            } catch (error) {
                console.log(error);
                dispatch({
                    type: 'signin',
                    payload: false
                })
                console.log('please signin to enjoy all our features');
            }
        })()
    }, []);

    return { user: state?.user }
}

export default useAuth
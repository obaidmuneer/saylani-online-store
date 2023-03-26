import { useContext } from "react"
import { GlobalContext } from "../context/context"

const usePatch = () => {
    const { dispatch } = useContext(GlobalContext)
    const patch = (type, payload) => {
        dispatch({
            type,
            payload
        })
    }
    return patch
}
export default usePatch
import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const GlobalContext = createContext("initialState");

let data = {
    theme: "light",
    user: null,
    category: [],
    orders: [],
    cart: null,
    products: [],
    api: window.location.href.includes("localhosts") ?
        "http://localhost:8080/api/v1/"
        :
        "https://saylani-online-store-server.vercel.app/api/v1/"
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
export const GlobalContext = createContext("initialState");

let data = {
    theme: "light",
    user: null,
    icon: null,
    category: [],
    orders: [],
    adminOrders: [],
    cart: null,
    products: [],
    api: window.location.href.includes("localhost") ?
        "http://localhost:8080/api/v1/"
        // "https://saylani-online-store-server-jxh0478lu-obaidmuneer.vercel.app/api/v1/"
        // "https://saylani-online-store-server.vercel.app/api/v1/"

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

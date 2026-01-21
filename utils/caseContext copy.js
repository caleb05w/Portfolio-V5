"use client"
import { createContext, useState, useContext } from "react"

const ToolTipContext = createContext(null)


//funciton to be exported, the children is everything wrapped in it.
export function ToolProvider({ children }) {
    //global state we arepassing.
    const [message, setMessage] = useState("")

    return (
        <ToolTipContext.Provider value={{ message, setMessage }}>
            {children}
        </ToolTipContext.Provider>
    );
}

export function useCaseContext() {
    return useContext(ToolTipContext);
}
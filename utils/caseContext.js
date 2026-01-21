"use client"
import { createContext, useState, useContext } from "react"

const CaseContext = createContext(null)


//funciton to be exported, the children is everything wrapped in it.
export function CaseProvider({ children }) {
    //global state we arepassing.
    const [showTop, setShowTop] = useState(false);

    return (
        <CaseContext.Provider value={{ showTop, setShowTop }}>
            {children}
        </CaseContext.Provider>
    );
}

export function useCaseContext() {
    return useContext(CaseContext);
}
"use client"
import { createContext, useState, useContext, useEffect } from "react"
import { usePathname } from "next/navigation"

const toolTipContext = createContext(null);

export function ToolTipProvider({ children }) {
    const [message, setMessage] = useState("");
    const pathname = usePathname();


    // Clear message when route changes
    useEffect(() => {
        // Use setTimeout to defer the state update
        const timer = setTimeout(() => {
            setMessage("");
        }, 0);

        return () => clearTimeout(timer);
    }, [pathname]);


    const tooltip = (msg) => ({
        onMouseEnter: () => setMessage(msg),
        onMouseLeave: () => setMessage(""),
        onFocus: () => setMessage(msg),
        onBlur: () => setMessage(""),
    });

    return (
        <toolTipContext.Provider value={{ message, tooltip }}>
            {children}
        </toolTipContext.Provider>
    );
}

export const useTooltip = () => useContext(toolTipContext);
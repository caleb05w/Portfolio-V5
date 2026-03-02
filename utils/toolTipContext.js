"use client"
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

const toolTipContext = createContext(null);

export function ToolTipProvider({ children }) {
    const [message, setMessage] = useState("");
    const pathname = usePathname();

    // Clear message when route changes
    useEffect(() => {
        setMessage("");
    }, [pathname]);

    const tooltip = useCallback((msg) => ({
        onMouseEnter: () => setMessage(msg),
        onMouseLeave: () => setMessage(""),
        onFocus: () => setMessage(msg),
        onBlur: () => setMessage(""),
    }), []);

    return (
        <toolTipContext.Provider value={{ message, setMessage, tooltip }}>
            {children}
        </toolTipContext.Provider>
    );
}

export const useTooltip = () => useContext(toolTipContext);
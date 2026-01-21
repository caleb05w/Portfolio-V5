"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTooltip } from "../utils/toolTipContext"; // adjust path

export default function ToolTip() {
    const { message } = useTooltip();
    const tipRef = useRef(null);
    const rafRef = useRef(null);
    const lastRef = useRef({ x: 0, y: 0 });
    const timeoutRef = useRef(null);
    const [isActive, setIsActive] = useState(true);

    console.log("tooltip component - mesage:", message);

    useEffect(() => {
        const onMove = (e) => {
            lastRef.current.x = e.clientX;
            lastRef.current.y = e.clientY;

            // Reactivate on movement
            setIsActive(true);

            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set new timeout to deactivate after 1100ms
            timeoutRef.current = setTimeout(() => {
                setIsActive(false);
            }, 1100);

            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const el = tipRef.current;
                if (!el) return;
                // Add 10px offset so cursor doesn't cover tooltip
                el.style.transform = `translate3d(${lastRef.current.x + 10}px, ${lastRef.current.y + 28}px, 0)`;
            });
        };

        window.addEventListener("mousemove", onMove);
        return () => {
            window.removeEventListener("mousemove", onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <>

            {/* //debug */}
            {/* <div
                className="fixed top-[100px] left-[100px] z-[9999] bg-red-500 p-4"
                style={{ display: 'block !important', visibility: 'visible !important' }}
            >
                <h1 className="text-white">{message}</h1>
            </div> */}


            <div
                ref={tipRef}
                className={`fixed top-0 z-[10000]  duration-150 ease-out ${message && isActive ? "opacity-100" : "opacity-0"}`}
            >
                <h6
                    className={`rounded-lg bg-primary text-white transition-all duration-700 ease-fast text-nowrap overflow-hidden ${message && isActive ? "px-3 py-2 max-w-[20rem] opacity-100" : "max-w-0 px-2 py-2 opacity-0"}`}
                >
                    {message}
                </h6>
            </div>
        </>
    );
}
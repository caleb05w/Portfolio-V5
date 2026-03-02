"use client";
import { useEffect, useRef, useState } from "react";
import { useTooltip } from "../utils/toolTipContext";

export default function ToolTip() {
    const { message } = useTooltip();
    const tipRef = useRef(null);
    const rafRef = useRef(null);
    const lastRef = useRef({ x: 0, y: 0 });
    const timeoutRef = useRef(null);
    const isActiveRef = useRef(true);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const onMove = (e) => {
            lastRef.current.x = e.clientX;
            lastRef.current.y = e.clientY;

            if (!isActiveRef.current) {
                isActiveRef.current = true;
                setIsActive(true);
            }

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                isActiveRef.current = false;
                setIsActive(false);
            }, 1100);

            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                const el = tipRef.current;
                if (!el) return;
                el.style.transform = `translate3d(${lastRef.current.x + 10}px, ${lastRef.current.y + 28}px, 0)`;
            });
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove, { passive: true });
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const visible = message && isActive;

    return (
        <div
            ref={tipRef}
            className={`fixed top-0 z-[10000] duration-150 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
        >
            <h6
                className={`rounded-lg bg-primary text-white transition-[max-width,opacity] duration-700 ease-fast text-nowrap overflow-hidden px-3 py-2 ${visible ? "max-w-[20rem] opacity-100" : "max-w-0 opacity-0"}`}
            >
                <span key={message} className="animate-slide-in-left inline-block">
                    {message}
                </span>
            </h6>
        </div>
    );
}
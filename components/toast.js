"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Toast({ message, show, onHide }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onHide, 2500);
    return () => clearTimeout(timer);
  }, [show, onHide]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed bottom-4 right-4 z-9999 bg-black text-white px-4 py-2 rounded-full flex items-center gap-3 transition-all duration-450 ease-fast ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <h6 className="text-white whitespace-nowrap">{message}</h6>
      <button
        onClick={onHide}
        aria-label="Close"
        className="text-white/60 hover:text-white transition-colors text-xs leading-none"
      >
        ✕
      </button>
    </div>,
    document.body
  );
}

export default Toast;

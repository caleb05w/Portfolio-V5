"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function FixedSidebar({ children, className }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={className}>
      {children}
    </div>,
    document.body
  );
}

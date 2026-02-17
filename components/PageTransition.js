"use client";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
          y: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.92,
        transition: {
          opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={{
        gridArea: "1 / 1",
        width: "100%",
        maxWidth: "100%",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}

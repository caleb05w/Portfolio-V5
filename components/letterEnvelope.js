"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function LetterEnvelope() {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setOpened(true); },
      { threshold: 0.4 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex justify-center w-full">
      <div className="relative w-[22rem] h-[14rem]" style={{ perspective: "900px" }}>

        {/* Envelope back */}
        <div className="absolute inset-0 rounded-2xl bg-[#EBE5DC]" />

        {/* Letter */}
        <motion.div
          className="absolute inset-x-5 bottom-4 bg-white rounded-xl z-10"
          style={{ height: "78%", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
          animate={{ y: opened ? "-50%" : "0%" }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.34, 1.15, 0.64, 1] }}
        >
          <div className="p-5 h-full flex flex-col justify-end gap-1">
            <p>Say Helloooo</p>
            <div className="flex flex-col gap-[0.1rem]">
              <a href="https://www.linkedin.com/in/caleb-wu-/" target="_blank">
                <p className="text-text-secondary hover:text-black transition-colors duration-300">/ Linkedin</p>
              </a>
              <a href="https://x.com/calebwu_" target="_blank">
                <p className="text-text-secondary hover:text-black transition-colors duration-300">/ Twitter</p>
              </a>
              <a href="mailto:caleb05w@gmail.com" target="_blank">
                <p className="text-text-secondary hover:text-black transition-colors duration-300">/ caleb05w@gmail.com</p>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Envelope front — X-fold */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] z-20 pointer-events-none rounded-b-2xl overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 352 154" preserveAspectRatio="none">
            <polygon points="0,0 352,0 176,77"   fill="#DDD6CC" />
            <polygon points="0,0 176,77 0,154"   fill="#E3DDD4" />
            <polygon points="352,0 352,154 176,77" fill="#E3DDD4" />
            <polygon points="0,154 352,154 176,77" fill="#E9E3DA" />
          </svg>
        </div>

        {/* Flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[45%] z-30 rounded-t-2xl bg-[#DDD6CC]"
          style={{ transformOrigin: "bottom center", backfaceVisibility: "hidden" }}
          animate={{ rotateX: opened ? -180 : 0 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg className="w-full h-full" viewBox="0 0 352 126" preserveAspectRatio="none">
            <polygon points="0,0 352,0 176,126" fill="#D4CEC5" />
          </svg>
        </motion.div>

      </div>
    </div>
  );
}

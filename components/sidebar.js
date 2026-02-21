import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Sidebar({ cards = [], isVisible = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Create intersection observer to track which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cards.findIndex(
              (card) => card.id === entry.target.id,
            );
            if (index !== -1) {
              setCurrentIndex(index);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Activate when section crosses center
        threshold: 0,
      },
    );

    // Observe all sections
    cards.forEach((card) => {
      const element = document.getElementById(card.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [cards]);

  const atStart = currentIndex === 0;

  return (
    <div className="z-[10] flex flex-col w-full gap-[6rem] items-center">
      {/* //Go back home */}
      {/* <div className="flex flex-row gap-[0.25rem] group">
                <div className='w-[0.75rem] h-fit'> <IoIosArrowBack className='w-full aspect-square text-text-secondary group-hover:text-black ease-in-out duration-300' /> </div>
                <Link href="/"> <h6 className='text-text-secondary hover:text-black ease-in-out duration-300'>Home</h6> </Link>
            </div> */}
      <div className="flex flex-col justify-center w-full h-fit gap">
        {cards.map((card, key) => {
          const isActive = currentIndex === key;
          return (
            <motion.a
              key={key}
              className="flex flex-col group py-[0.25rem] hover:cursor-pointer"
              href={`#${card.id}`}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.5, 0, 0, 1],
                delay: key * 0.06,
              }}
            >
              <div
                className={`flex flex-row gap-[0.5rem] items-center w-full h-fit`}
              >
                <h6
                  className={`transition-colors duration-200 ${isActive ? "text-black" : "text-text-secondary"} hover:text-black`}
                >
                  {card.name}
                </h6>
              </div>
              <div className="flex flex-row gap-[0.5rem] items-center"></div>
            </motion.a>
          );
        })}
      </div>

      {/* Scroll mouse indicator */}
      {/* <motion.div
        className={`flex flex-col items-center gap-[0.3rem] ${atStart ? "pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        animate={
          isVisible && atStart ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }
        }
        transition={{
          duration: 0.45,
          ease: [0.5, 0, 0, 1],
          delay: cards.length * 0.06,
        }}
      >
        <svg
          width="18"
          height="28"
          viewBox="0 0 18 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="16"
            height="26"
            rx="8"
            stroke="#737373"
            strokeWidth="1.5"
          />
          <rect
            x="8"
            y="6"
            width="2"
            height="5"
            rx="1"
            fill="#737373"
            style={{
              animation:
                "scrollWheel 1.4s cubic-bezier(0.45,0,0.55,1) infinite",
            }}
          />
        </svg>
        <style>{`
                    @keyframes scrollWheel {
                        0%   { transform: translateY(0);   opacity: 1; }
                        60%  { transform: translateY(5px); opacity: 0.3; }
                        100% { transform: translateY(0);   opacity: 1; }
                    }
                `}</style>
      </motion.div> */}
    </div>
  );
}

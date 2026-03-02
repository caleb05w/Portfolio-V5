import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Sidebar({ cards = [], isVisible = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [prevVisible, setPrevVisible] = useState(isVisible);
  useEffect(() => {
    setPrevVisible(isVisible);
  }, [isVisible]);
  const useReverseStagger = (prevVisible && !isVisible) || isExiting;

  useEffect(() => {
    const handler = () => setIsExiting(true);
    window.addEventListener("route-change", handler);
    return () => window.removeEventListener("route-change", handler);
  }, []);

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
    <div className="z-[10] flex flex-col w-full gap-[4rem] items-center">
      {/* //Go back home */}
      <div className="flex flex-col justify-center w-full h-fit gap w-full ">
        <Link
          href="/"
          scroll={false}
          className="flex flex-row gap-[0.5rem] items-center"
        >
          {" "}
          <h6 className="text-text-secondary hover:text-black ease-in-out duration-300">
            Home
          </h6>{" "}
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full h-fit">
        {cards.map((card, key) => {
          const isActive = currentIndex === key;
          return (
            <motion.a
              key={key}
              className="flex flex-col group lg:py-[0.2rem] py-[0.15rem] xl:py-[0.35rem] hover:cursor-pointer"
              href={`#${card.id}`}
              initial={{ y: 16, opacity: 0 }}
              animate={
                isVisible && !isExiting
                  ? { y: 0, opacity: 1 }
                  : { y: 16, opacity: 0 }
              }
              transition={{
                duration: useReverseStagger ? 0.25 : 0.45,
                ease: [0.5, 0, 0, 1],
                delay: useReverseStagger
                  ? (cards.length - 1 - key) * 0.04
                  : key * 0.06,
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
    </div>
  );
}

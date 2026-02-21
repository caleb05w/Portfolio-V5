"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ContainerImage from "./containerImage";

const PLACEHOLDER_ITEMS = [
  { img: "/images/RD/RDN4-searchbarb.png", alt: "Search bar concept" },
  { img: "/images/RD/RDN4-connectorsa.png", alt: "Connectors concept" },
  { img: "/images/RD/RDN4-onboardinga.png", alt: "Onboarding concept" },
  { img: "/images/RD/RDN4-sidebara.png", alt: "Sidebar concept" },
];

export default function CaseCarousel({ items = PLACEHOLDER_ITEMS, imgHeight }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const observers = [];
    const current = scrollRef.current;
    if (!current || items.length === 0) return;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { root: current, threshold: 0.5 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items.length]);

  const scrollTo = useCallback((i) => {
    itemRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  if (!items.length) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex flex-row gap-4 overflow-x-auto w-full scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className="shrink-0 w-[80%]"
            style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
          >
            {item.videoSrc ? (
              <div className={`w-full overflow-hidden bg-[#F8F8F8] ${item.imgHeight ?? imgHeight ?? "h-[40vh]"}`}>
                <video
                  className={`w-full h-full ${item.object ?? "object-cover"}`}
                  src={item.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            ) : (
              <ContainerImage
                img={item.img}
                alt={item.alt}
                imgHeight={item.imgHeight ?? imgHeight}
                object={item.object}
                lazy={false}
              />
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div className="flex flex-row gap-[0.4rem] justify-center items-center">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-[0.45rem] h-[0.45rem] rounded-full shrink-0 ${i === activeIndex ? "bg-black" : "bg-secondary"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

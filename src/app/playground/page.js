"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRive } from "@rive-app/react-canvas";
import { useCaseContext } from "../../../utils/caseContext";
import { useScrollDown } from "../../../utils/useScrollDown";

// Generate blur placeholder
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const cards = [
  {
    name: "Namecard",
    category: "Design",
    year: "2025",
    src: "/images/playground1a.png",
    alt: "Card 1",
    tools: ["Figma", "Fun"],
  },
  {
    name: "Neal, Nah I'd Win.",
    year: "2024",
    category: "Pixel Art",
    src: "/images/playground2aa.png",
    alt: "Card 2",
    tools: ["Figma", "Fun"],
  },
  {
    name: "Pixel Aquarium",
    year: "2025",
    category: "Pixel Art",
    src: "/images/playground3a.png",
    alt: "Card 3",
    tools: ["Figma", "Fun"],
  },
  {
    name: "Empire Clash",
    year: "2024",
    category: "Digital Art",
    src: "/images/playground4a.png",
    alt: "Card 4",
    tools: ["Figma", "Fun"],
  },
  {
    name: "Dojo Calendar",
    year: "2025",
    category: "Digital Art",
    src: "/images/playground5.png",
    alt: "Card 5",
    tools: ["Figma", "Fun"],
  },
  {
    name: "Slide Showcase",
    year: "2025",
    category: "Design",
    src: "/images/playground6.png",
    alt: "Card 6",
    tools: ["Figma", "Fun"],
  },
  {
    name: "Dojo Treasure Chest",
    year: "2025",
    category: "Digital Art",
    src: "/images/playground7.png",
    alt: "Card 7",
    tools: ["Figma", "Fun"],
  },
];

function Page() {
  const [selected, setSelected] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [lastSelected, setLastSelected] = useState(cards[0]);
  const { setShowTop, showTop } = useCaseContext();
  const isScrollDown = useScrollDown();
  const pageTop = useRef(null);

  // Check if current selection is a Rive file
  const currentSrc = selected?.src ?? lastSelected.src;
  const isRiveFile = currentSrc?.endsWith('.riv');

  // Rive component setup
  const { RiveComponent } = useRive(
    isRiveFile
      ? {
          src: currentSrc,
          autoplay: true,
        }
      : { autoplay: false }
  );

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setShowTop(entry.isIntersecting);
    });
    observer.observe(pageTop.current);
    return () => observer.disconnect();
  }, [setShowTop]);

  const handleClose = () => {
    if (selected) setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="">
      {/* Fixed preview modal - always rendered */}
      {isMounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <button
              className={`fixed inset-0 z-[9] bg-black/20 backdrop-blur-sm hover:cursor-pointer ease-fast duration-[400ms] transition-all ${
                selected
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={handleClose}
              aria-label="Close preview"
            />

            {/* Modal container */}
            <div
              className={`fixed inset-0 z-[10] flex flex-col items-center justify-center hover:cursor-pointer ease-fast duration-400 transition-all ${
                selected
                  ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
                  : "translate-y-[1rem] scale-95 opacity-0 pointer-events-none"
              }`}
              onClick={handleClose}
            >
              {/* Modal content */}
              <div
                className="w-[70%] h-fit xl:h-[60vh] md:h-[60vh] lg:h-[60vh] flex xl:flex-row md:flex-row lg:flex-row flex-col bg-white px-8 lg:py-16 xl:py-16 md:py-16 py-8 z-11 rounded-2xl gap-16 relative hover:cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-12 hover:cursor-pointer"
                  aria-label="Close"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Image section */}
                <div className="xl:w-[50%] md:w-[50%] lg:w-[50%] w-full h-full flex flex-col items-center justify-center">
                  {isRiveFile ? (
                    <div className="w-full h-full">
                      <RiveComponent className="w-full h-full" />
                    </div>
                  ) : (
                    <Image
                      src={selected?.src ?? lastSelected.src}
                      alt={selected?.alt ?? lastSelected.alt}
                      width={1200}
                      height={1200}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(1200, 1200),
                      )}`}
                      className="object-contain h-full w-full flex-1 ease-in-out duration-200"
                    />
                  )}
                </div>

                {/* Info section */}
                <div className="xl:w-[30%] md:w-[30%] lg:w-[30%] w-full]">
                  <div className="max-w-full h-full flex flex-col justify-center lg:gap-16 xl:gap-16 md:gap-16 gap-4">
                    <div className="flex flex-col h-fit">
                      <h6 className="text-text-secondary">{selected?.year}</h6>
                      <h3 className="text-left mb-2 md:mb-8 xl:mb-8 lg:mb-8">
                        {selected?.name}
                      </h3>
                      <h6 className="text-left text-text-secondary">
                        Here&apos;s where a little description about why I made
                        this drawing would go.
                      </h6>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h5 className="text-left">Tools Used</h5>
                      <div className="flex md:flex-col xl:flex-col lg:flex-col flex-row gap-1">
                        {selected?.tools?.map((item, key) => (
                          <h6
                            className="text-left text-text-secondary"
                            key={key}
                          >
                            {item}
                          </h6>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail gallery - separate from modal */}
              <div
                className="w-[70%] flex flex-row gap-2 mt-4 hover:cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {cards.map((item, key) => (
                  <button
                    key={key}
                    onClick={() => setSelected(item)}
                    className={`min-w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center hover:opacity-80 transition-opacity ${
                      selected?.src === item.src ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {item.src.endsWith('.riv') ? (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>,
          document.body,
        )}

      {/* Dynamic spacer */}
      <div
        className={`relative top-0 left-0 w-full pointer-events-none transition-[height] duration-300 ease-fast z-[1] ${
          isScrollDown || !showTop ? "h-0" : "h-[8rem] xl:h-[12rem]"
        }`}
      />

      {/* Main content */}
      <div
        className={`flex flex-col transition-transform duration-[700ms] ease-fast y-gutter gap-[2rem] will-change-transform ${
          selected ? "scale-95" : "scale-100"
        }`}
        style={{ transform: "translateZ(0)" }}
      >
        <div ref={pageTop} />
        <div className="top-0 max-w-screen flex flex-col gap-4 justify-center items-center case-x-gutter">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
              <div className="xl:w-[90%] md:w-[90%] lg:w-[90%] w-full h-fit flex flex-row justify-start gap-[1rem] md:gap-[0.6rem] lg:gap-[0.8rem] flex-wrap">
                {cards.map((item, key) => (
                  <div
                    key={key}
                    onClick={() => setSelected(item)}
                    className="min-w-[50vw] lg:min-w-[32%] lg:max-w-[33%] md:min-w-[45%] md:max-w-[50%] origin-center rounded-[1rem] overflow-hidden flex-1 aspect-square bg-white flex flex-col justify-center items-start relative hover:cursor-pointer"
                  >
                    <div className="w-full h-fit flex flex-row justify-between absolute bottom-0 p-[1rem] items-end">
                      <div className="flex flex-col items-start gap-[0.25rem]">
                        <h6 className="text-text-secondary">{item.category}</h6>
                        <h6>{item.name}</h6>
                      </div>
                      <h6>{item.year}</h6>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={1200}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(1200, 1200),
                      )}`}
                      priority={key < 3}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-contain w-full min-h-0 flex-1 p-[3rem] ease-in-out duration-200 py-[4rem]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

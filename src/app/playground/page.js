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

// Rive preview component for grid cards
function RivePreview({ src }) {
  const { RiveComponent, rive } = useRive({
    src: src,
    autoplay: true,
  });

  const isRestarting = useRef(false);

  // Set up looping for one-shot animations
  useEffect(() => {
    if (!rive) return;

    const handleStop = () => {
      if (isRestarting.current) return;

      isRestarting.current = true;
      setTimeout(() => {
        rive.reset();
        rive.play();
        isRestarting.current = false;
      }, 0);
    };

    rive.on("stop", handleStop);

    return () => {
      rive.off("stop", handleStop);
    };
  }, [rive]);

  return (
    <div className="w-full h-full flex items-center justify-center p-[3rem] py-[4rem]">
      <RiveComponent className="w-full h-full" />
    </div>
  );
}

const cards = [
  {
    name: "Rank Up Animation",
    category: "Animation",
    year: "2025",
    src: "/images/playground/riv/rank-emerald-diamond.riv",
    alt: "Jojo listening to music",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description:
      "A small animation to celebrate when users rank up during RevisionDojo's Question Rush.",
  },

  {
    name: "Reading books",
    category: "Animation",
    year: "2026",
    src: "/images/playground/riv/jojo-book.riv",
    alt: "Jojo reading a book, kicking his feet",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description: "Another idle animation for RevisionDojo's Mobile App",
  },
  {
    name: "Jojo Music",
    category: "Animation",
    year: "2026",
    src: "/images/playground/riv/jojo-music.riv",
    alt: "Jojo listening to music",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description: "Loading screen for the RevisionDojo app.",
  },
  {
    name: "Jojo Walk",
    category: "Animation",
    year: "2026",
    src: "/images/playground/riv/jojo-walk.riv",
    alt: "Jojo walking",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description: "Loading screen animation for RevisionDojo.",
  },
  {
    name: "3 Stars",
    category: "Animation",
    year: "2026",
    src: "/images/playground/riv/lesson-complete-3-stars.riv",
    alt: "Lesson complete 3 stars",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description: "Reward animation for users who get 3 stars after a lesson.",
  },
  {
    name: "Streak Animation",
    category: "Animation",
    year: "2026",
    src: "/images/playground/riv/fire.riv",
    alt: "Fire animation",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description: "Fire animation for our streaks.",
  },
  {
    name: "Paywall Animation",
    category: "Animation",
    year: "2026",
    src: "/images/playground/riv/rd-paywall.riv",
    alt: "Rd paywall",
    tools: ["Figma", "Rive"],
    isRiveFile: true,
    description: "Paywall animation for RevisionDojo",
  },
  {
    name: "Tank Heads",
    category: "Game Assets",
    year: "2025",
    src: "/images/playground/tank-heads.png",
    alt: "Tank heads",
    tools: ["Adobe Illustrator"],
    description:
      "Turret upgrade system for a tank game that I made back in first year.",
  },
  {
    name: "Oil Tycoon Simulator",
    category: "Game Assets",
    year: "2024",
    src: "/images/playground/265-game.png",
    alt: "265 game",
    tools: ["Figma"],
    description:
      "Game assets for a school project that I made. The game was an Oil Tycoon Simulator.",
  },
  {
    name: "Neal, Nah I'd Win.",
    year: "2024",
    category: "Pixel Art",
    src: "/images/playground/neal.png",
    alt: "Neal",
    tools: ["Adobe Illustrator"],
    description:
      "Made this for a friend a while back when Lobotomy Kaisen was trending.",
  },
  {
    name: "Empyrean Monarch & Jester",
    year: "2024",
    category: "Digital Art",
    src: "/images/playground/empire-clash.png",
    alt: "Empire clash",
    tools: ["Adobe Illustrator"],
    description:
      "Fanart for Empire Clash, a Roblox Game. Depicts the Empyrean faction Monarch and Jester",
  },
  {
    name: "Praey Assets",
    category: "Game Assets",
    year: "2023",
    src: "/images/playground/praey-assets.png",
    alt: "Praey assets",
    tools: ["Adobe Illustrator"],
    description:
      "Pixel Art that I created for my first game, Praey: It's a dungeons rougelike bullet hell. These are the villians and bosses, which are supposed to resemble demons.",
  },
  {
    name: "Holiday Heroes",
    category: "Vector Art",
    year: "2022",
    src: "/images/playground/holiday-heros.png",
    alt: "Holiday heroes",
    tools: ["Adobe Illustrator", "My Trackpad"],
    description:
      "Drawing of SEA Military's Founding team to celebrate the holidays.",
  },
  {
    name: "Sea Background",
    category: "Digital Art",
    year: "2021",
    src: "/images/playground/sea-bg.png",
    alt: "Sea background",
    tools: ["Adobe Illustrator"],
    description:
      "A banner I drew for one of Roblox Navy Simulators game covers. As you can probably tell, I was a huge fan.",
  },
  {
    name: "Sea Chan",
    category: "Digital Art",
    year: "2021",
    src: "/images/playground/sea-chan.png",
    alt: "Sea chan",
    tools: ["Adobe Illustrator"],
    description: "Uhhhh an original OC...!!  ",
  },
];

function Page() {
  const [selected, setSelected] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [lastSelected, setLastSelected] = useState(cards[0]);
  const { setShowTop, showTop } = useCaseContext();
  const isScrollDown = useScrollDown();
  const pageTop = useRef(null);
  const isRestarting = useRef(false);

  // Check if current selection is a Rive file
  const currentSrc = selected?.src ?? lastSelected.src;
  const isRiveFile = currentSrc?.endsWith(".riv");

  // Rive component setup
  const { RiveComponent, rive } = useRive(
    isRiveFile
      ? {
          src: currentSrc,
          autoplay: true,
        }
      : { autoplay: false },
  );

  // Set up looping for one-shot animations in modal
  useEffect(() => {
    if (!rive || !isRiveFile) return;

    const handleStop = () => {
      if (isRestarting.current) return;

      isRestarting.current = true;
      setTimeout(() => {
        rive.reset();
        rive.play();
        isRestarting.current = false;
      }, 0);
    };

    rive.on("stop", handleStop);

    return () => {
      rive.off("stop", handleStop);
    };
  }, [rive, isRiveFile]);

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set up intersection observer
  useEffect(() => {
    if (!pageTop.current) return;

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
              className={`fixed inset-0 z-[9] bg-black/20 backdrop-blur-sm cursor-pointer ease-fast duration-[400ms] transition-all ${
                selected
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={handleClose}
              aria-label="Close preview"
            />

            {/* Modal container */}
            <div
              className={`fixed inset-0 z-[10] flex flex-col items-center justify-center cursor-pointer ease-fast duration-[400ms] transition-all ${
                selected
                  ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
                  : "translate-y-[1rem] scale-95 opacity-0 pointer-events-none"
              }`}
              onClick={handleClose}
            >
              {/* Modal content */}
              <div
                className="w-[70%] h-fit xl:h-[60vh] md:h-[60vh] lg:h-[70vh] flex xl:flex-row md:flex-row lg:flex-row flex-col bg-white px-8 lg:py-16 xl:py-16 md:py-16 py-8 z-11 rounded-2xl gap-16 relative cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-12 cursor-pointer"
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
                <div className="xl:w-[60%] md:w-[60%] lg:w-[60%] w-full h-full flex flex-col items-center justify-center">
                  {isRiveFile ? (
                    <div key={currentSrc} className="w-full h-full">
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
                <div className="xl:w-[30%] md:w-[30%] lg:w-[30%] w-full">
                  <div className="max-w-full h-full flex flex-col justify-center lg:gap-16 xl:gap-16 md:gap-16 gap-4">
                    <div className="flex flex-col h-fit">
                      <h6 className="text-text-secondary">{selected?.year}</h6>
                      <h3 className="text-left mb-2 md:mb-8 xl:mb-8 lg:mb-8">
                        {selected?.name}
                      </h3>
                      <h6 className="text-left text-text-secondary">
                        {selected?.description ??
                          "Here's where a little description about why I made this drawing would go."}
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
                    className="min-w-[50vw] lg:min-w-[32%] lg:max-w-[33%] md:min-w-[45%] md:max-w-[50%] origin-center rounded-[1rem] overflow-hidden flex-1 aspect-square bg-white flex flex-col justify-center items-start relative cursor-pointer"
                  >
                    <div className="w-full h-fit flex flex-row justify-between absolute bottom-0 p-[1rem] items-end z-10">
                      <div className="flex flex-col items-start gap-[0.25rem]">
                        <h6 className="text-text-secondary">{item.category}</h6>
                        <h6>{item.name}</h6>
                      </div>
                      <h6>{item.year}</h6>
                    </div>
                    {item.isRiveFile ? (
                      <RivePreview key={item.src} src={item.src} />
                    ) : (
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
                    )}
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

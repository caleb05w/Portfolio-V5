"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import CaseCard from "../../components/caseCard";
import { useTooltip } from "../../utils/toolTipContext";

const cards = [
  { id: 1, type: "Intro", name: "Intro" },
  {
    id: 2,
    type: "Case",
    name: "RevisionDojo",
    link: "/RevisionDojo",
    videoSrc: "/images/RDDemo2a.mp4",
    posterSrc: "/images/RDDemo2a-poster.jpg",
    body: "Redesigning the search experience for 400,000 IBDP users.",
    year: "2025",
  },
  {
    id: 3,
    type: "Case",
    name: "Axis",
    link: "/Axis",
    videoSrc: "/images/Axis/AxisCover.mp4",
    posterSrc: "/images/Axis/AxisCover-poster.jpg",
    body: "Launching an ambitious rebrand for a consulting club.",
    year: "2024",
  },
  { id: 4, type: "End", name: "Contact" },
];

const SCROLL_RATE_LIMIT = 300;

export default function Page() {
  const [indices, setIndices] = useState({ current: 0, prev: 0 });
  const { current: currentIndex, prev: prevIndex } = indices;
  const { tooltip } = useTooltip();

  const currentCard = cards[currentIndex];

  const getVisualPosition = useCallback(
    (cardIndex) => {
      let offset = cardIndex - currentIndex;
      if (offset < 0) offset += cards.length;
      return offset;
    },
    [currentIndex],
  );

  const getPrevVisualPosition = useCallback(
    (cardIndex) => {
      let offset = cardIndex - prevIndex;
      if (offset < 0) offset += cards.length;
      return offset;
    },
    [prevIndex],
  );

  const moveUp = useCallback(() => {
    setIndices((prev) => ({
      current: (prev.current + 1) % cards.length,
      prev: prev.current,
    }));
  }, []);

  const moveDown = useCallback(() => {
    setIndices((prev) => ({
      current: (prev.current - 1 + cards.length) % cards.length,
      prev: prev.current,
    }));
  }, []);

  const lastTime = useRef(0);
  const lastVelocity = useRef(0);
  const isInMomentum = useRef(false);
  const momentumTimeout = useRef(null);
  const lastScrollTrigger = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      const now = performance.now();
      const currentDelta = Math.abs(e.deltaY);
      const timeDiff = now - lastTime.current;
      const velocity = timeDiff > 0 ? currentDelta / timeDiff : 0;

      const significantVelocityIncrease =
        lastVelocity.current > 0 &&
        velocity > lastVelocity.current * 2.0 &&
        velocity > 1.0;

      const shouldTrigger =
        now - lastScrollTrigger.current >= SCROLL_RATE_LIMIT;

      if (
        (!isInMomentum.current || significantVelocityIncrease) &&
        shouldTrigger
      ) {
        lastScrollTrigger.current = now;
        if (e.deltaY > 0) {
          moveUp();
        } else {
          moveDown();
        }
      }

      if (!isInMomentum.current) {
        isInMomentum.current = true;
      }

      lastVelocity.current = velocity;
      lastTime.current = now;

      if (momentumTimeout.current) {
        clearTimeout(momentumTimeout.current);
      }
      momentumTimeout.current = setTimeout(() => {
        isInMomentum.current = false;
        lastVelocity.current = 0;
      }, 200);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (momentumTimeout.current) {
        clearTimeout(momentumTimeout.current);
      }
    };
  }, [moveDown, moveUp]);

  // Touch/swipe support for mobile (velocity-based, Apple-style)
  const touchStartY = useRef(0);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const touchVelocity = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      const y = e.touches[0].clientY;
      touchStartY.current = y;
      lastTouchY.current = y;
      lastTouchTime.current = Date.now();
      touchVelocity.current = 0;
    };

    const handleTouchMove = (e) => {
      const y = e.touches[0].clientY;
      const now = Date.now();
      const dt = now - lastTouchTime.current;
      if (dt > 0) {
        touchVelocity.current = (lastTouchY.current - y) / dt;
      }
      lastTouchY.current = y;
      lastTouchTime.current = now;
    };

    const handleTouchEnd = () => {
      const distance = touchStartY.current - lastTouchY.current;
      const velocity = touchVelocity.current; // px/ms

      const VELOCITY_THRESHOLD = 0.3;
      const DISTANCE_THRESHOLD = 50;

      // Quick flick (high velocity) OR deliberate swipe (large distance)
      if (
        Math.abs(velocity) > VELOCITY_THRESHOLD ||
        Math.abs(distance) > DISTANCE_THRESHOLD
      ) {
        const direction =
          Math.abs(velocity) > VELOCITY_THRESHOLD ? velocity : distance;
        if (direction > 0) {
          moveUp();
        } else {
          moveDown();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [moveUp, moveDown]);

  return (
    <div className="w-screen md:px-[1rem] xl:px-[2rem] lg:px-[1rem] flex-col md:flex-row lg:flex-row h-screen fixed flex overscroll-none max-h-screen max-w-screen overflow-hidden bg-secondary will-change-transform">
      {/* left side bar */}
      <div className="clamp">
        <div className="flex flex-col w-full">
          {cards.map((card, key) => {
            const isActive = currentIndex === key;
            return (
              <div
                key={card.id}
                className="flex flex-col group py-[0.25rem] hover:cursor-pointer w-full"
                onClick={() =>
                  setIndices((prev) => ({ current: key, prev: prev.current }))
                }
              >
                <div
                  className={`flex flex-row gap-[0.5rem] items-center w-full h-fit`}
                >
                  <div className="relative w-[0.5rem] h-[0.5rem]">
                    <div
                      className={`absolute w-full h-full rounded-full bg-black transition-all duration-300 ease-out ${
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </div>
                  <h6
                    className={`transition-colors duration-200 ${isActive ? "text-black" : "text-text-secondary"} hover:text-black`}
                  >
                    {card.name}
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-[2rem] flex flex-col w-full h-full ">
        <div className="w-full h-[50rem] md:w-full md:h-full flex items-center justify-center">
          {cards.map((card, index) => {
            const offset = getVisualPosition(index);
            const isActive = offset === 0;
            const prevOffset = getPrevVisualPosition(index);

            let transformStyle = "";
            let filterStyle = "";
            let opacity = 1;
            let zIndex = 10 - offset;
            let pointerEvents = "auto";
            let opacityDelay = "0ms";

            const isMoving2to3 = prevOffset === 2 && offset === 3;
            const isMoving3to2 = prevOffset === 3 && offset === 2;
            const isInstantTransition = isMoving2to3 || isMoving3to2;

            if (offset === 0) {
              transformStyle = "translateY(0) scale(1)";
              zIndex = 10;
              opacityDelay = "0ms";
            } else if (offset === 1) {
              transformStyle = "translateY(6vh) scale(0.90)";
              filterStyle = "brightness(85%)";
              zIndex = 9;
            } else if (offset === 2) {
              transformStyle = "translateY(12vh) scale(0.80)";
              filterStyle = "brightness(70%)";
              opacityDelay = 0;
              zIndex = 8;
            } else if (offset === 3 || offset >= cards.length - 1) {
              transformStyle = "translateY(-64vh) scale(0.85) rotate(8deg)";
              zIndex = 11;
              opacity = 0;
              opacityDelay = 300;
              pointerEvents = "none";
            } else {
              transformStyle = "translateY(16vh) scale(0.9)";
              opacity = 0;
              zIndex = 100;
              pointerEvents = "none";
            }

            let videoLoadStrategy = "none";
            if (offset === 0) {
              videoLoadStrategy = "auto";
            } else if (offset === 1) {
              videoLoadStrategy = "metadata";
            }

            return (
              <div
                {...tooltip(
                  card.type === "Case" ? "Click to Open" : "Scroll Down!",
                )}
                key={card.id}
                style={{
                  zIndex,
                  opacity,
                  transform: transformStyle,
                  filter: filterStyle,
                  pointerEvents,
                  transition: isInstantTransition
                    ? "transform 0ms, filter 0ms, opacity 0ms"
                    : `transform 450ms cubic-bezier(0.62, 0.61, 0.02, 1), filter 450ms cubic-bezier(0.62, 0.61, 0.02, 1), opacity 450ms cubic-bezier(0.62, 0.61, 0.02, 1) ${opacityDelay}`,
                }}
                className={`overflow-hidden max-w-full flex flex-row absolute lg:mt-[14vh] xl:mt-[4vh] md:mt-[12vh]
            before:content-[''] before:absolute before:inset-0 before:rounded-[1rem] before:pointer-events-none before:transition-opacity before:duration-700
            ${!isActive && "brightness-100"}
          `}
              >
                <CaseCard
                  type={card.type}
                  link={card.link}
                  img={card.img}
                  position={offset}
                  name={card.name}
                  videoSrc={card.videoSrc}
                  posterSrc={card.posterSrc}
                  videoPreload={videoLoadStrategy}
                />
              </div>
            );
          })}
          <div
            style={{
              zIndex: 7,
              opacity: 0.4,
              transform: "translateY(24vh) scale(0.85)",
            }}
            className="w-fit absolute will-change-transform transition-all duration-500 ease-in-out brightness-75"
          >
            <CaseCard position={3} isEmpty={true} />
          </div>
        </div>
        {/* bottom line buffer */}
        <div className="w-full h-fit lg:h-[4rem] xl:h-[4rem] md:h-[4rem]">
          <div className="flex flex-col gap-[1rem] w-full items-center h-fit lg:h-0 xl:h-0 md:h-0 overflow-hidden">
            <div className="border-[0.75px] w-[3rem] border-secondary"></div>
            <div className="text-text-secondary max-w-[16rem] text-center flex flex-col gap-[0.5rem]">
              <h3>{currentCard.name}</h3>
              <h6>{currentCard.body}</h6>
            </div>
          </div>
        </div>
      </div>
      {/* right side clamp */}
      <div className="clamp">
        {currentCard.type === "Case" ? (
          <div className="w-full min-h-[4rem] flex flex-col gap-[1rem]">
            <h3>{currentCard.name}</h3>
            <h6>{currentCard.body}</h6>
            <h6 className="mt-[1rem]">{currentCard.year}</h6>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import CaseCard from "../../components/caseCard";
import TitleModal from "../../components/titleModal";
import { useTooltip } from "../../utils/toolTipContext";
import { useStickers } from "../../utils/useStickers";
import { FaLinkedin } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";

const cards = [
  { id: 1, type: "Intro", name: "Intro" },
  {
    id: 2,
    type: "Case",
    name: "RevisionDojo",
    link: "/RevisionDojo",
    videoSrc: "/images/RD/rd-cover-new.mp4",
    posterSrc: "/images/RDDemo2a-poster.jpg",
    body: "Redesigning the search experience for 500,000 IB students.",
    year: "2025",
    vidPad: "p-[2rem]",
    cardBg: "white",
    modalSrc: "/images/rd-modal.svg",
    logoSrc: "/images/rd-modal.svg",
  },
  {
    id: 3,
    type: "Case",
    name: "Axis Consulting",
    link: "/Axis",
    videoSrc: "/images/Axis/AxisCover.mp4",
    posterSrc: "/images/Axis/AxisCover-poster.jpg",
    body: "Launching an ambitious rebrand for a university consulting club.",
    year: "2024",
    cardBg: "black",
    modalSrc: "/images/axis-modal.png",
    logoSrc: "/images/axis-logo-nobg.svg",
  },
  { id: 4, type: "End", name: "Sticker Sheet" },
];

const SCROLL_RATE_LIMIT = 225;
// 50ms (TITLE delay) + 420ms (max POP_DELAY in titleAnimation) + 500ms (CSS transition) = 970ms
const TITLE_ANIM_DONE_MS = 970;
const CARDS_ANIM_DONE_MS = 250;

const INTRO = {
  PRE: 0,
  TITLE: 1,
  SCROLL_ON: 2,
  CARDS_ON: 3,
  COMPLETE: 4,
  NAV: 5,
};

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScramble(target, active) {
  const makeChars = (visible) =>
    target.split("").map((char) => ({ char, visible }));
  const [chars, setChars] = useState(() => makeChars(false));
  const frameRef = useRef(null);
  const scrambledRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (!active) {
      scrambledRef.current = null;
      startRef.current = null;
      frameRef.current = requestAnimationFrame(() =>
        setChars(makeChars(false)),
      );
      return;
    }
    if (!scrambledRef.current) {
      scrambledRef.current = target
        .split("")
        .map(
          () =>
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        );
    }
    // Persist start time across Strict Mode double-invoke so animation doesn't restart
    if (!startRef.current) startRef.current = performance.now();
    const scrambled = scrambledRef.current;
    const start = startRef.current;
    // Duration is derived from letter count — no fixed value
    const scrambleMs = 240; // how long each char scrambles
    const staggerMs = 35; // delay between each char starting
    const totalDuration = (target.length - 1) * staggerMs + scrambleMs;
    const tick = (now) => {
      const elapsed = now - start;
      setChars(
        target.split("").map((char, i) => {
          const startAt = i * staggerMs;
          const endAt = startAt + scrambleMs;
          if (elapsed >= endAt) return { char, visible: true };
          if (elapsed >= startAt) return { char: scrambled[i], visible: true };
          return { char, visible: false };
        }),
      );
      if (elapsed < totalDuration)
        frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, target]); // eslint-disable-line react-hooks/exhaustive-deps

  return chars;
}

export default function Page() {
  const [indices, setIndices] = useState({ current: 0, prev: 0 });
  const { current: currentIndex, prev: prevIndex } = indices;
  const [introPhase, setIntroPhase] = useState(0);
  const introPhaseRef = useRef(INTRO.PRE);
  const setIP = useCallback((phase) => {
    introPhaseRef.current = phase;
    setIntroPhase(phase);
  }, []);
  const elementsReady = introPhase >= INTRO.CARDS_ON;
  const modalReady = introPhase >= INTRO.COMPLETE;
  const endColors = [
    "#fb923c",
    "#2563eb",
    "#0d9488",
    "#1e3a5f",
    "#1c0a00",
    "#fef3c7",
  ];
  const [endColorIndex, setEndColorIndex] = useState(1);
  const introTimersRef = useRef([]);
  const cardChangesAllowedRef = useRef(false);
  const mountedAtRef = useRef(0);
  const endCardIndex = cards.findIndex((c) => c.type === "End");
  const { stickers, resetStickers } = useStickers(currentIndex, endCardIndex);

  useEffect(() => {
    mountedAtRef.current = performance.now();
    const t1 = setTimeout(() => setIP(INTRO.TITLE), 50);
    const t2 = setTimeout(() => {
      cardChangesAllowedRef.current = true;
    }, CARDS_ANIM_DONE_MS);
    const t3 = setTimeout(() => setIP(INTRO.SCROLL_ON), 500);
    const t4 = setTimeout(() => setIP(INTRO.CARDS_ON), 1050);
    const t5 = setTimeout(() => setIP(INTRO.COMPLETE), 1750);
    introTimersRef.current = [t1, t2, t3, t4, t5];
    return () => introTimersRef.current.forEach(clearTimeout);
  }, [setIP]);

  const { tooltip } = useTooltip();

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

  const skipIntro = useCallback(() => {
    if (introPhaseRef.current >= INTRO.COMPLETE) return;
    introTimersRef.current.forEach(clearTimeout);
    setIP(INTRO.COMPLETE);
    // Allow card changes only after title animation + first card load (CARDS_ANIM_DONE_MS from mount).
    const elapsed = performance.now() - mountedAtRef.current;
    const remaining = Math.max(0, CARDS_ANIM_DONE_MS - elapsed);
    const t = setTimeout(() => {
      cardChangesAllowedRef.current = true;
    }, remaining + 50);
    introTimersRef.current = [t];
  }, [setIP]);

  const moveUp = useCallback(() => {
    if (!cardChangesAllowedRef.current) return;
    if (introPhaseRef.current < INTRO.NAV) setIP(INTRO.NAV);
    setIndices((prev) => ({
      current: (prev.current + 1) % cards.length,
      prev: prev.current,
    }));
  }, [setIP]);

  const moveDown = useCallback(() => {
    if (!cardChangesAllowedRef.current) return;
    if (introPhaseRef.current < INTRO.NAV) setIP(INTRO.NAV);
    setIndices((prev) => ({
      current: (prev.current - 1 + cards.length) % cards.length,
      prev: prev.current,
    }));
  }, [setIP]);

  const goToCard = useCallback(
    (index) => {
      setIP(INTRO.NAV);
      setIndices((prev) => ({ current: index, prev: prev.current }));
    },
    [setIP],
  );

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const dashboardOpenRef = useRef(false);
  const dashboardOpenedAtRef = useRef(0);
  const setDashboard = useCallback((open) => {
    dashboardOpenRef.current = open;
    if (open) dashboardOpenedAtRef.current = performance.now();
    setDashboardOpen(open);
  }, []);

  const centerRef = useRef(null);
  const leftClampRef = useRef(null);
  const rightClampRef = useRef(null);
  const touchOnCenter = useRef(false);

  const lastTime = useRef(0);
  const lastVelocity = useRef(0);
  const isInMomentum = useRef(false);
  const momentumTimeout = useRef(null);
  const lastScrollTrigger = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      // Skip intro animation before scroll is enabled
      if (introPhaseRef.current < INTRO.SCROLL_ON) {
        skipIntro();
        return;
      }

      // Dismiss dashboard on scroll, but ignore momentum from the opening gesture
      if (dashboardOpenRef.current) {
        if (performance.now() - dashboardOpenedAtRef.current > 900) {
          setDashboard(false);
        }
        return;
      }

      const leftRect = leftClampRef.current?.getBoundingClientRect();
      const rightRect = rightClampRef.current?.getBoundingClientRect();
      const inClamp =
        (leftRect &&
          e.clientX >= leftRect.left &&
          e.clientX <= leftRect.right) ||
        (rightRect &&
          e.clientX >= rightRect.left &&
          e.clientX <= rightRect.right);
      if (inClamp) {
        if (e.deltaY > 0) setDashboard(true);
        return;
      }

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

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (momentumTimeout.current) {
        clearTimeout(momentumTimeout.current);
      }
    };
  }, [moveDown, moveUp, setDashboard, skipIntro]);

  // Touch/swipe support for mobile (velocity-based, Apple-style)
  const touchStartY = useRef(0);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const touchVelocity = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchOnCenter.current = centerRef.current?.contains(e.target) ?? false;
      if (!touchOnCenter.current) return;
      const y = e.touches[0].clientY;
      touchStartY.current = y;
      lastTouchY.current = y;
      lastTouchTime.current = Date.now();
      touchVelocity.current = 0;
    };

    const handleTouchMove = (e) => {
      if (!touchOnCenter.current) return;
      e.preventDefault();
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
      if (!touchOnCenter.current) return;
      if (introPhaseRef.current < INTRO.SCROLL_ON) {
        skipIntro();
        cardChangesAllowedRef.current = true;
        // fall through so the swipe direction also moves the card
      }
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
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [moveUp, moveDown, skipIntro]);

  const scrambledChangelog = useScramble(
    "Changelog: March 01 2026",
    dashboardOpen,
  );

  return (
    <div style={{ backgroundColor: "#F4F4F4" }}>
      <div
        className="w-screen md:px-[1rem] xl:px-[2rem] lg:px-[1rem] flex-col md:flex-row lg:flex-row h-screen fixed top-0 flex overscroll-none max-h-screen max-w-screen overflow-hidden"
        style={{ backgroundColor: "#F4F4F4" }}
      >
        {/* left side bar */}
        <div ref={leftClampRef} className="clamp">
          <div className="flex flex-col w-full"></div>
        </div>
        <div ref={centerRef} className="flex-1 flex flex-col h-full">
          <div className="h-[7.7rem] lg:h-[7.9rem] xl:h-34 shrink-0  w-full "></div>{" "}
          {/* navbar height placeholder */}
          <div
            className="flex-1 px-4 xl:px-8 md:px-8 lg:px-8 flex flex-col w-full items-center justify-center"
            style={{
              transform: dashboardOpen ? "translateY(-9vh)" : "translateY(0)",
              transition: "transform 575ms var(--ease-fast)",
            }}
          >
            <div className="flex flex-col items-center gap-[12vh] w-full">
              <div className="relative h-fit w-full flex items-center justify-center">
                {/* Invisible spacer matching CaseCard's responsive sizing — gives container natural height */}
                <div className="w-[90vw] md:w-[60vw] lg:w-[65vw] xl:w-[80vw] aspect-2/3 md:aspect-2/1 max-h-[52svh] md:max-h-none min-h-[15rem] max-w-240 xl:max-w-320 invisible pointer-events-none shrink-0" />
                {cards.map((card, index) => {
                  const offset = getVisualPosition(index);
                  const isActive = offset === 0;

                  let transformStyle = "";
                  let overlayOpacity = 0;
                  let opacity = 1;
                  let zIndex = 10 - offset;
                  let pointerEvents = "auto";
                  let opacityDelay = 0;

                  const prevOffset = getPrevVisualPosition(index);
                  const isMoving2to3 = prevOffset === 2 && offset === 3;
                  const isMoving3to2 = prevOffset === 3 && offset === 2;
                  const isInstantTransition = isMoving2to3 || isMoving3to2;

                  if (offset === 0) {
                    transformStyle =
                      introPhase >= INTRO.TITLE
                        ? "translateY(0) scale(1)"
                        : "translateY(4vh) scale(0.95)";
                    opacity = introPhase >= INTRO.TITLE ? 1 : 0;
                    zIndex = 10;
                    opacityDelay = 0;
                  } else if (offset === 1) {
                    transformStyle = "translateY(6vh) scale(0.90)";
                    overlayOpacity = 0.15;
                    zIndex = 9;
                  } else if (offset === 2) {
                    transformStyle = "translateY(12vh) scale(0.80)";
                    overlayOpacity = 0.3;
                    opacityDelay = 0;
                    zIndex = 8;
                  } else if (offset === 3 || offset >= cards.length - 1) {
                    transformStyle =
                      "translateY(-64vh) scale(0.85) rotate(8deg)";
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

                  // Hide offset cards until TitleAnimation finishes (CARDS_ON)
                  if (introPhase < INTRO.CARDS_ON && offset !== 0) {
                    opacity = 0;
                    pointerEvents = "none";
                    if (offset === 1)
                      transformStyle = "translateY(10vh) scale(0.88)";
                    if (offset === 2)
                      transformStyle = "translateY(17vh) scale(0.78)";
                  }

                  // Stagger reveal during intro sequence; once user navigates, no stagger
                  let introRevealDelay = 0;
                  if (introPhase < INTRO.NAV) {
                    if (offset === 1) introRevealDelay = 150;
                    else if (offset === 2) introRevealDelay = 300;
                  }
                  const cardDuration = 700;

                  let videoLoadStrategy = "none";
                  if (offset === 0) {
                    videoLoadStrategy = "auto";
                  } else if (offset === 1) {
                    videoLoadStrategy = "metadata";
                  }

                  return (
                    <div
                      key={card.id}
                      {...tooltip(
                        card.type === "Case"
                          ? "Click to Open"
                          : card.type === "End"
                            ? null
                            : "Scroll Down!",
                      )}
                      style={{
                        zIndex,
                        opacity,
                        transform: transformStyle,
                        pointerEvents,
                        transition: isInstantTransition
                          ? "transform 0ms, opacity 0ms"
                          : `transform ${cardDuration}ms var(--ease-fast) ${introRevealDelay}ms, opacity ${cardDuration}ms var(--ease-fast) ${Math.max(introRevealDelay, opacityDelay)}ms`,
                      }}
                      className="will-change-transform overflow-hidden min-w-0 flex-1 flex flex-row justify-center absolute"
                    >
                      <CaseCard
                        type={card.type}
                        link={card.link}
                        img={card.img}
                        position={offset}
                        name={card.name}
                        body={card.body}
                        videoSrc={card.videoSrc}
                        posterSrc={card.posterSrc}
                        videoPreload={videoLoadStrategy}
                        vidPad={card.vidPad}
                        cardBg={card.cardBg}
                        logoSrc={card.logoSrc}
                        introBgVisible={elementsReady}
                        titleAnimRevealed={introPhase >= INTRO.TITLE}
                        stickers={card.type === "End" ? stickers : undefined}
                        resetStickers={
                          card.type === "End" ? resetStickers : undefined
                        }
                        endColor={
                          card.type === "End"
                            ? endColors[endColorIndex]
                            : undefined
                        }
                      />
                      <div
                        className="absolute inset-0 bg-black pointer-events-none rounded-xl"
                        style={{
                          opacity: overlayOpacity,
                          transition: isInstantTransition
                            ? "opacity 0ms"
                            : `opacity ${cardDuration}ms var(--ease-fast) ${introRevealDelay}ms`,
                        }}
                      />
                    </div>
                  );
                })}
                <div
                  style={{
                    zIndex: 7,
                    opacity: elementsReady ? 0.4 : 0,
                    transform: "translateY(10vh) scale(0.85)",
                    transition:
                      "opacity 600ms cubic-bezier(0.62, 0.61, 0.02, 1)",
                  }}
                  className="w-fit absolute will-change-transform brightness-75"
                >
                  <CaseCard position={3} isEmpty={true} />
                </div>
              </div>
              <div
                className={`transition-opacity duration-700 ${elementsReady ? "opacity-100" : "opacity-0"} ${!modalReady ? "pointer-events-none" : ""}`}
              >
                <TitleModal
                  currentIndex={currentIndex}
                  cards={cards}
                  goToCard={goToCard}
                  endColors={endColors}
                  endColorIndex={endColorIndex}
                  setEndColorIndex={setEndColorIndex}
                />
              </div>
            </div>
          </div>
        </div>

        {/* right side clamp */}
        <div ref={rightClampRef} className="clamp"></div>
      </div>

      {/* Social buttons — bottom right corner */}
      <div className="hidden fixed lg:flex xl:flex md:flex bottom-4 right-4 z-20 flex-col gap-2">
        <a
          href="https://www.linkedin.com/in/caleb-wu-/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black/60 hover:bg-black/10 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-450 ease-fast"
        >
          <FaLinkedin className="text-black text-[12px]" />
        </a>
        <a
          href="https://x.com/calebwu_"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-black/60 hover:bg-black/10 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-450 ease-fast"
        >
          <CiTwitter className="text-black text-[12px]" />
        </a>
        <a
          href="mailto:caleb05w@gmail.com"
          className="border border-black/60 hover:bg-black/10 rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-450 ease-fast"
        >
          <AiOutlineMail className="text-black text-[12px]" />
        </a>
      </div>

      {/* Overlay — purely visual backdrop, never captures events */}
      <div
        className="fixed inset-0 z-9 pointer-events-none"
        style={{
          transform: dashboardOpen ? "scale(1)" : "scale(0)",
          transition: "transform 500ms var(--ease-fast)",
          transformOrigin: "bottom",
        }}
      />

      {/* Dashboard — fixed bottom sheet, opened by deliberate clamp scroll */}
      <div
        className="fixed bottom-0 z-20 w-screen h-[10vh] flex flex-col items-center justify-center gap-2"
        style={{
          backgroundColor: "#252628",
          transform: dashboardOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 500ms var(--ease-fast)",
        }}
      >
        <div className="flex flex-col w-full px-[2rem] py-[1rem] gap-[0.75rem]">
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-col gap-[0.25rem]">
              <h6 className="text-white/70 !font-jb">
                Woah! You found my super secret footer.
              </h6>
              <h6 className="text-text-secondary !font-jb">
                {scrambledChangelog.map((item, i) => (
                  <span key={i} style={{ opacity: item.visible ? 1 : 0 }}>
                    {item.char}
                  </span>
                ))}
              </h6>
            </div>
            <button
              onClick={resetStickers}
              className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer !font-jb text-left"
            >
              reset sticker progress
            </button>
            <div className="flex flex-col gap-[0.25rem] items-end">
              <h6 className="text-white/70 !font-jb">
                Built with NextJS, Claude, Figma.
              </h6>
              <h6 className="text-text-secondary !font-jb">
                And a lot of love.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

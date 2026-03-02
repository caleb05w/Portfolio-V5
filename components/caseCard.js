import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TitleAnimation from "./titleAnimation";
import Link from "next/link";
import StickerGrid from "./StickerGrid";
import { motion } from "framer-motion";

function CaseCard({
  name,
  img,
  link,
  header,
  body, //unused, but this was used back when I had card information
  year,
  type, //the type of card
  videoSrc, //link
  posterSrc, //snapshot
  videoPreload = "none", //controls video preload
  position = 0, //position which determines preload state
  isEmpty,
  vidPad,
  cardBg = "black",
  logoSrc,
  introBgVisible = false,
  titleAnimRevealed = false,
  stickers = [],
  endColor = "#2563eb",
  resetStickers,
  className = "",
}) {
  const videoRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [endAnimKey, setEndAnimKey] = useState(0);

  useEffect(() => {
    if (position !== 0 || type !== "End") return;
    const id = requestAnimationFrame(() => setEndAnimKey((k) => k + 1));
    return () => cancelAnimationFrame(id);
  }, [position, type]);

  const handleReset = () => {
    setIsResetting(true);
    // wait for last sticker's animation to finish: 5 * 60ms stagger + 350ms duration
    setTimeout(() => {
      resetStickers?.();
      setIsResetting(false);
    }, 750);
  };

  // Play/pause video when position changes
  useEffect(() => {
    if (videoRef.current) {
      if (position === 0) {
        videoRef.current.play().catch((err) => {
          console.log("Video play prevented:", err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [position]);

  return (
    <div
      className={`
            transition-all duration-700
            flex flex-row items-center justify-center
            rounded-2xl md:rounded-xl
            overflow-hidden
            ${className || "w-[90vw] md:w-[60vw] lg:w-[65vw] xl:w-[80vw] aspect-2/3 md:aspect-2/1 max-w-240 xl:max-w-320"}
           `}
    >
      {type === "Intro" && (
        <section className="w-full h-full flex-col items-center flex p-[1rem] md:p-[5%] justify-between relative">
          {introBgVisible && (
            <div className="absolute inset-0 bg-white animate-pop-in pointer-events-none" />
          )}
          <h6
            className="relative text-text-secondary w-full text-center"
            style={{
              opacity: introBgVisible ? 1 : 0,
              transform: introBgVisible ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 450ms var(--ease-fast), transform 450ms var(--ease-fast)",
            }}
          >
            Caleb Wu
          </h6>
          <div className="relative w-full">
            <TitleAnimation revealed={titleAnimRevealed} />
          </div>
          <div
            className="relative flex flex-col w-full items-center"
            style={{
              opacity: introBgVisible ? 1 : 0,
              transform: introBgVisible ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 450ms var(--ease-fast), transform 450ms var(--ease-fast)",
            }}
          >
            <div className="flex flex-col gap-[0.5rem] md:gap-[1rem] h-full items-center w-full">
              <div className="flex flex-col gap-[0.5rem] md:gap-[1rem] w-full items-center">
                <div className="border-[0.75px] w-[3rem] border-black/10"></div>
                <div className="flex flex-col gap-[0.25rem] md:gap-[0.5rem]">
                  <h6 className="text-text-secondary text-center">
                    Currently Product @
                    <a
                      target="_blank"
                      href="https://www.revisiondojo.com/"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors duration-300"
                    >
                      RevisionDojo(YCF24)
                    </a>
                  </h6>
                  <h6 className="text-text-secondary text-center">
                    Previously Product @
                    <a
                      target="_blank"
                      href="https://metalab.com"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors duration-300"
                    >
                      Metalab
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {type === "Case" && (
        <section className="w-full h-full hover:cursor-pointer">
          <Link
            href={link ?? "/"}
            onClick={() => {
              // Reset scroll immediately before navigation
              window.scrollTo(0, 0);
            }}
          >
            <div className="flex overflow-hidden w-full h-full relative isolate">
              {img && (
                <Image
                  src={img ?? "/images/testfram1.png"}
                  width={1600}
                  height={1200}
                  alt="epic placeholder"
                  className="w-full h-full object-cover"
                />
              )}
              {videoSrc && (
                <div
                  className={`bg-white w-full flex flex-row justify-center ${vidPad ?? ""}`}
                >
                  <video
                    ref={videoRef}
                    className="h-full w-full"
                    src={videoSrc}
                    preload={videoPreload}
                    poster={posterSrc}
                    muted
                    loop
                    playsInline
                    style={{
                      objectFit: vidPad ? "contain" : "cover",
                    }}
                  />
                </div>
              )}

              {/* Gradient blur — stacked solid layers, compounds toward bottom */}
              <div
                className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none"
                style={{
                  backdropFilter: "blur(1px)",
                  WebkitBackdropFilter: "blur(1px)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none"
                style={{
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-[25%] pointer-events-none"
                style={{
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(3px)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-[12%] pointer-events-none"
                style={{
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              />

              {/* Gradient overlay */}
              <div
                className={`absolute bottom-0 left-0 w-full h-[60%] bg-linear-to-t pointer-events-none ${cardBg === "white" ? "from-white/80" : "from-black/75"} to-transparent`}
              />

              {/* Text + logo */}
              <div className="absolute bottom-0 left-0 w-full p-[5%] flex flex-col gap-3 ">
                <div className="flex flex-row gap-4 items-center">
                  {/* Logo */}
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      width={32}
                      height={32}
                      className="shrink-0 object-contain border  w-[1.6rem] aspect-square"
                      alt=""
                    />
                  ) : (
                    <div className="w-8 h-8 shrink-0 bg-white " />
                  )}
                  <h2
                    className={`${cardBg === "white" ? "text-black" : "text-white"}`}
                  >
                    {name}
                  </h2>
                </div>
                {body && (
                  <div className=" max-w-[24rem]">
                    <p
                      className={
                        cardBg === "white" ? "text-black/70" : "text-white/70"
                      }
                    >
                      {body}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {type === "End" && (
        <section
          className="w-full h-full flex-col flex justify-between p-[2rem] lg:p-[3rem] transition-colors duration-500"
          style={{ backgroundColor: endColor }}
        >
          {(() => {
            const allCollected = stickers.filter(Boolean).length >= 6;
            const ease = [0.22, 1, 0.36, 1];
            const textDelay = allCollected ? 1.5 : 0.5;
            const footerDelay = allCollected ? 1.65 : 0.65;
            return (
              <>
                <div className="flex flex-col gap-[0.5rem] w-full justify-center items-center">
                  <motion.h1
                    key={`title-${endAnimKey}`}
                    className="text-white"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                  >
                    Thanks for stopping by :)
                  </motion.h1>
                  <motion.h4
                    key={`subtitle-${endAnimKey}-${allCollected}`}
                    className="text-white/60"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: textDelay, ease }}
                  >
                    {allCollected
                      ? "Your a superstar, you collected them all!"
                      : "Here's a sticker!"}
                  </motion.h4>
                </div>

                {/* Sticker collection */}
                <div className="flex flex-col gap-3 items-center">
                  <StickerGrid
                    stickers={stickers}
                    position={position}
                    isResetting={isResetting}
                  />
                </div>

                <motion.div
                  key={`footer-${endAnimKey}-${allCollected}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: footerDelay, ease }}
                >
                  {allCollected ? (
                    <button
                      onClick={handleReset}
                      className="text-white/70 hover:text-white transition-colors duration-200 w-full text-center cursor-pointer"
                    >
                      <h3>Reset your stickers!</h3>
                    </button>
                  ) : (
                    <h3 className="text-white/70 w-full text-center">
                      Come back again for another one.
                    </h3>
                  )}
                </motion.div>
              </>
            );
          })()}
        </section>
      )}
    </div>
  );
}

export default CaseCard;

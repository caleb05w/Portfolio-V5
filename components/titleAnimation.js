"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const FLOAT_PHASES =     ["0ms",  "150ms", "300ms", "75ms",  "225ms", "375ms", "110ms"];
const POP_DELAYS =       [0,      70,      140,     210,     280,     350,     420];
// Unique resting Y offset — pop-in lands here, float starts here (no jump)
const BASE_OFFSETS =     [3,      -7,      5,       -1,      -4,      7,       -3];
const FLOAT_DURATIONS =  ["2.8s", "3.5s",  "2.6s",  "3.2s",  "3.0s",  "2.9s",  "3.7s"];
const FLOAT_AMPLITUDES = ["8px",  "10px",  "7px",   "9px",   "10px",  "8px",   "9px"];
const FLOAT_DIPS =       ["5px",  "3px",   "7px",   "4px",   "6px",   "5px",   "4px"];
const FLOAT_ROTATIONS =  ["3deg", "-4deg", "5deg",  "-2deg", "4deg",  "-5deg", "3deg"];
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const IMG_SIZE = 65;

const ROWS = [
  [{ img: 0 }, { text: "sweating" }, { img: 1 }, { text: "the" }, { img: 2 }],
  [{ img: 3 }, { img: 4 }, { text: "visual details." }, { img: 5 }, { img: 6 }],
];

function TitleImg({ index, floatReady, revealed }) {
  const baseY = BASE_OFFSETS[index];

  const wrapperStyle = floatReady
    ? { width: IMG_SIZE, flexShrink: 0 }
    : {
        width: revealed ? IMG_SIZE : 0,
        flexShrink: 0,
        overflow: "hidden",
        transition: revealed ? `width 500ms ${SPRING} ${POP_DELAYS[index]}ms` : "none",
      };

  const imgStyle = floatReady
    ? {
        animationDelay: FLOAT_PHASES[index],
        "--float-base": `${baseY}px`,
        "--float-dur": FLOAT_DURATIONS[index],
        "--float-amp": FLOAT_AMPLITUDES[index],
        "--float-dip": FLOAT_DIPS[index],
        "--float-rot": FLOAT_ROTATIONS[index],
      }
    : {
        transform: revealed ? `translateY(${baseY}px) scale(1)` : "scale(0)",
        transition: revealed ? `transform 500ms ${SPRING} ${POP_DELAYS[index]}ms` : "none",
      };

  return (
    <div style={wrapperStyle}>
      <Image
        src={`/images/name/${index + 1}.png`}
        width={IMG_SIZE}
        height={IMG_SIZE}
        alt=""
        className={`cursor-pointer${floatReady ? " animate-float" : ""}`}
        style={imgStyle}
      />
    </div>
  );
}

export default function TitleAnimation({ revealed = false, scale: scaleProp = 1 }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  const [computedScale, setComputedScale] = useState(1);
  const [floatReady, setFloatReady] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const update = () => {
      const available = wrapper.clientWidth;
      const natural = inner.scrollWidth;
      if (natural > 0) setComputedScale(Math.min(1, available / natural));
    };

    const ro = new ResizeObserver(update);
    ro.observe(wrapper);
    update();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setFloatReady(revealed), revealed ? 950 : 0);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden flex justify-center items-center relative"
    >
      <div
        ref={innerRef}
        className="flex flex-col items-center w-max py-6 md:py-[5vh]"
        style={{
          transform: `scale(${computedScale * scaleProp})`,
          transformOrigin: "center center",
          transition: "transform 450ms var(--ease-fast)",
          opacity: revealed ? 1 : 0,
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        {ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex flex-row items-center gap-[0.5vw]${rowIdx > 0 ? " -mt-2" : ""}`}
          >
            {row.map((item, itemIdx) =>
              item.img !== undefined ? (
                <TitleImg key={itemIdx} index={item.img} floatReady={floatReady} revealed={revealed} />
              ) : (
                <h1 key={itemIdx} className="text-[3rem]! leading-none whitespace-nowrap">
                  {item.text}
                </h1>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

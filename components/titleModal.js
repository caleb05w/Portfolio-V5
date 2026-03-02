"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiSmile } from "react-icons/fi";
import { PiSticker } from "react-icons/pi";

function TitleModal({
  currentIndex,
  cards,
  goToCard,
  endColors = [],
  endColorIndex = 0,
}) {
  const displayNum = currentIndex + 1;
  const total = cards.length;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="group relative z-100 flex items-center backdrop-blur-md rounded-full border border-[#D7CFCF] pr-3 pl-2"
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Counter */}
      <div className="px-4 py-2.5">
        <h6 className="text-text-secondary whitespace-nowrap">
          {displayNum} of {total}
        </h6>
      </div>

      {/* Card thumbnails */}
      <div
        className={`flex pr-2.5 py-2 transition-[padding] duration-450 ease-fast ${expanded ? "pl-8" : "pl-1 group-hover:pl-8"}`}
      >
        {cards.map((card, i) => {
          return (
            <div
              key={card.id}
              style={{ zIndex: cards.length - i }}
              onClick={(e) => {
                e.stopPropagation();
                goToCard(i);
              }}
              className={`group/thumb relative w-8 aspect-square h-auto transition-[margin] duration-450 ease-fast cursor-pointer
                ${i !== 0 ? (expanded ? "ml-1.5" : "-ml-3 group-hover:ml-1.5") : ""}
              `}
            >
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-white text-xs bg-black/80 px-2 py-1 rounded-sm">
                {card.name}
              </span>
              {/* Image clipping wrapper */}
              <div
                className={`w-full h-full overflow-hidden transition-[border-radius] duration-450 ease-fast  ${expanded ? "rounded-lg border-2" : "rounded-4xl border-2 group-hover:rounded-lg group-hover:border-2"}`}
                style={{ borderColor: "#F4F4F4" }}
              >
                {card.modalSrc ? (
                  <Image
                    src={card.modalSrc}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : card.posterSrc ? (
                  <Image
                    src={card.posterSrc}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center ${card.type !== "End" ? "bg-primary" : ""}`}
                    style={{
                      backgroundColor:
                        card.type === "End"
                          ? endColors[endColorIndex]
                          : undefined,
                    }}
                  >
                    {card.type === "End" ? (
                      <PiSticker className="text-white size-[1.05rem]" />
                    ) : card.type === "Intro" ? (
                      <FiSmile className="text-white" />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TitleModal;

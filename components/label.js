"use client";
import React, { useRef } from "react";
import { useRive } from "@rive-app/react-canvas";
import { useTooltip } from "../utils/toolTipContext";

function Label({ text, subtext }) {
  const { RiveComponent } = useRive({
    src: "/../images/labelNewa.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  const { setMessage } = useTooltip();
  const copiedRef = useRef(false);
  const resetRef = useRef(null);

  const copyEmail = () => {
    navigator.clipboard
      .writeText("caleb05w@gmail.com")
      .then(() => {
        copiedRef.current = true;
        setMessage("Email copied!");
        if (resetRef.current) clearTimeout(resetRef.current);
        resetRef.current = setTimeout(() => {
          copiedRef.current = false;
          setMessage("Copy Email");
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy email:", err));
  };

  return (
    <button
      className="flex flex-col gap-[1rem] w-full case-x-gutter hover:cursor-pointer"
      onClick={copyEmail}
      onMouseEnter={() =>
        setMessage(copiedRef.current ? "Email copied!" : "Copy Email")
      }
      onMouseLeave={() => {
        setMessage("");
        if (resetRef.current) clearTimeout(resetRef.current);
        copiedRef.current = false;
      }}
    >
      <div className="min-w-full flex flex-col md:flex-row gap-[3rem] lg:gap-[1rem] xl:flex-row lg:flex-row-reverse bg-[#F8F8F8] hover:bg-secondary/60 border border-secondary p-[1.5rem] h-fit transition-colors duration-200">
        <div className="h-[3.5rem] w-[5rem] xl:h-[5rem] lg:w-[10%] flex-shrink-0">
          <RiveComponent />
        </div>
        <div className="w-full flex flex-col gap-[0.5rem] items-start h-fit">
          <p className="text-left">{text}</p>
          {subtext ? (
            <p className="text-left text-text-secondary">{subtext}</p>
          ) : (
            <p className="flex flex-row flex-wrap gap-[0.25rem]">
              <span>Reach out to</span>
              <a
                href="mailto:caleb05w@gmail.com"
                className="hover:underline font-[600]"
              >
                caleb05w@gmail.com
              </a>
              <span className="whitespace-nowrap">for the full story!</span>
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default Label;

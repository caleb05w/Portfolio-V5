"use client";
import React, { useState } from "react";
import ContainerText from "./containerText";
import ContainerImagesShowcase from "./containerImagesShowcase";

function ContainerIntro({
  Teammates,
  Name,
  Year,
  body,
  videoSrc,
  image2,
  image3,
  ideatedWith,
}) {
  const [ideatedOpen, setIdeatedOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[5.125rem] case-x-gutter">
      <div className="flex flex-col lg:gap-[2rem] md:gap-[2rem] gap-[2rem] md:flex-row xl:flex-row lg:flex-row justify-between">
        <div className="flex flex-col gap-[1.5rem] md:max-w-[60%] xl:max-w-[60%] lg:max-w-[60%]">
          <h2>{Name}</h2>

          {body.map((item, key) => (
            <p key={key}> {item}</p>
          ))}
        </div>
        <div className="flex flex-col justify-between lg:gap-[0rem] md:gap-[0rem] gap-[1rem] md:w-[30%] lg:w-[30%] xl:w-[30%]">
          <div className="flex flex-col gap-[1rem]">
            <h2>Team</h2>
            <div className="flex flex-col gap-[0]">
              {Teammates.map((item, key) => (
                <p key={key}>{item}</p>
              ))}
              {ideatedWith && (
                <button
                  onClick={() => setIdeatedOpen((o) => !o)}
                  className="text-text-teritary hover:text-text-secondary transition-colors duration-200 cursor-pointer w-fit mt-[0.25rem]"
                >
                  <p>{ideatedWith.length} Ideated with</p>
                </button>
              )}
            </div>
            {ideatedWith && (
              <div
                style={{
                  maxHeight: ideatedOpen ? "6rem" : "0",
                  opacity: ideatedOpen ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-height 450ms var(--ease-fast), opacity 450ms var(--ease-fast)",
                }}
              >
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-1">
                  {ideatedWith.map((name, key) => (
                    <p key={key} className="text-text-teritary">{name}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="mt-[2rem]">{Year}</p>
        </div>
      </div>
      <ContainerImagesShowcase
        videoSrc={videoSrc}
        image2={image2}
        image3={image3}
      />
    </div>
  );
}

export default ContainerIntro;

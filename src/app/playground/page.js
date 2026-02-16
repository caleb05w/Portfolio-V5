"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useCaseContext } from "../../../utils/caseContext";
import { useScrollDown } from "../../../utils/useScrollDown";

function Page() {
  const [selected, setSelected] = useState(null);
  const { setShowTop, showTop } = useCaseContext();
  const isScrollDown = useScrollDown();
  const pageTop = useRef(null);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setShowTop(entry.isIntersecting);
    });
    observer.observe(pageTop.current);
    return () => observer.disconnect();
  }, []); // Empty array - run once on moun

  const cards = [
    {
      name: "Namecard",
      category: "Design",
      year: "2025",
      src: "/images/playground1a.png",
      alt: "Card 1",
    },
    {
      name: "Neal, Nah I'd Win.",
      year: "2024",
      category: "Pixel Art",
      src: "/images/playground2aa.png",
      alt: "Card 2",
    },
    {
      name: "Pixel Aquarium",
      year: "2025",
      category: "Pixel Art",
      src: "/images/playground3a.png",
      alt: "Card 3",
    },
    {
      name: "Empire Clash",
      year: "2024",
      category: "Digital Art",
      src: "/images/playground4a.png",
      alt: "Card 4",
    },
    {
      name: "Dojo Calendar",
      year: "2025",
      category: "Digital Art",
      src: "/images/playground5.png",
      alt: "Card 4",
    },
    {
      name: "Slide Showcase",
      year: "2025",
      category: "Design",
      src: "/images/playground6.png",
      alt: "Card 4",
    },
    {
      name: "Dojo Treasure Chest",
      year: "2025",
      category: "Digital Art",
      src: "/images/playground7.png",
      alt: "Card 4",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Fixed preview - only show if selected */}
      {selected && (
        <div className="w-screen h-screen fixed z-10 flex flex-row justify-center items-center p-[8rem]">
          <div className="fixed w-screen h-screen z-[5] backdrop-blur-sm"></div>

          <button
            onClick={() => {
              setSelected(null);
            }}
            className={`w-full h-full origin-centeroverflow-hidden justify-center items-center flex flex-row bg-white p-[2rem] z-[7] rounded-[1rem] border-2 border-black`}
          >
            <div className=" h-full flex flex-col max-w-[15rem] justify-start items-start gap-[1rem] ">
              <p className="text-left">{selected.name}</p>
              <h6 className="text-left">This is a cool thing I made.</h6>
            </div>
            <Image
              src={selected.src}
              alt={selected.alt}
              width={1200}
              height={1200}
              className="object-contain h-full w-auto flex-1 ease-in-out duration-200"
            />
            {/* <div className="w-full h-fit flex flex-row justify-between absolute bottom-[0] p-[1rem] items-end border-2 border-black">
                            <div className="flex flex-col items-start gap-[0.25rem]">
                                <h6 className='text-text-secondary'>{selected.category ?? "none"}</h6>
                                <h6>{selected.name ?? "none"}</h6>
                            </div>
                            <h6>{selected.year ?? "2025"}</h6>
                        </div> */}
          </button>
        </div>
      )}

      {/* Dynamic spacer */}
      <div
        className={`relative top-0 left-0 w-full pointer-events-none transition-all duration-300 ease-fast z-[1]
                ${isScrollDown === true ? "h-[0rem]" : showTop === false ? "h-[0rem]" : "h-[8rem] xl:h-[12rem]"}`}
      />

      {/* Main content */}
      <div className="flex flex-col transition-all duration-300 ease-fast y-gutter gap-[2rem] ">
        <div ref={pageTop} className=""></div>
        <div className="top-0 max-w-screen flex flex-col gap-4 justify-center items-center  case-x-gutter">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex justify-center ">
              <div className="xl:w-[80%] md:w-[80%] lg:w-[80%] w-full h-fit flex flex-row justify-start gap-[1rem] md:gap-[0.6rem] lg:gap-[0.4rem] flex-wrap">
                {cards.map((item, key) => (
                  <div
                    key={key}
                    // onClick={() => setSelected(item)}
                    className={`ease-in-out duration-700 transition-all min-w-[50vw] lg:min-w-[32%] lg:max-w-[33%] md:min-w-[45%] md:max-w-[50%] origin-center rounded-[1rem] overflow-hidden flex-1 aspect-square bg-white flex flex-col justify-center items-start relative`}
                  >
                    <div className="w-full h-fit flex flex-row justify-between absolute bottom-[0] p-[1rem] items-end">
                      <div className="flex flex-col items-start gap-[0.25rem]">
                        <h6 className="text-text-secondary">{item.category}</h6>
                        <h6>{item.name}</h6>
                      </div>
                      <h6>{item.year ?? "2025"}</h6>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={1200}
                      height={1200}
                      className="object-contain w-full min-h-0 flex-1 p-[3rem] ease-in-out duration-200 py-[4rem]"
                    />
                    <div className="h-[2rem] w-screen"></div>
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

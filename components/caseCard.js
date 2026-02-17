import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const TitleAnimation = dynamic(() => import("./titleAnimation"), {
  ssr: false,
});

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
}) {
  const videoRef = useRef(null);

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
            w-[80vw]
            md:w-[60vw]
            lg:w-[65vw]
            xl:w-[80vw]
            aspect-[1/1]
            lg:aspect-[5.5/3]
            xl:aspect-[5.5/3]
            md:aspect-[5.5/3]
            max-w-[60rem]
            xl:max-w-[80rem]
            transition-all duration-700
            flex flex-row items-center justify-center
            rounded-[1.4rem]
            overflow-hidden
           `}
    >
      {type === "Intro" && (
        <section className="w-full h-full flex-col items-center flex p-[5%] bg-white justify-between">
          <h6 className="text-text-secondary w-full text-center">Caleb Wu</h6>
          <div className="lg:w-[70%] w-[80%] aspect-[3/1]">
            <TitleAnimation />
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col gap-[1rem] h-full items-center w-full">
              <div className="flex flex-col gap-[1rem] w-full items-center">
                <div className="border-[0.75px] w-[3rem] border-secondary"></div>
                <div className="flex flex-col gap-[0.5rem">
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
          <Link href={link ?? "/"}>
            <div className="flex overflow-hidden w-full h-full relative">
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
                <div className="bg-[#F7F7F7] w-full flex flex-row justify-center">
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
                      backgroundColor: "#F8F8F8",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
          </Link>
        </section>
      )}

      {type === "End" && (
        <section className="w-full h-full flex-col flex justify-between bg-primary p-[2rem] lg:p-[3rem]">
          <div className="flex flex-row w-full h-full justify-between items-start">
            <h1>Thanks for stopping by.</h1>
          </div>
          <div className="max-w-[45%] h-fit flex flex-col">
            <div className="flex flex-col gap-[2rem]">
              <h2> Say Helloooo </h2>
              <div className="flex flex-row gap-[0.25rem]">
                <a
                  href="https://www.linkedin.com/in/caleb-wu-/"
                  target="_blank"
                >
                  <p className="hover:text-underline text-black hover:text-black hover:cursor-pointer">
                    / Linkedin
                  </p>
                </a>
                <a href="https://x.com/calebwu_" target="_blank">
                  <p className="hover:text-underline text-black hover:text-black hover:cursor-pointer">
                    / Twitter
                  </p>
                </a>
                <a href="mailto:caleb05w@gmail.com" target="_blank">
                  <p className=" text-black hover:text-underlinehover:cursor-pointer">
                    / caleb05w@gmail.com
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default CaseCard;

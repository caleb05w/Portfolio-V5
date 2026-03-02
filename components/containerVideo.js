import React, { useRef, useEffect, useState } from "react";
import ContainerText from "../components/containerText";
import { useRive } from "@rive-app/react-canvas";
import { IoPlay } from "react-icons/io5";
import { AiOutlinePause } from "react-icons/ai";

function ContainerVideo({
  title,
  body,
  videoSrc,
  hint,
  subheader,
  gutter,
  vidPad,
  rivSrc,
  rivStateMachine,
  videoPreload,
  posterSrc,
  reactionSrc,
  caption,
}) {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const reactionRef = useRef(null);
  const userPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      userPausedRef.current = false;
      setIsPaused(false);
    } else {
      video.pause();
      userPausedRef.current = true;
      setIsPaused(true);
    }
  };

  //animation component
  const { RiveComponent } = useRive(
    rivSrc
      ? {
          src: rivSrc,
          stateMachines: { rivStateMachine },
          autoplay: true,
        }
      : { autoplay: false },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) {
            videoRef.current
              ?.play()
              .catch((err) => console.log("Video play failed:", err));
            reactionRef.current?.play().catch(() => {});
          }
        } else {
          videoRef.current?.pause();
          reactionRef.current?.pause();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      },
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`flex flex-col min-h-full justify-between flex-1 min-w-0 ${gutter}`}
    >
      <ContainerText title={title} body={body} subheader={subheader} />

      {(videoSrc || rivSrc) && (
        <div className="w-full mt-8 relative" ref={videoContainerRef}>
          <div className="relative w-full bg-[#F8F8F8] overflow-hidden">
            {videoSrc && (
              <button
                onClick={togglePlay}
                aria-label={isPaused ? "Play" : "Pause"}
                className="absolute top-3 right-3 z-10 border border-black/60 hover:bg-black/10 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-450 ease-fast hover:cursor-pointer"
              >
                {isPaused ? (
                  <IoPlay className="text-black text-[12px]" />
                ) : (
                  <AiOutlinePause className="text-black text-[12px]" />
                )}
              </button>
            )}
            {videoSrc && (
              <video
                ref={videoRef}
                className={`w-full block ${vidPad ?? ""}`}
                src={videoSrc}
                muted
                loop
                playsInline
                preload={videoPreload ?? "none"}
                poster={posterSrc}
                style={{ backgroundColor: "#F8F8F8" }}
              />
            )}
            {rivSrc && (
              <div className={`w-full h-full ${vidPad ?? "p-0"}`}>
                <RiveComponent className="border border-transparent h-full w-full" />
              </div>
            )}
            {reactionSrc && (
              <div className="absolute group z-10 bottom-4 right-4">
                <video
                  ref={reactionRef}
                  className="xl:w-[18rem] w-32 aspect-square xl:rounded-2xl rounded-[0.5rem] object-cover"
                  src={reactionSrc}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
                <div className="absolute bottom-full right-0 mb-2 w-56 bg-black/80 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  The reaction of the founding team and engineers after seeing
                  the final product.
                </div>
              </div>
            )}
          </div>
          {caption && (
            <h6 className="text-center pt-4 text-text-secondary">{caption}</h6>
          )}
        </div>
      )}
      {hint && <ContainerText title={null} body={hint} />}
    </div>
  );
}

export default ContainerVideo;

"use client";

import React, {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
  useId,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

function ContainerImage({
  img,
  alt,
  width,
  height,
  className,
  gutter,
  imgHeight,
  object,
  lazy,
  caption,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const uid = useId();
  const layoutId = `img-${uid}`;

  const anchorRef = useRef(null);
  const src = img || "/images/test.svg";
  const w = width || 1920;
  const h = height || 1080;

  useLayoutEffect(() => {
    if (!isOpen) return;

    // Wait a frame so the new classes/layout apply first
    requestAnimationFrame(() => {
      anchorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [isOpen]);

  //lock down scrolling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Prevent layout shift when scrollbar disappears
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  return (
    <div className={`w-full relative ${imgHeight === "h-full" ? "h-full" : ""}`} ref={anchorRef}>
      <div
        className={`relative w-full overflow-hidden bg-[#F8F8F8] ${imgHeight ?? "h-[40vh]"}`}
        id="image"
      >
        {object ? (
          <Image
            src={src}
            alt={alt || "no alt text"}
            fill
            className={object}
            loading={lazy ? "lazy" : "eager"}
          />
        ) : (
          <div className="w-full items-center flex flex-col h-full">
            <Image
              src={src}
              width={1200}
              height={1200}
              alt={alt || "no alt text"}
              className="object-contain w-fit h-full"
              loading={lazy ? "lazy" : "eager"}
            />
          </div>
        )}
      </div>
      {caption && (
        <h6 className="text-center pt-4 text-text-secondary">{caption}</h6>
      )}
    </div>
  );
}

export default ContainerImage;

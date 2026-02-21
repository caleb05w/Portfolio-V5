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
    <>
      <div
        className={`relative w-full overflow-hidden bg-[#F8F8F8] ${imgHeight ?? "h-[40vh]"}`}
        id="image"
        ref={anchorRef}
      >
        <div className="w-full items-center flex flex-col h-full">
          <Image
            src={src}
            width={1200}
            height={1200}
            alt={alt || "no alt text"}
            className={`${object ?? "object-contain w-fit"} h-full`}
            loading={lazy ? "lazy" : "eager"}
          />
        </div>
      </div>

      {/* <button
                className={`fixed inset-0 z-[5]
            transition-all duration-200 ease-in-out origin-center hover:cursor-pointer
            ${isOpen
                        ? "opacity-100 scale-100 backdrop-blur-sm"
                        : "opacity-0 scale-0 backdrop-blur-0"
                    }`}
                onClick={() => { setIsOpen(!isOpen) }}
            /> */}
    </>
  );
}

export default ContainerImage;

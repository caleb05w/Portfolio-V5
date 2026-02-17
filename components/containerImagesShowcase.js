import React from "react";
import Image from "next/image";

function ContainerImagesShowcase({ videoSrc, image2, image3 }) {
  const secondImage = image2;
  const thirdImage = image3;

  return (
    <div className="flex flex-col gap-2 w-full overflow-hidden">
      {videoSrc && (
        <div className="w-full bg-[#F8F8F8] flex items-center justify-center p-8 overflow-hidden">
          <video
            className="w-full max-w-[25rem] aspect-square"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              backgroundColor: "#F8F8F8",
              objectFit: "contain",
            }}
          />
        </div>
      )}
      {(secondImage || thirdImage) && (
        <div className="flex flex-row gap-2 w-full overflow-hidden">
          {secondImage && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <Image
                src={secondImage.src}
                width={secondImage.width}
                height={secondImage.height}
                alt={secondImage.alt || ""}
                className={
                  secondImage.className || "object-cover w-full h-full"
                }
                loading="lazy"
              />
            </div>
          )}
          {thirdImage && (
            <div
              className={`min-w-0 overflow-hidden ${
                secondImage ? "flex-[2]" : "w-full"
              }`}
            >
              <Image
                src={thirdImage.src}
                width={thirdImage.width}
                height={thirdImage.height}
                alt={thirdImage.alt || ""}
                className={thirdImage.className || "object-cover w-full h-auto"}
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContainerImagesShowcase;

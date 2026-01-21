import React from 'react'
import Image from "next/image"

function containerImagesShowcase({ videoSrc, image2, image3 }) {
    // Use image2 for image1 if image1 is not provided (first can use same as second)
    const secondImage = image2;
    const thirdImage = image3;

    return (
        <div className="flex flex-col gap-[0.5rem] w-full">
            {videoSrc &&
                <div className='w-full h-full bg-[#F8F8F8] items-center justify-center flex flex-row p-[2rem]'>
                    <video
                        className="top-0 left-0 md:max-w-[25rem] xl:max-w-[25rem] lg:max-w-[25rem] aspect-square"
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            backgroundColor: "#F8F8F8",
                            objectFit: "contain",
                        }}
                    />
                </div>
            }
            {(secondImage || thirdImage) && (
                <div className="flex flex-row gap-[0.5rem] w-full">
                    {secondImage && (
                        <div className="w-[30%] h-auto">
                            <Image
                                src={secondImage.src}
                                width={secondImage.width}
                                height={secondImage.height}
                                alt={secondImage.alt || ''}
                                className={secondImage.className || 'object-cover w-full h-full'}
                            />
                        </div>
                    )}
                    {thirdImage && (
                        <div className={secondImage ? "w-[70%] h-auto" : "w-full h-auto"}>
                            <Image
                                src={thirdImage.src}
                                width={thirdImage.width}
                                height={thirdImage.height}
                                alt={thirdImage.alt || ''}
                                className={thirdImage.className || 'object-cover w-full h-auto'}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default containerImagesShowcase
import React from 'react'
import ContainerText from './containerText'
import ContainerImagesShowcase from './containerImagesShowcase'

function ContainerIntro({ Teammates, Name, Year, body, videoSrc, image2, image3 }) {
    return (
        <div className="flex flex-col gap-[5.125rem] case-x-gutter">
            <div className="flex flex-col lg:gap-[2rem] md:gap-[2rem] gap-[2rem] md:flex-row xl:flex-row lg:flex-row justify-between w-full">
                <div className="flex flex-col gap-[1.5rem] md:max-w-[60%] xl:max-w-[60%] lg:max-w-[60%] w-full">
                    <h2>{Name}</h2>

                    {body.map((item, key) => (
                        <p key={key}> {item}</p>
                    ))}
                </div>
                <div className='flex flex-col justify-between lg:gap-[0rem] md:gap-[0rem] gap-[1rem] w-[30%] md:w-[30%] lg:w-[30%]'>
                    <div className="flex flex-col gap-[1rem]">
                        <h2> Team </h2>
                        <div className="flex flex-col gap-[0]">
                            {Teammates.map((item, key) => (
                                <p key={key}>{item}</p>
                            ))}
                        </div>
                    </div>
                    <p>{Year}</p>
                </div>
            </div>
            <ContainerImagesShowcase
                videoSrc={videoSrc}
                image2={image2}
                image3={image3}
            />
        </div>
    )
}

export default ContainerIntro
"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image"
import { useCaseContext } from "../../../utils/caseContext"
import { useScrollDown } from "../../../utils/useScrollDown"
import ContainerImage from '../../../components/containerImage'


function Page() {
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
    }, [showTop, setShowTop]);


    const cards = [
        { link: "/images/playground2aa.png", alt: "Something awesome" },
        { link: "/images/playground2aa.png", alt: "Something awesome" },
        { link: "/images/playground2aa.png", alt: "Something awesome" },
    ]


    return (
        <div className='flex flex-col items-center y-gutter w-screen'>
            {/* Dynamic spacer */}
            <div
                className={`relative top-0 left-0 w-full pointer-events-none transition-all duration-300 ease-fast z-[1] 
                ${isScrollDown === true ? 'h-[0rem]' : showTop === false ? 'h-[0rem]' : 'h-[8rem]'}`}
            />
            <div ref={pageTop}></div>
            {/* Main content */}
            <div className='case-mt w-full flex flex-col transition-all duration-300 ease-fast gap-[3rem] x-gutter max-w-[60vw] bg-white y-gutter lg:pt-[12vh] pt-[8.5vh]'>

                {/* //content block */}
                <div className="flex flex-col h-fit gap-[2rem] w-full">
                    {/* <div className='w-[10rem] h-[10rem]'>
                        <ContainerImage
                            img="/images/about/caleb.png"
                            alt="me and crew"
                            imgHeight="h-full"
                            imgWidth="w-full"
                            object="object-cover"
                        />
                    </div> */}

                    <div className="div flex flex-col gap-[0.5rem]">
                        <h3>Hi, I&apos;m Caleb.</h3>
                        <h6 className='text-text-secondary'> Product | Design | Dev | Seeking Summer 2026 </h6>
                    </div>
                    {/* <p className='text-text-teritary' key={key}>{item}</p> */}
                    <div className="flex flex-col gap-[2rem]">
                        <p>I love to dream big. Relentlessly curious, I&apos;m positioned in the intersection between design, development, and business.  </p>
                        <p> Outside of design, you can find me collecting Lego Cars, Competing in Yugioh Tournaments, or watching Anime Power Scaling.  </p>
                    </div>
                </div>


                {/* //expeirences and stuff */}
                <div className="flex flex-col gap-[1rem]">
                    <p>Experiences</p>
                    <div className="flex flex-col gap-[0.25rem]">
                        <div className='flex flex-row w-full justify-between'><div className="flex flex-row gap-[0.25rem]"> <p>- </p><div className='flex flex-row gap-[0.5rem]'><p>RevisionDojo (YCF24)</p><p className='text-text-secondary'> Product Design Intern</p> </div></div><p>2025</p></div>
                        <div className='flex flex-row w-full justify-between'><div className="flex flex-row gap-[0.25rem]"> <p>- </p><div className='flex flex-row gap-[0.5rem]'><p>Metalab</p><p className='text-text-secondary'> Product Design Intern</p> </div></div><p>2025</p></div>
                    </div>
                </div>

                {/* //education */}
                <div className="flex flex-col gap-[1rem]">
                    <p>Education</p>
                    <div className="flex flex-col gap-[0.25rem]">
                        <div className='flex flex-row w-full justify-between'><div className="flex flex-row gap-[0.25rem]"> <p>- </p><div className='flex flex-row gap-[0.5rem]'><p>Simon Fraser University</p><p className='text-text-secondary'> B.A. Design</p> </div></div><p>2022 - 2027</p></div>

                    </div>
                </div>

                {/* //Contact */}
                <div className="flex flex-col gap-[1rem] mt-[2rem]">
                    <p> Say Helloooo </p>
                    <div className='flex flex-row gap-[0.25rem]'>
                        <a href="" target="_blank"><p className='text-underline text-text-secondary hover:text-black hover:cursor-pointer'>/ Linkedin</p></a>
                        <a href="" target="_blank"><p className='text-underline text-text-secondary hover:text-black hover:cursor-pointer'>/ Twitter</p></a>
                        <a href="" target="_blank"><p className='text-underline text-text-secondary hover:text-black hover:cursor-pointer'>/ caleb05w@gmail.com</p></a>
                    </div>
                </div>



                <div className='flex flex-col gap-[1rem]'>

                    <div className='flex flex-row gap-[1rem] w-full min-h-fit'>
                        <div className='flex-1 h-full'>
                            <ContainerImage
                                img="/images/about/about1.png"
                                alt="me and crew"
                                imgHeight="h-[25rem]"
                                imgWidth="flex-1"
                                object="object-cover"
                            />
                        </div>
                        <div className='flex-1 h-full'>
                            <ContainerImage
                                img="/images/about/caleb.png"
                                alt="me and crew"
                                imgHeight="h-[25rem]"
                                imgWidth="flex-1"
                                object="object-cover"
                            />
                        </div>
                    </div>
                    <h6 className='text-text-secondary'> Photos from RevisionDojo&apos;s Offsite</h6>
                </div>
            </div>
            {/* <div className="flex flex-row gap-[0.5rem] mt-[2rem]">
                {cards.map((item, key) => (
                    <div key={key} className="max-w-[30rem] w-full h-[20rem] overflow-hidden">
                        <Image
                            src={item.link}
                            alt={item.alt}
                            width={1200}
                            height={1200}
                            className='w-full h-full object-cover object-center'
                        />
                    </div>
                ))}
            </div> */}
        </div >
    )
}

export default Page
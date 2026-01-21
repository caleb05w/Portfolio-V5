"use client"
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image"
import { useCaseContext } from "../../../utils/caseContext"
import { useScrollDown } from "../../../utils/useScrollDown"
import ContainerReflection from '../../../components/containerReflection'


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
            <div className='w-full flex flex-col transition-all duration-300 ease-fast gap-[3rem] x-gutter max-w-[60vw] '>

                {/* //content block */}
                <div className="flex flex-col h-fit gap-[2rem] w-full">
                    <h3>Hi, I'm Caleb.</h3>
                    <div className="flex flex-col gap-[2rem]">
                        <p>I'm a product designer who designs delicately, codes to implementation, but above all, sweats the visual details.</p>
                        <p> My experiences in Agency helped push my visual craft across branding, UX/UI, and motion. My work in startup taught me to move through dev cycles fast, ship to implementation, and put weight behind my visual choices.</p>
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
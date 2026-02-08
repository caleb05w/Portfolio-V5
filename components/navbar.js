"use client";
import React, { useEffect, useState, useRef } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useCaseContext } from '../utils/caseContext';
import { useScrollDown } from "../utils/useScrollDown"
import { IoIosArrowForward } from "react-icons/io";

function Navbar({ active }) {
    const pathname = usePathname();
    const { setShowTop, showTop } = useCaseContext();
    const isScrollDown = useScrollDown();
    const [stage, setStage] = useState(true);
    const [combinedArray, setCombinedArray] = useState([]);
    const [enableTransitions, setEnableTransitions] = useState(true);
    const [itemWidths, setItemWidths] = useState([]);

    const prevPages = useRef(null);
    const prevPathname = useRef(pathname);
    const measureRefs = useRef([]);

    const pages =
        pathname === "/RevisionDojo"
            ? [
                { name: "Caleb Wu", other: "none", cta: "/", visibility: true, isLogo: true },
                { name: "RevisionDojo", other: "none", cta: "/RevisionDojo", visibility: true },
            ]
            : pathname === "/Axis"
                ? [
                    { name: "Caleb Wu", other: "none", cta: "/", visibility: true, isLogo: true },
                    { name: "Axis", other: "none", cta: "/Axis", visibility: true },
                ]
                : pathname === "/playground"
                    ? [
                        { name: "Caleb Wu", other: "none", cta: "/", visibility: true, isLogo: true },
                        { name: "Playground", other: "none", cta: "/playground", visibility: true },
                    ]
                    : pathname === "/about"
                        ? [
                            { name: "Caleb Wu", other: "none", cta: "/", visibility: true, isLogo: true },
                            { name: "About", other: "none", cta: "/about", visibility: true },
                        ]
                        : [
                            { name: "About", other: "none", cta: "/about", visibility: true },
                            { name: "Playground", other: "none", cta: "/playground", visibility: true },
                            { name: "Resume", other: "none", cta: "/Caleb-Wu-Resume.pdf", visibility: true, target: "_blank" },
                        ];

    // Build combined array function
    const buildCombinedArray = () => {
        if (!prevPages.current) {
            return pages.map(page => ({
                old: page,
                new: page
            }));
        }

        const maxLength = Math.max(prevPages.current.length, pages.length);
        const combined = [];
        const blankItem = { name: "", other: "none", cta: "#", visibility: true };

        for (let i = 0; i < maxLength; i++) {
            combined.push({
                old: prevPages.current[i] || blankItem,
                new: pages[i] || blankItem
            });
        }

        return combined;
    };

    // Measure widths after combined array updates - OPTIMIZED
    useEffect(() => {
        if (combinedArray.length > 0) {
            // Batch all reads together to minimize reflows
            requestAnimationFrame(() => {
                const widths = combinedArray.map((item, index) => {
                    const oldRef = measureRefs.current[index * 2];
                    const newRef = measureRefs.current[index * 2 + 1];
                    return {
                        old: oldRef?.scrollWidth || 0,
                        new: newRef?.scrollWidth || 0
                    };
                });
                setItemWidths(widths);
            });
        }
    }, [combinedArray]);

    // COMBINED EFFECT: Detect pathname change and animate - OPTIMIZED
    useEffect(() => {
        if (prevPathname.current !== pathname) {
            console.log('PATH CHANGED - Starting animation');

            // Disable transitions for instant swap
            setEnableTransitions(false);

            // Build array with old items visible
            const newArray = buildCombinedArray();
            setCombinedArray(newArray);
            setStage(false); // Show OLD items

            // Animate in steps using RAF for better performance
            requestAnimationFrame(() => {
                // Re-enable transitions
                setTimeout(() => {
                    setEnableTransitions(true);
                }, 50);

                // Start animation to NEW
                setTimeout(() => {
                    setStage(true);

                    // Update prevPages after animation completes
                    setTimeout(() => {
                        prevPages.current = pages;
                        console.log('Animation complete');
                    }, 700);
                }, 100);
            });

            prevPathname.current = pathname;
        } else if (!prevPages.current) {
            // Initial load
            const initialArray = pages.map(page => ({
                old: page,
                new: page
            }));
            setCombinedArray(initialArray);
            prevPages.current = pages;
            setStage(true);
        }
    }, [pathname]);

    return (
        <div className=''>
            {/* special background */}
            <div className='fixed top-0 w-screen h-[15vh] nav-bg pointer-events-none z-[10]'></div>

            {/* navbar items */}
            <div className='w-screen flex flex-row justify-center '>
                <div className={`top-0 w-fit h-fit p-[2rem] flex flex-col items-center justify-center fixed z-[50] transition-all duration-300 ease-fast
                ${pathname === "/" ? "pt-[4.5rem]" :
                        isScrollDown ? "pt-[1rem]" :
                            showTop ? "pt-[4.5rem]" : "pt-[1rem]"}`}>

                    <div className={`flex flex-row transition-all duration-300 ease-fast
                    ${pathname === "/" ? "gap-[1rem]" :
                            isScrollDown ? "gap-[1rem]" :
                                showTop ? "gap-[2rem]" : "gap-[1rem]"}`}>

                        {combinedArray.map((item, index) => {
                            const staggerDelay = index * 100;

                            const oldIsBlank = !item.old.name || item.old.name === "";
                            const newIsBlank = !item.new.name || item.new.name === "";

                            const widths = itemWidths[index] || { old: 0, new: 0 };

                            let targetWidth = 0;
                            if (oldIsBlank && newIsBlank) {
                                targetWidth = 0;
                            } else if (oldIsBlank && !newIsBlank) {
                                targetWidth = stage ? widths.new : 0;
                            } else if (!oldIsBlank && newIsBlank) {
                                targetWidth = stage ? 0 : widths.old;
                            } else {
                                targetWidth = stage ? widths.new : widths.old;
                            }

                            return (
                                <div
                                    key={index}
                                    className={`relative lg:h-[1.8rem] h-[1.2rem] overflow-hidden ${enableTransitions ? 'transition-all duration-700 ease-fast' : ''}`}
                                    style={{
                                        width: `${targetWidth}px`,
                                        transitionDelay: enableTransitions ? `${staggerDelay + 100}ms` : '0ms'
                                    }}
                                >
                                    {/* Old item - hidden for measurement */}
                                    <div
                                        ref={el => measureRefs.current[index * 2] = el}
                                        className="absolute top-0 left-0 invisible whitespace-nowrap"
                                    >
                                        {item.old.isLogo ? (
                                            <div className='flex flex-row gap-[0.6rem] items-center'>
                                                <div className='h-[0.8rem] w-[0.8rem] rounded-full bg-primary'></div>
                                                <h6 className='text-text-secondary'>{item.old.name || ''}</h6>
                                                {pathname !== "/" && <IoIosArrowForward className="text-text-secondary ml-[0.4rem]" size={16} />}
                                            </div>
                                        ) : (
                                            <h6 className='text-text-secondary'>{item.old.name || ''}</h6>
                                        )}
                                    </div>

                                    {/* New item - hidden for measurement */}
                                    <div
                                        ref={el => measureRefs.current[index * 2 + 1] = el}
                                        className="absolute top-0 left-0 invisible whitespace-nowrap"
                                    >
                                        {item.new.isLogo ? (
                                            <div className='flex flex-row gap-[0.6rem] items-center'>
                                                <div className='h-[0.8rem] w-[0.8rem] rounded-full bg-primary'></div>
                                                <h6>{item.new.name || ''}</h6>
                                                {pathname !== "/" && <IoIosArrowForward className="ml-[0.4rem]" size={16} />}
                                            </div>
                                        ) : (
                                            <h6>{item.new.name || ''}</h6>
                                        )}
                                    </div>

                                    {/* Old item - visible */}
                                    <div
                                        className={`absolute top-0 left-0 w-full ${enableTransitions ? 'duration-700 transition-transform ease-fast will-change-transform' : ''}`}
                                        style={{
                                            transitionDelay: enableTransitions ? `${staggerDelay}ms` : '0ms',
                                            transform: stage ? 'translateY(-100%)' : 'translateY(0%)'
                                        }}
                                    >
                                        {item.old.isLogo ? (
                                            <div className='flex flex-row gap-[0.6rem] items-center whitespace-nowrap'>
                                                <div className='h-[0.8rem] w-[0.8rem] rounded-full bg-primary'></div>
                                                <h6>{item.old.name || ''}</h6>
                                                {pathname !== "/" && <IoIosArrowForward className="text-black ml-[0.4rem]" size={16} />}
                                            </div>
                                        ) : (
                                            <h6 className='whitespace-nowrap'>{item.old.name || ''}</h6>
                                        )}
                                    </div>

                                    {/* New item - visible */}
                                    <div
                                        className={`absolute top-0 left-0 w-full ${enableTransitions ? 'duration-700 transition-transform ease-fast will-change-transform hover:cursor-pointer' : ''}`}
                                        style={{
                                            transitionDelay: enableTransitions ? `${staggerDelay}ms` : '0ms',
                                            transform: stage ? 'translateY(0%)' : 'translateY(100%)'
                                        }}
                                    >
                                        <Link href={item.new.cta ?? "/"} target={item.new.target ?? ""}>
                                            {item.new.isLogo ? (
                                                <div className='flex flex-row gap-[0.6rem] items-center justify-center hover:cursor-pointer whitespace-nowrap'>
                                                    <div className='h-[0.7rem] w-[0.7rem] rounded-full bg-primary'></div>
                                                    <h6 className='text-text-secondary hover:text-black transition-colors duration-300 hover:cursor-pointer'>{item.new.name || ''}</h6>
                                                    {pathname !== "/" && <IoIosArrowForward className=" h-[0.6rem] text-text-secondary hover:text-black transition-colors duration-300" size={16} />}
                                                </div>
                                            ) : (
                                                <h6 className={`hover:cursor-pointer transition-colors duration-300 whitespace-nowrap ${pathname === "/" ? "text-text-secondary" : "text-black"} ease-fast duration-[450ms]`}>{item.new.name || ''}</h6>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar
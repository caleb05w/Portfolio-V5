import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io";



export default function Sidebar({ cards = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Create intersection observer to track which section is in view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cards.findIndex(card => card.id === entry.target.id);
                        if (index !== -1) {
                            setCurrentIndex(index);
                        }
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px', // Activate when section crosses center
                threshold: 0
            }
        );

        // Observe all sections
        cards.forEach(card => {
            const element = document.getElementById(card.id);
            if (element) {
                observer.observe(element);
            }
        });

        // Cleanup
        return () => {
            observer.disconnect();
        };
    }, [cards]);

    return (
        <div className='z-[10] flex flex-col w-full gap-[6rem]'>

            {/* //Go back home */}
            {/* <div className="flex flex-row gap-[0.25rem] group">
                <div className='w-[0.75rem] h-fit'> <IoIosArrowBack className='w-full aspect-square text-text-secondary group-hover:text-black ease-in-out duration-300' /> </div>
                <Link href="/"> <h6 className='text-text-secondary hover:text-black ease-in-out duration-300'>Home</h6> </Link>
            </div> */}
            <div className='flex flex-col justify-center w-full h-fit'>

                {cards.map((card, key) => {
                    const isActive = currentIndex === key;
                    return (
                        <a
                            key={key}
                            className='flex flex-col group py-[0.25rem] hover:cursor-pointer'
                            href={`#${card.id}`
                            }
                        >
                            <div className={`flex flex-row gap-[0.5rem] items-center w-full h-fit`}>
                                <div className='relative w-[0.5rem] h-[0.5rem]'>
                                    <div
                                        className={`absolute w-full h-full rounded-full bg-black transition-all duration-300 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                            }`}
                                    />
                                </div>
                                <h6 className={`transition-colors duration-200 ${isActive ? "text-black" : "text-text-secondary"} hover:text-black`}>
                                    {card.name}
                                </h6>
                            </div>
                            <div className="flex flex-row gap-[0.5rem] items-center"></div>
                        </a>
                    );
                })}
            </div >
        </div >
    );
}
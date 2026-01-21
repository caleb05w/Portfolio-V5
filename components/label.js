"use client"
import React from 'react'
import Image from "next/image"
import { useRive } from '@rive-app/react-canvas'
import { useTooltip } from '../utils/toolTipContext'

function Label({ text }) {

    //animation
    const { RiveComponent } = useRive({
        src: "/../images/labelNewa.riv",
        stateMachines: "State Machine 1",
        autoplay: true
    })

    const { tooltip, message } = useTooltip();

    const copyEmail = () => {
        navigator.clipboard.writeText('caleb05w@gmail.com')
            .then(() => {
                console.log('Email copied to clipboard!');
                // You could trigger a toast notification here if you have one
            })
            .catch(err => {
                console.error('Failed to copy email:', err);
            });
    };

    return (
        <button
            className='flex flex-col gap-[1rem] w-full case-x-gutter'
            onClick={copyEmail}
            {...tooltip("Copy Email")}
        >
            <div className="flex flex-col md:flex-row gap-[3rem] lg:gap-[1rem] xl:flex-row lg:flex-row-reverse bg-secondary p-[1.5rem] h-fit">
                <div className='h-[3.5rem] w-[5rem] lg:w-[10%] flex-shrink-0'>
                    <RiveComponent />
                </div>
                <div className='w-full flex flex-col gap-[0.5rem] items-start h-fit'>
                    <p className='text-left'> {text} </p>
                    <div className="flex flex-row flex-wrap gap-[0.25rem]">
                        <p> Reach out to</p>
                        <a href="mailto:caleb05w@gmail.com" className=' hover:underline'>
                            <p className='!font-[600]'>caleb05w@gmail.com</p>
                        </a>
                        <p className='text-nowrap'> for the full story!</p>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default Label
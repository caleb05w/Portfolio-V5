import React from 'react'
import Image from "next/image"
import Link from "next/link"
import TitleAnimation from './titleAnimation'

//one time fonts for entry card.
import { Merriweather, Crimson_Text, Rasa } from 'next/font/google'



const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
})

const crimsonText = Crimson_Text({
    subsets: ['latin'],
    style: ['italic'],
    weight: ['400'],
    display: 'swap',
})

const rasa = Rasa({
    subsets: ['latin'],
    style: ['italic'],
    weight: ['400', '600'],
    display: 'swap',
})


function caseCard({ name, img, link, header, body, year, active, type, videoSrc }) {



    return (
        <div className={`
            w-[80vw]
            md:w-[60vw]
            lg:w-[60vw]
            xl:w-[60vw]
            aspect-[5/3]
            lg:aspect-[5.5/3]
            xl:aspect-[5.5/3]
            md:aspect-[5.5/3]
            max-w-[60rem]
            transition-all duration-700 
            flex flex-row items-center justify-center 
            rounded-[1rem] 
            overflow-hidden
           `}>
            {/* //about card */}
            {type === "Intro" &&
                <section className="w-full h-full flex-col items-center flex p-[5%] bg-white justify-between">
                    <h6 className='text-text-secondary w-full text-center'>Caleb Wu</h6>
                    <div className="lg:w-[70%] w-[80%] aspect-[3/1]">
                        <TitleAnimation />
                    </div>
                    <div className="flex flex-col w-full items-center">
                        <div className="flex flex-col gap-[1rem] h-full items-center w-full">
                            <div className='flex flex-col gap-[1rem] w-full items-center'>

                                <div className='border-[0.75px] w-[3rem] border-secondary'></div>
                                <h6 className='text-text-secondary max-w-[16rem] text-center'>
                                    Currently Product @
                                    <a target="_blank" href="https://www.revisiondojo.com/" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">
                                        RevisionDojo(YCF24)
                                    </a>
                                    , Previously Product @
                                    <a target="_blank" href="https://metalab.com" rel="noopener noreferrer" className="hover:text-black transition-colors duration-300">
                                        Metalab
                                    </a>
                                </h6>
                            </div>
                        </div>
                    </div>
                </section>}

            {/* //case card */}
            {

                type === "Case" &&
                <section className="w-full h-full hover:cursor-pointer">
                    <Link href={link ?? "/"}>
                        <div className="flex overflow-hidden w-full h-full relative">
                            {/* <div className="flex flex-row justify-center items-end absolute inset-0 w-full p-[2rem]">
                                <div className="flex h-fit w-fit rounded-full bg-white backdrop-blur-sm">
                                    <div className="flex flex-row w-full gap-[1rem] h-fit justify-center items-center p-[1.4rem]">
                                        <h6 className='w-fit h-fit '>{name}</h6>
                                        <h6> | </h6>
                                        <h6 className='w-fit h-fit '>Shipping Search to 400,000 Users</h6>
                                    </div>
                                </div>
                            </div> */}
                            {img &&
                                <Image
                                    src={img ?? "/images/testfram1.png"}
                                    width={1600}
                                    height={1200}
                                    alt="epic placeholder"
                                    className="w-full h-full object-cover"
                                />
                            }
                            {
                                videoSrc &&
                                <div className='bg-[#F7F7F7] w-full flex flex-row justify-center'>
                                    <video
                                        className="h-full w-full"
                                        src={videoSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{
                                            backgroundColor: "#F8F8F8",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            }
                        </div>
                    </Link>
                </section>
            }

            {type === "End" &&
                <section className="w-full h-full flex-col flex justify-between bg-primary p-[2rem] lg:p-[3rem]">
                    <div className="flex flex-row w-full h-full justify-between items-start">
                        <h1>Thanks for stopping by.</h1>
                    </div>
                    <div className="max-w-[45%] h-fit flex flex-col">
                        <div className="flex flex-col gap-[2rem]">
                            <h2> Say Helloooo </h2>
                            <div className='flex flex-row gap-[0.25rem]'>
                                <a href="" target="_blank"><p className='text-underline text-black hover:text-black hover:cursor-pointer'>/ Linkedin</p></a>
                                <a href="" target="_blank"><p className='text-underline text-black hover:text-black hover:cursor-pointer'>/ Twitter</p></a>
                                <a href="" target="_blank"><p className='text-underline text-black hover:text-black hover:cursor-pointer'>/ caleb05w@gmail.com</p></a>
                            </div>
                        </div>
                    </div>

                </section>}
        </div >

    )
}

export default caseCard

// <section className={`w-[60vw] h-[70vh] flex flex-col snap-start shrink-0 gap-[2rem] `}>
//     <a href={link} className="block w-full flex-1 min-h-0">
//         <Image
//             width={1200}
//             height={1200}
//             src={img ?? "/images/showcase3.png"}
//             alt="no name"
//             className="w-full h-full object-cover"
//         />
//     </a>

//     <div className="w-full shrink-0">
//         <div className="flex flex-row justify-between w-full gap-[8rem]">
//             <div className="flex flex-col">
//                 <p>{header}</p>
//                 <p>{year}</p>
//             </div>
//             <p className="max-w-[30rem]">{body}</p>
//         </div>
//     </div>
// </section >
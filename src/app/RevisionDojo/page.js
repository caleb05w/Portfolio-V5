"use client"

import React, { useRef, useEffect } from 'react'
import ContainerLine from '../../../components/containerLine'
import ContainerIntro from '../../../components/ContainerIntro'
import ContainerReflection from '../../../components/containerReflection'
import ContainerVideo from "../../../components/containerVideo"
import { useCaseContext } from "../../../utils/caseContext";
import Label from "../../../components/label"
import Sidebar from "../../../components/sidebar"


function Page() {
    const team = ["1 Designer (Me)", "2 Developers"]
    const { setShowTop, showTop } = useCaseContext();
    const pageTop = useRef(null)

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setShowTop(entry.isIntersecting)
        })
        observer.observe(pageTop.current)
        return () => observer.disconnect();
    }, [setShowTop])

    return (
        <div className='flex flex-col'>
            {/* Fixed spacer */}
            <div className={`relative top-0 left-0 w-full pointer-events-none transition-all duration-300 ease-fast z-[1]  lg:bg-transparent ${showTop ? 'h-[8rem]' : 'h-[0rem]'}`} />

            <div className='flex flex-row h-screen w-full'>
                {/* Sidebar */}
                <div className={` h-full ${showTop ? "md:w-[4rem] lg:w-[4rem] xl:w-[4rem]" : "md:w-[8rem] lg:w-[8rem] xl:w-[8rem]"} ease-fast duration-[400ms]`}>
                    <div className={`fixed h-full w-[0] xl:w-[8rem] md:w-[8rem] lg:w-[8rem] flex flex-col overflow-hidden top-[6rem] justify-start  h-full ease-fast duration-[450ms] pl-[1rem]
                    ${showTop ? "opacity-[0%]" : "opacity-[100%]"}
                    `}>
                        <Sidebar
                            cards={[
                                { id: 'about', name: 'Intro' },
                                { id: 'mission', name: 'Mission' },
                                { id: 'solution', name: 'Solution' },
                                { id: 'decisions', name: 'Decisions' },
                                { id: 'reflection', name: 'Reflection' },
                            ]}
                            onCardSelect={scrollToSection}
                        />
                    </div>
                </div>

                {/* Main content */}
                <div className='flex flex-col flex-1 min-w-0 h-fit transition-all duration-[450ms] ease-out'>
                    <div ref={pageTop} />

                    <div className='w-full flex flex-col pb-[4-rem] bg-secondary items-center'>
                        <div className={`flex flex-col bg-white w-full justify-center y-gutter ease-in-out duration-[450ms] px-[0] md:px-[2rem] lg:px-[2rem] xl:px-[2rem]
                            ${showTop ? " rounded-[1rem]" : " rounded-[0rem]"}
                            `}>

                            {/* About Section */}
                            <div id="about" className='flex flex-col case-gap case-mt'>
                                <ContainerIntro
                                    Name="RevisionDojo"
                                    Year="2025"
                                    body={[
                                        "RevisionDojo is the fastest growing edtech startup, providing digital IB study tools to 400,000+ users.",
                                        "My team developed a scalable navigation system to anchor the products rapid growth."
                                    ]}
                                    Teammates={team}
                                    videoSrc="/images/RDCoverNew.mp4"
                                    image2={{
                                        src: "/images/showcase2.svg",
                                        width: 1920,
                                        height: 1080,
                                        alt: "RevisionDojo second image",
                                        className: "object-cover w-full h-full"
                                    }}
                                    image3={{
                                        src: "/images/showcase3b.png",
                                        width: 1920,
                                        height: 1080,
                                        alt: "RevisionDojo third image",
                                        className: "object-cover w-full h-auto"
                                    }}
                                />
                            </div>

                            {/* Mission Section */}
                            <div id="mission" className='flex flex-col case-gap case-mt' >
                                <ContainerLine
                                    subheader="The Mission"
                                    title="Unifying 500+ features into a new search system."
                                    body={["As an Edtech tool, RevisionDojo's features need to cover alot of content. 30+ subjects of it (15+ features per subject). Yet, students usually arrive with a single, specific goal"]}
                                    img="/images/RD3a.png"
                                    alt="Project Research Timeline"
                                    gutter="case-x-gutter"
                                    imgHeight="h-[50vh]"
                                />

                                <div className="flex flex-col md:flex-row lg:flex-row gap-[2rem] case-x-gutter">
                                    <ContainerLine
                                        subheader="Key Insight"
                                        title="Students use only 10% of the app"
                                        body={["Students focus on just 6/30 subjects, so the remaining content adds friction instead of value."]}
                                        img="/images/RD4.png"
                                        alt="Project Research Timeline"
                                    />

                                    <ContainerLine
                                        subheader="Key Insight"
                                        title="Current search couldn't support this."
                                        body={["Hundreds of results are returned in a single infinite list without reliable means to filter though them. "]}
                                        img="/images/RD5.png"
                                        alt="Project Research Timeline"
                                    />
                                </div>
                            </div>

                            {/* Solution Section */}
                            <div id="solution" className='flex flex-col case-gap case-mt'>
                                <ContainerVideo
                                    subheader="Solution"
                                    title="Segmenting search through filters"
                                    body={["We split search between subject and features. Subjects serve as a pre-flight filter so returned search results are relevant."]}
                                    img="/images/RD8.png"
                                    alt="Project Research Timeline"
                                    gutter="case-x-gutter"
                                    videoSrc="/images/newDemo1.mp4"
                                    videoHeight="h-[60vh]"
                                />

                                <ContainerVideo
                                    subheader="Solution"
                                    title="The pre-search screen"
                                    body={["Insights from user research revealed that blank search screens were daunting. So we added a pre-search screen filled with features and options to provide visual guidance. "]}
                                    alt="Project Research Timeline"
                                    gutter="case-x-gutter"
                                    vidPad="p-[0rem] lg:p-[2rem] md:p-[2rem]"
                                    videoSrc="/images/newDemo2.mp4"
                                    videoHeight="h-[60vh]"
                                />
                            </div>

                            {/* Decisions Section */}
                            <div id="decisions" className='flex flex-col case-gap case-mt'>
                                <ContainerLine
                                    subheader="Design Decision"
                                    title="Result need to be scannable."
                                    body={["Each cell's content was carefully considered. Students could be crawling through hundreds of results, so we needed to make sure we could communicate a whole feature's value in just a few points."]}
                                    img="/images/RD10c.png"
                                    alt="Project Research Timeline"
                                    gutter="case-x-gutter"
                                    imgHeight="h-[60vh]"
                                />


                                <ContainerVideo
                                    subheader="Design Decision"
                                    title="Drawing Features"
                                    body={["The search bar also supports feature discovery for new users. Since many of RevisionDojo's features are unfamiliar, I created illustrations to help communicate their purpose at a glance without relying on heavy text."]}
                                    alt="Project Research Timeline"
                                    rivSrc="/../images/features.riv"
                                    rivStateMachine="State Machine 2"
                                    gutter="case-x-gutter"
                                    vidPad="p-[0rem] lg:p-[6rem] md:p-[4rem]"
                                    videoHeight="h-[60vh]"
                                />
                            </div>

                            {/* Reflection Section */}
                            <div id="reflection" className='case-mt case-gap flex flex-col'>
                                <ContainerReflection
                                    reflections={[
                                        "Don't reinvent the wheel and over engineer a crazy complicated solution for a simple problem. Alot of this project was spent learning to lean on precedents.",
                                        "Be a chronic communicator. It became a habit to share updates/looms with engineers, teammates, and stakeholders to keep everyone up to date.",
                                    ]}
                                />
                                <Label text="This is just a snapshot of the entire design process." />
                            </div>
                        </div>
                    </div>
                </div>
                {/* //left side */}
                <div className={` h-full duration-[400ms] ease-fast
                ${showTop ? "xl:w-[4rem] md:w-[4rem] lg:w-[4rem]" : "md:w-[0rem] xl:w-[0rem] lg:w-[0rem]"}
                `}></div>
            </div>
        </div >
    )
}

export default Page
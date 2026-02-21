"use client";

import React, { useRef, useEffect } from "react";
import ContainerLine from "../../../components/containerLine";
import ContainerIntro from "../../../components/ContainerIntro";
import ContainerReflection from "../../../components/containerReflection";
import ContainerVideo from "../../../components/containerVideo";
import { useCaseContext } from "../../../utils/caseContext";
import Label from "../../../components/label";
import Sidebar from "../../../components/sidebar";
import FixedSidebar from "../../../components/FixedSidebar";

function Page() {
  const team = ["1 Design Director (Me)", "2 Designers"];
  const { setShowTop, showTop } = useCaseContext();
  const pageTop = useRef(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setShowTop(entry.isIntersecting);
    });
    observer.observe(pageTop.current);
    return () => observer.disconnect();
  }, [setShowTop]);

  return (
    <div className="flex flex-col w-screen">
      {/* Fixed spacer */}
      <div
        className={`relative top-0 left-0 w-full pointer-events-none transition-all duration-300 ease-fast z-[1] lg:bg-transparent ${showTop ? "h-[10rem] xl:h-[12rem]" : "h-[0rem]"}`}
      />

      <div className="flex flex-row h-screen w-full">
        {/* Sidebar */}
        <div
          className={`shrink-0 h-full transition-all ease-fast duration-450 ${showTop ? "md:w-16 lg:w-24 xl:w-[9rem]" : "md:w-32 lg:w-48 xl:w-[18rem]"}`}
        >
          <FixedSidebar
            className={`fixed h-full w-[0] md:w-[8rem] lg:w-[12rem] xl:w-[12rem] flex flex-col overflow-hidden top-[5vh] lg:top-[8vh] xl:top-[6vh] justify-start h-full transition-all ease-fast duration-450 pl-[4vw] xl:pl-[2.4vw] lg:pl-[3vw]
                    ${showTop ? "opacity-0" : "opacity-100"}
                    `}
          >
            <Sidebar
              isVisible={!showTop}
              cards={[
                { id: "about", name: "Intro" },
                { id: "design", name: "Design" },
                { id: "pillars", name: "Pillars" },
                { id: "reflection", name: "Reflection" },
              ]}
              onCardSelect={scrollToSection}
            />
          </FixedSidebar>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 h-fit transition-all duration-[450ms] ease-out">
          <div ref={pageTop} />

          <div className="w-full flex flex-col pb-[4-rem] bg-secondary items-center">
            <div
              className={`flex flex-col bg-white w-full justify-center y-gutter ease-in-out duration-[450ms] px-[0] md:px-[2rem] lg:px-[2rem] xl:px-[2rem]
                            ${showTop ? " rounded-[1rem]" : " rounded-[0rem]"}
                            `}
            >
              {/* About Section */}
              <div id="about" className="flex flex-col gap-[0.5rem] case-mt">
                <ContainerIntro
                  Name="Axis Consulting"
                  Year="2025"
                  body={[
                    "Axis Consulting, a pro bono consulting club at Simon Fraser University, needed a bold rebrand to reignite engagement. ",
                    "As the Design Director, I developed a striking visual identity to inspire and captivate its audience.",
                  ]}
                  Teammates={team}
                />
                <ContainerLine
                  img="/images/Axis/Axis1.png"
                  img2="/images/Axis/Axis2.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[20rem]"
                  imgw="w-full"
                  imgw2="lg:w-[50%] w-full"
                  imgobj2="object-cover w-full"
                  imgobj="object-cover"
                  lazy
                />
                <ContainerLine
                  img="/images/Axis/Axis3.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[25rem]"
                  imgobj="object-cover"
                  lazy
                />
              </div>

              {/* Mission Section */}
              <div id="design" className="flex flex-col gap-[0.5rem] case-mt">
                <ContainerLine
                  subheader="The Mission"
                  title="Reignite a dying brand"
                  body={[
                    "The brand is built on contrast: structured, strategic geometry paired with fluid motion. It reflects consultants who are grounded in precision, yet constantly adapting",
                  ]}
                  img="/images/Axis/Axis4.png"
                  img2="/images/Axis/Axis5.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[20rem]"
                  imgobj="object-cover"
                  imgobj2="object-cover"
                  lazy
                />
                <ContainerLine
                  img="/images/Axis/Axis6.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[25rem]"
                  lazy
                />
                <ContainerLine
                  img="/images/Axis/Axis7.png"
                  img2="/images/Axis/Axis8.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[20rem]"
                  imgw="w-full"
                  imgw2="lg:w-[60%] w-full"
                  imgobj2="object-cover"
                  lazy
                />
                <ContainerLine
                  img2="/images/Axis/Axis10.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[20rem]"
                  imgw=" lg:w-[40%] w-full"
                  imgw2="w-full"
                  imgobj="object-cover"
                  lazy
                />
              </div>

              {/* Solution Section */}
              <div id="pillars" className="flex flex-col gap-[0.5rem] case-mt">
                <ContainerLine
                  subheader="Visual Pillars"
                  title="Visual Pillars inspired by core values."
                  body={[
                    "Much of the visual motifs that decorate our images were inspired by the 3 core values of Axis: Strategy, Clarity, and Impact. Their presence across the art direction were meant to ground assets, just as the core values ground our organization.",
                  ]}
                  img="/images/Axis/Axis11.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[25rem]"
                  lazy
                />
                <ContainerLine
                  img="/images/Axis/Axis12.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[25rem]"
                  lazy
                />
                <ContainerLine
                  img="/images/Axis/Axis13.png"
                  img2="/images/Axis/Axis14a.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[20rem]"
                  imgobj2="object-cover"
                  lazy
                />
              </div>

              {/* Reflection Section */}
              <div id="reflection" className="case-mt case-gap flex flex-col">
                <ContainerReflection
                  reflections={[
                    "Good ideas come from anywhere. Leading a powerhouse of a team meant doing more collaborating then delegating. Some of the weirdest ideas came while I was on the toilet.",
                    "Chase feedback in moderation. Trying to appease a 13+ person executive team is incredibly hard.",
                  ]}
                />
                <Label text="This is just a snapshot of the entire design process." />
              </div>
            </div>
          </div>
        </div>
        {/* //left side */}
        <div
          className={`h-full duration-450 ease-fast
                ${showTop ? "md:w-[4rem] xl:w-[9rem] lg:w-[6rem]" : "w-[0rem]"}
                `}
        ></div>
      </div>
    </div>
  );
}

export default Page;

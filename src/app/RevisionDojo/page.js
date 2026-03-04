"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRive } from "@rive-app/react-canvas";

// Isolated so useRive only runs when this component mounts (lazy)
function JojoBookRive() {
  const { RiveComponent: JojoBook } = useRive({
    src: "/images/playground/riv/jojo-book.riv",
    autoplay: true,
  });
  return <JojoBook className="w-full h-full" />;
}
import ContainerLine from "../../../components/containerLine";
import ContainerIntro from "../../../components/ContainerIntro";
import ContainerReflection from "../../../components/containerReflection";
import ContainerVideo from "../../../components/containerVideo";
import { useCaseContext } from "../../../utils/caseContext";
import { useTooltip } from "../../../utils/toolTipContext";
import Label from "../../../components/label";
import Sidebar from "../../../components/sidebar";
import FixedSidebar from "../../../components/FixedSidebar";
import ContainerImage from "../../../components/containerImage";
import Image from "next/image";
import Label2 from "../../../components/label2";
import CaseCarousel from "../../../components/caseCarousel";
import CaseCard from "../../../components/caseCard";

function Page() {
  const team = ["1 Designer (Me)", "2 Developers"];
  const { setShowTop, showTop } = useCaseContext();
  const { tooltip } = useTooltip();
  const pageTop = useRef(null);
  const jojoRef = useRef(null);
  const [jojoVisible, setJojoVisible] = useState(false);

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
    // Reset on mount so there's no layout-shift animation on page entry
    setShowTop(true);
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setShowTop(entry.isIntersecting);
    });
    observer.observe(pageTop.current);
    return () => observer.disconnect();
  }, [setShowTop]);

  useEffect(() => {
    const el = jojoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setJojoVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col max-w-screen">
      {/* Fixed spacer */}
      <div
        className={`relative top-0 left-0 w-full pointer-events-none z-[1] lg:bg-transparent h-[10rem] xl:h-[12rem]`}
      />

      <div className="flex flex-row h-screen w-full">
        {/* Sidebar */}
        <div
          className={`shrink-0 h-full transition-all ease-fast duration-700 ${showTop ? "md:w-[8rem] lg:w-[12rem] xl:w-[18rem]" : "md:w-[8rem] lg:w-[12rem] xl:w-[18rem]"}`}
        >
          {/* //need to use fixed sidebar here, which uses a react portal to take it out of the normal flow nbecause of the absolute page transitions. */}
          <FixedSidebar
            className={`fixed h-full w-[0] md:w-[8rem] lg:w-[12rem] xl:w-[18rem] flex flex-col overflow-hidden top-[5vh] lg:top-[8vh] xl:top-[6vh] justify-start h-full transition-all ease-fast duration-700 pl-[4vw] xl:pl-[4vw] lg:pl-[3vw]
                    ${showTop ? "opacity-0" : "opacity-100"}
                    `}
          >
            <Sidebar
              isVisible={!showTop}
              cards={[
                { id: "about", name: "Intro" },
                { id: "mission", name: "Mission" },
                { id: "solution", name: "Solution" },
                { id: "flows", name: "Flows" },
                { id: "research", name: "Research" },
                { id: "decisions", name: "Decisions" },
                { id: "tests", name: "Testing Users" },
                { id: "reflection", name: "Reflection" },
              ]}
              onCardSelect={scrollToSection}
            />
          </FixedSidebar>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 h-fit transition-all duration-[450ms] ease-out">
          <div ref={pageTop} />

          <div className="w-full flex flex-col pb-[4-rem] items-center">
            <div
              className={`flex flex-col bg-white w-full justify-center y-gutter ease-in-out duration-[450ms] px-[0] md:px-[2rem] lg:px-[2rem] xl:px-[2rem]
                            ${showTop ? " rounded-[1rem]" : " rounded-[0rem]"}
                            `}
            >
              {/* About Section */}
              <div id="about" className="flex flex-col case-gap case-mt">
                <div className="flex flex-col gap-[4rem]">
                  <div className="w-fit case-x-gutter">
                    <div className="w-[4rem] h-[4rem]">
                      <Image
                        src="/images/rd-modal.svg"
                        alt="RevisionDojo Logo"
                        width={200}
                        height={200}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <ContainerIntro
                    Name="RevisionDojo"
                    Year="2025"
                    body={[
                      "RevisionDojo is the fastest growing edtech startup, providing digital IB study tools to 400,000+ users.",
                      "My team developed a scalable navigation system to anchor the products rapid growth.",
                    ]}
                    Teammates={team}
                    ideatedWith={["Amy Zhao", "Rebecca Yeung", "Jolly Liu", "Jessica Chan"]}
                    videoSrc="/images/RDCoverNew.mp4"
                    image2={{
                      src: "/images/showcase2.svg",
                      width: 1920,
                      height: 1080,
                      alt: "RevisionDojo second image",
                      className: "object-cover w-full h-full",
                    }}
                    image3={{
                      src: "/images/showcase3b.png",
                      width: 1920,
                      height: 1080,
                      alt: "RevisionDojo third image",
                      className: "object-cover w-full h-auto",
                    }}
                  />
                </div>
              </div>
              {/* Mission Section */}
              <div id="mission" className="flex flex-col case-gap case-mt">
                <ContainerLine
                  subheader="The Mission"
                  title="Unifying 500+ features into a new search system."
                  body={[
                    "Countless documents, features and subjects are stored on RevisionDojo, but there was no reliable way for users to discover them.",
                  ]}
                  img="/images/RD3a.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[40vh]"
                  lazy
                />

                <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row gap-[0.5rem] case-x-gutter">
                  <ContainerLine
                    subheader="Key Insight"
                    title="Students  need to navigate mountains of content."
                    body={[
                      "Students focus on just 6/30 subjects, so the remaining content adds friction instead of value.",
                    ]}
                    img="/images/RD4.png"
                    alt="Project Research Timeline"
                    lazy
                  />

                  <ContainerLine
                    subheader="Key Insight"
                    title="No features supported large-scale search."
                    body={[
                      "Hundreds of results are returned in a single infinite list without reliable means to filter though them. ",
                    ]}
                    img="/images/RD5.png"
                    alt="Project Research Timeline"
                    lazy
                  />
                </div>
              </div>
              {/* Solution Section */}
              <div id="solution" className="flex flex-col case-gap case-mt">
                <ContainerVideo
                  subheader="Solution"
                  title="Segmenting search through filters"
                  body={[
                    "Search that knows what you're looking for. By filtering by subject first, results are scoped before you ever type a keyword — so you're choosing from 24 relevant results, not scrolling through hundreds.",
                  ]}
                  img="/images/RD8.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  videoSrc="/images/RDDemo1.mp4"
                  videoHeight="h-[40vh]"
                  caption="Select a subject before a feature."
                />

                <ContainerVideo
                  subheader="Solution"
                  title="Helping users overcome decision paralysis"
                  body={[
                    "Insights from user research revealed that blank search screens were daunting. So we added a pre-search screen filled with features and options to provide visual guidance. ",
                  ]}
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  vidPad="p-[0rem] lg:p-[4rem] md:p-[2rem]"
                  videoSrc="/images/RDDemo2a.mp4"
                  videoHeight="h-[40vh]"
                  caption="Exerpts from our solution"
                />
              </div>
              {/* Decisions Section */}
              <div id="flows" className="flex flex-col case-gap case-mt">
                <ContainerLine
                  subheader="Design Decision"
                  title="Contextualizing a whole feature in just a moment"
                  body={[
                    "Each cell's content was carefully considered. Students could be crawling through hundreds of results, so we needed to make sure we could communicate a whole feature's value in just a few points.",
                  ]}
                  img="/images/RD10c.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[40vh]"
                  lazy
                  caption="Breaking down the anatomy of a feature block."
                />

                <ContainerVideo
                  subheader="Design Decision"
                  title="Conveying features beyond text descriptions."
                  body={[
                    "The search bar also supports feature discovery for new users. Since many of RevisionDojo's features are unfamiliar, I created illustrations to help communicate their purpose at a glance without relying on heavy text.",
                  ]}
                  alt="Project Research Timeline"
                  videoSrc="/images/RD-drawings.mp4"
                  gutter="case-x-gutter"
                  // vidPad="p-[0rem] lg:p-[4rem] md:p-[4rem]"
                  videoHeight="h-[40vh]"
                  caption="All hand drawn in Figma"
                />
              </div>

              {/* //case line */}
              <div className="w-full h-fit case-x-gutter case-mt flex flex-row gap-[1rem] items-center">
                <div className="border-b-[1px] border-secondary w-full h-[1px]"></div>
                <h6>Research</h6>
                <div className="border-b-[1px] border-secondary w-full h-[1px]"></div>
              </div>

              <div id="research" className="flex flex-col gap-[0.5rem] case-mt">
                <ContainerLine
                  subheader="Context"
                  title="Where it all started"
                  body={[
                    "RevisionDojo's content, features, and subject coverage dwarfs our competitors.",
                    "Yet consistently, through each update, new feature added, and content added, we would see the same staggering amount of drop off.",
                  ]}
                  img="/images/RD/RDN1.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[40vh]"
                  lazy
                />
              </div>

              <div id="research" className="flex flex-col case-gap case-mt">
                <ContainerLine
                  subheader="Research"
                  title="So... why wasn't this happening?"
                  body={[
                    "Analyzing session recordings, user reviews, reddit ect.. I realized the most concentrated drop off point was right after onboarding.",
                    "Why wasn't our product converting?",
                  ]}
                  img="/images/RD/RDN2a.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[40vh]"
                  lazy
                  caption="The biggest pain point."
                />
                <div className=" case-x-gutter flex flex-col gap-[2rem]">
                  <ContainerLine
                    subheader="Research"
                    title="Researching pain points and understanding user rationale."
                    body={[
                      "While I had my own assumptions about why users dropped off, what better way to understand the process (and avoid assumptions!!) then to ask the users. ",
                    ]}
                  />
                  <div className="flex flex-col gap-[1rem] max-w-full md:max-w-[36rewm] lg:max-w-[42rem] xl:max-w-[60rem]">
                    <h5 className="text-text-secondary">Goals:</h5>
                    <div className="gap-0">
                      <p className="text-text-teritary">
                        1. Understand rationale for drop off.
                      </p>
                      <p className="text-text-teritary">
                        2. Identify motivations for new users that convert.
                      </p>
                    </div>
                  </div>
                  <ContainerLine
                    img="/images/RD/RDN9-sticky-latest.png"
                    alt="my research affinity maps"
                    imgHeight="h-[40vh]"
                    imgobj="object-cover"
                    caption="All of our sorted insights."
                  />

                  <Label2
                    title="Our Audience"
                    body="60 Surveyants, 12 User Interviews: We surveyed both new and existing users — to uncover friction points driving drop-off, and to understand the workarounds and habits long-term users had developed."
                    alt="Dojo logo with a notepad"
                    image="/images/RD/RD-audience.svg"
                  />
                </div>{" "}
                <div className="flex flex-col gap-[1.5rem] case-x-gutter">
                  <ContainerLine
                    subheader="Research"
                    title="Consolidating data from the UXR campaign into insights."
                    body={[
                      "Our research yielded several key insights, which culminated in our north star guiding principle:",
                    ]}
                  />
                  <div className="flex flex-col gap-[0.5rem] max-w-full md:max-w-[36rewm] lg:max-w-[42rem] xl:max-w-[60rem]">
                    <div className="gap-[0.5rem] flex flex-col">
                      <p className="text-text-teritary">
                        1. IB Students drop off after ~25s
                      </p>
                      <p className="text-text-teritary">
                        2. We can extrapolate a clear goal via subject resonace
                        from users.
                      </p>
                      <p className="text-text-teritary">
                        3. The relevancy of a site is determined by how closely
                        our content aligns with class curriculum.
                      </p>
                    </div>
                  </div>
                  <div className="h-[40vh] w-full bg-[#F8F8F8] flex flex-col items-center justify-center">
                    <div className="w-[50%] flex flex-col gap-[0.5rem] items-center">
                      <div ref={jojoRef} className="w-48 h-48">
                        {jojoVisible && <JojoBookRive />}
                      </div>
                      <p>Our North Star</p>
                      <p className="text-text-teritary text-center">
                        It is imperative that we get relevant content in front
                        of users as soon as they hit the site.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Iteration */}
              <div id="decisions" className="flex flex-col case-gap case-mt">
                <div className="case-x-gutter flex flex-col gap-[1.5rem]">
                  <ContainerLine
                    subheader="Solution Ideation"
                    title="Evaluating ideas against research and technical constraint."
                    body={[
                      "Since I worked closely with the engineering team and founders, I had the opportunity to pitch each of these solutions, aligning them with technical constraints, product goals, and what it would offer the broader app.",
                    ]}
                  />
                  <CaseCarousel
                    imgHeight="h-[40vh]"
                    items={[
                      {
                        img: "/images/RD/RDN4-searchbarb.png",
                        alt: "Search bar concept",
                      },
                      {
                        img: "/images/RD/RDN4-connectorsa.png",
                        alt: "Connectors concept",
                      },
                      {
                        img: "/images/RD/RDN4-onboardinga.png",
                        alt: "Onboarding concept",
                      },
                      {
                        img: "/images/RD/RDN4-sidebara.png",
                        alt: "Sidebar concept",
                      },
                    ]}
                  />
                </div>
                <div className="case-x-gutter">
                  <Label2
                    title="The search bar was the best option."
                    body="Initial solutions, while promising, were not uniquely positioned to validate subject resonance for users in the first 2 minutes."
                    image="/images/RD/orange-star.svg"
                  />
                </div>
                <ContainerLine
                  subheader="Solution Ideation"
                  title="Transitioning from ideation to implementation"
                  body={[
                    "Nowadays, there are so many different ways to build search. Informed by competitive research, I built many, many, many variations of the searchbar before settling on a final design.",
                  ]}
                  img="/images/RD/RDN5.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[40vh]"
                  lazy
                  caption="Many, many many ideations were built."
                />
              </div>

              <div id="tests" className="flex flex-col case-gap case-mt">
                <ContainerVideo
                  subheader="Solution Ideation"
                  title="Testing the prototype with users, engineers, and the founders."
                  body={[
                    "After ideating many many many wireframes, I consolidated my features into a final prototype, which was prepared for testing with users and the founding team.",
                  ]}
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  imgHeight="h-[40vh]"
                  lazy
                  videoSrc="/images/RD/RDN9.mp4"
                  videoHeight="h-[40vh]"
                  caption="Initial prototype"
                />
                <ContainerVideo
                  subheader="Solution Ideation"
                  title="Making difficult decisions post user testing"
                  body={[
                    "Testing with users, the founding team, and engineers revealed quite a few valuable insights that challenged our initial solution:",
                    "Users felt way too much pressure to choose a subject, then a corresponding feature. (Largely due to not understanding all the different features, since many were native to the webapp)",
                  ]}
                  videoSrc="/images/RD/RDN9-sticky.mp4"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  videoHeight="h-[40vh]"
                  lazy
                  caption="User feedback we received"
                />

                <ContainerVideo
                  subheader="Final Solution"hel
                  title="Landing on the Final Solution"
                  body={[
                    "We recognized that most users wouldn't understand our features to the point of deriving value from them (\"whats question rush, and why do I care about it?), so a good middle point was navigating them to the subject itself, and letting them crawl from there via a directory of features",
                    "What we initially assumed to help with precise decision making, actually created decision paralysis.",
                  ]}
                  img="/images/RD8.png"
                  alt="Project Research Timeline"
                  gutter="case-x-gutter"
                  videoSrc="/images/RDDemo1.mp4"
                  videoHeight="h-[40vh]"
                  reactionSrc="/images/RD/RDN9-reaction.mp4"
                  caption="The final solution, and reaction."
                />
              </div>

              {/* Reflection Section */}
              <div id="reflection" className="case-mt case-gap flex flex-col">
                <ContainerReflection
                  reflections={[
                    "Don't reinvent the wheel and over engineer a crazy complicated solution for a simple problem. Alot of this project was spent learning to lean on precedents.",
                    "Be a chronic communicator. It became a habit to share updates/looms with engineers, teammates, and stakeholders to keep everyone up to date.",
                  ]}
                />
                <Label text="This is just a snapshot of the entire design process." />
              </div>

              {/* Next case */}
              <div className="case-mt case-x-gutter flex flex-col gap-4 pb-[2rem]">
                <h6 className="text-text-secondary">Next</h6>
                <div {...tooltip("Click to open")}>
                  <CaseCard
                    type="Case"
                    name="Axis Consulting"
                    link="/Axis"
                    videoSrc="/images/Axis/AxisCover.mp4"
                    body="Launching an ambitious rebrand for a university consulting club."
                    cardBg="black"
                    logoSrc="/images/axis-logo-nobg.svg"
                    position={0}
                    className="w-full aspect-[2/1] min-h-[12rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //left side */}
        <div
          className={`h-full duration-700 ease-fast
                ${showTop ? "md:w-[8rem] xl:w-[9rem] lg:w-[12rem]" : " md:w-[8rem] lg:w-[12rem]"}
                `}
        ></div>
      </div>
    </div>
  );
}

export default Page;

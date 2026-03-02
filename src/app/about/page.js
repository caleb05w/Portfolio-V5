"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useCaseContext } from "../../../utils/caseContext";
import Sidebar from "../../../components/sidebar";
import FixedSidebar from "../../../components/FixedSidebar";
import CaseCarousel from "../../../components/caseCarousel";

const ABOUT_PHOTOS = [
  {
    img: "/images/about/caleb.png",
    alt: "Late night with the boys",
    caption: "That's me!",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
  {
    img: "/images/about/about9.png",
    alt: "Car selfie",
    caption: "Me and the RevisionDojo dev team. (I am in the middle)",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
  {
    img: "/images/about/about5.png",
    alt: "New Year's",
    caption: "YIPPEE",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
  {
    img: "/images/about/about1.png",
    alt: "Exerpts from RevisionDojo London!",
    caption: "Exerpts from RevisionDojo London!",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
  {
    img: "/images/about/about2.png",
    alt: "Rooftop air mattress",
    caption: "Sleeping on an air mattress in the summer (not me)",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
  {
    img: "/images/about/about3.png",
    alt: "Tower Bridge, London",
    caption: "Summer with the Revison Dojo team :)",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },

  {
    img: "/images/about/about7.png",
    alt: "Car trunk",
    caption: "Someone had to ride in the trunk.",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
  {
    img: "/images/about/about8.png",
    alt: "Passed out in a chair",
    caption: "The aftermath of a good night.",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },

  {
    img: "/images/about/about10.png",
    alt: "Travel buddy",
    caption: "Brought my travel buddy to Vietnam.",
    object: "object-cover w-full h-full",
    imgHeight: "h-[40vh]",
  },
];

const HOBBIES = [
  {
    src: "/images/about/claude.png",
    label: "God I love Claude. I have like 2 pro accounts. I'm so wired on AI.",
  },
  {
    src: "/images/about/car.png",
    label:
      "Collecting Lego Cars. I actually own this one, the Ferrari SF-24 F1",
  },
  {
    src: "/images/about/disc.png",
    label: "Proud owner of 50+ playlists...",
  },
  {
    src: "/images/about/thrift.png",
    label: "Thirftinggg <333, I got this jacket in Vietnam.",
  },
  {
    src: "/images/about/king-rocky.png",
    label: "Honoured to be in A$AP Rocky's top 0.5% annual listeners",
  },
  {
    src: "/images/about/pixel-art.png",
    label: "Oh did I mention that I make pixel art too!",
  },
  {
    src: "/images/about/design.png",
    label: "I love design, - the quote is from Studio Dunbar.",
  },
  {
    src: "/images/about/switch.png",
    label: "Been playing alot of Minecraft Dungeons on the switch lately.",
  },
  {
    src: "/images/about/typography.png",
    label: "Gosh, my favourite part of design has to be typography.",
  },
];

const EXPERIENCES = [
  {
    name: "RevisionDojo (YCF24)",
    role: "Product Design Intern",
    year: "2025",
    href: "/RevisionDojo",
  },
  {
    name: "Metalab",
    role: "Product Design Intern",
    year: "2025",
    href: "/Axis",
  },
];

const EDUCATION = [
  { name: "Simon Fraser University", role: "B.A. Design", year: "2022 - 2027" },
];

function SectionHeader({ title }) {
  return (
    <div className="w-full flex flex-row gap-[1rem] items-center">
      <h6>{title}</h6>
      <div className="border-b border-secondary flex-1" />
    </div>
  );
}

function ListRow({ name, role, year, href }) {
  return (
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-row gap-[0.5rem]">
        {href ? (
          <a href={href}>
            <h6 className="hover:text-text-secondary transition-colors duration-200">
              {name}
            </h6>
          </a>
        ) : (
          <h6>{name}</h6>
        )}
        <h6 className="text-text-secondary">{role}</h6>
      </div>
      <h6>{year}</h6>
    </div>
  );
}

export default function Page() {
  const { setShowTop } = useCaseContext();
  const pageTop = useRef(null);
  const [hobbiesOpen, setHobbiesOpen] = useState(false);

  useEffect(() => {
    setShowTop(true);
    const observer = new IntersectionObserver(([entry]) =>
      setShowTop(entry.isIntersecting),
    );
    observer.observe(pageTop.current);
    return () => observer.disconnect();
  }, [setShowTop]);

  return (
    <div className="flex flex-col max-w-screen">
      <div className="relative top-0 left-0 w-full pointer-events-none z-[1] h-[10rem] xl:h-[12rem]" />

      <FixedSidebar className="fixed h-full w-[0] md:w-[8rem] lg:w-[12rem] xl:w-[18rem] flex flex-col overflow-hidden top-[5vh] lg:top-[8vh] xl:top-[6vh] justify-start pl-[4vw] xl:pl-[4vw] lg:pl-[3vw]">
        <Sidebar
          isVisible={true}
          cards={[{ id: "contact", name: "Contact" }]}
        />
      </FixedSidebar>

      <div className="flex flex-col w-full h-fit">
        <div ref={pageTop} />

        <div className="flex flex-col gap-[4rem] case-x-gutter y-gutter lg:pt-[4vh] pt-[4.5vh] max-w-[52rem] xl:max-w-[60vw] mx-auto w-full">
          {/* Bio */}
          <div id="bio" className="flex flex-col gap-[2rem] w-full">
            <div className="flex flex-col gap-[0.4rem]">
              <p>Hi, I&apos;m Caleb.</p>
              <div className="group flex flex-row gap-[0.5rem] items-center">
                <h6 className="text-text-secondary">
                  Product Design | Seeking Summer &amp; Fall 2026
                </h6>
                <a
                  href="#contact"
                  className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm hover:text-black transition-colors"
                >
                  reach out!
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-[2rem]">
              <p>I dream of shipping a product worldwide.</p>
              <p>
                Most recently, I was the first design hire at{" "}
                <a
                  href="https://revisiondojo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  RevisionDojo
                </a>{" "}
                (YC F24), growing the platform from 200k to 500k users. Before
                that, I interned at{" "}
                <a
                  href="https://metalab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Metalab
                </a>
                , a wonderful design agency, working with clients across Fintech
                & Entertainment sectors.
              </p>
              <p>
                <button
                  onClick={() => {
                    const next = !hobbiesOpen;
                    setHobbiesOpen(next);
                    if (!next) window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-secondary cursor-pointer"
                >
                  Outside of design
                </button>
                , you can find me collecting Lego cars, competing in Yugioh
                tournaments, or watching anime power scaling debates.
              </p>
            </div>
          </div>

          {/* Hobbies — revealed by "Outside of design" */}
          <div
            className={`grid transition-[grid-template-rows,margin-top] duration-500 ease-in-out ${hobbiesOpen ? "grid-rows-[1fr] mt-0" : "grid-rows-[0fr] -mt-[4rem]"}`}
          >
            <div className="overflow-hidden">
              <div id="hobbies" className="flex flex-col gap-[1.25rem]  pb-4">
                <SectionHeader title="Hobbies" />
                <div className="grid grid-cols-3 gap-4">
                  {HOBBIES.map(({ src, label }, i) => (
                    <div
                      key={i}
                      className="group/hobby aspect-square relative"
                      style={{
                        opacity: hobbiesOpen ? 1 : 0,
                        transform: hobbiesOpen
                          ? "translateY(0)"
                          : "translateY(px)",
                        transition: "opacity 400ms ease, transform 400ms ease",
                        transitionDelay: hobbiesOpen ? `${i * 40}ms` : "0ms",
                      }}
                    >
                      <span className="absolute top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/hobby:opacity-100 transition-opacity duration-200 pointer-events-none text-white text-xs bg-black/80 px-2 py-1 rounded-sm z-10 w-[10rem] text-center leading-snug">
                        {label}
                      </span>
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={src}
                          width={400}
                          height={400}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div id="experience" className="flex flex-col gap-[1.25rem]">
            <SectionHeader title="Experiences" />
            <div className="flex flex-col gap-[0.25rem]">
              {EXPERIENCES.map((item) => (
                <ListRow key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div id="education" className="flex flex-col gap-[1.25rem]">
            <SectionHeader title="Education" />
            <div className="flex flex-col gap-[0.25rem]">
              {EDUCATION.map((item) => (
                <ListRow key={item.name} {...item} />
              ))}
            </div>
          </div>

          {/* Say Hello */}
          <div id="contact" className="flex flex-col gap-[1.25rem]">
            <p> Say Hello! </p>
            <div className="flex flex-row gap-[0.5rem] items-center">
              <a
                href="https://x.com/calebwu_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h6 className="hover:text-text-secondary transition-colors duration-200">
                  Twitter
                </h6>
              </a>
              <h6 className="text-text-secondary">|</h6>
              <a
                href="https://www.linkedin.com/in/caleb-wu-/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h6 className="hover:text-text-secondary transition-colors duration-200">
                  LinkedIn
                </h6>
              </a>
              <h6 className="text-text-secondary">|</h6>
              <a href="mailto:caleb05w@gmail.com">
                <h6 className="hover:text-text-secondary transition-colors duration-200">
                  caleb05w@gmail.com
                </h6>
              </a>
            </div>
          </div>

          {/* Photos */}
          <CaseCarousel items={ABOUT_PHOTOS} />
        </div>
      </div>
    </div>
  );
}

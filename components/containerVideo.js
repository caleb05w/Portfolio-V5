import React, { useRef, useEffect } from "react";
import ContainerText from "../components/containerText";
import { useRive } from "@rive-app/react-canvas"

function ContainerVideo({ title, body, videoSrc, hint, subheader, gutter, vidPad, rivSrc, rivStateMachine, videoHeight, videoPreload, posterSrc }) {
    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);

    //animation component
    const { RiveComponent } = useRive(
        rivSrc
            ? {
                src: rivSrc,
                stateMachines: { rivStateMachine },
                autoplay: true,
            }
            : { autoplay: false }
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(err => console.log("Video play failed:", err));
                } else {
                    videoRef.current?.pause();
                }
            },
            {
                rootMargin: "50px",
                threshold: 0.01,
            }
        );

        if (videoContainerRef.current) {
            observer.observe(videoContainerRef.current);
        }

        return () => {
            if (videoContainerRef.current) {
                observer.unobserve(videoContainerRef.current);
            }
        };
    }, []);

    return (
        <div className={`flex flex-col min-h-full justify-between w-full ${gutter}`}>
            <ContainerText title={title} body={body} subheader={subheader} />

            {(videoSrc || rivSrc) && (
                <div className="w-full mt-[2rem] overflow-hidden" ref={videoContainerRef}>
                    <div className={`relative w-full bg-[#F8F8F8] overflow-hidden ${videoHeight ?? "lg:h-[25rem] h-[40vh]"}`}>
                        {videoSrc &&
                            <video
                                ref={videoRef}
                                className="absolute top-0 left-0 w-full h-full"
                                src={videoSrc}
                                muted
                                loop
                                playsInline
                                preload={videoPreload ?? "none"}
                                poster={posterSrc}
                                style={{
                                    backgroundColor: "#F8F8F8",
                                    objectFit: "contain",
                                    padding: vidPad,
                                }}
                            />
                        }
                        {
                            rivSrc &&
                            <div className={`w-full h-full ${vidPad ?? "p-[0rem]"}`}>
                                <RiveComponent className='border border-transparent h-full w-full' />
                            </div>
                        }
                    </div>
                </div>
            )}
            {hint && <ContainerText title={null} body={hint} />}
        </div>
    );
}

export default ContainerVideo;
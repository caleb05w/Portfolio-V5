
'use client'
import React from "react"
import { useRive } from '@rive-app/react-canvas'


function TitleAnimation() {
    //animation
    const { RiveComponent } = useRive({
        src: "/../images/titlea.riv",
        stateMachines: "State Machine 1",
        autoplay: true
    })

    return (
        <div className='w-full h-full'>
            <RiveComponent />
        </div>
    );
}

export default TitleAnimation

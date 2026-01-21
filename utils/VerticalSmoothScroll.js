"use client"

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis';

export default function VerticalSmoothScroll() {

    const [lenisRef, setLenis] = useState(null)
    const [rafState, setRafState] = useState(null)

    useEffect(() => {
        const scroller = new Lenis
        let rf;

        function raf(time) {
            scroller.raf(time)
            requestAnimationFrame(raf)
        }
        rf = requestAnimationFrame(raf);
        setRafState(rf)
        setLenis(scroller)

        return () => {
            if (lenisRef) {
                cancelAnimationFrame(rafState)
                lenisRef.destroy();
            }
        }
    }, [])

    return <section></section>;
}


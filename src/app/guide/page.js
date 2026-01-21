
'use client'
import React, { useState, useEffect } from 'react'

function Page() {


    const [text, setText] = useState("hello")

    const [background, setBackground] = useState("white")

    useEffect(
        () => {
            setBackground("red");
        }
        , [
            text
        ])

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-white'>
            {/* <h1>{text === true ? "This is true" :
                <div className='flex flex-col gap-[1rem]'>
                    <p>hello</p>
                    <p>hello</p>
                </div>
            } </h1> */}
            <p>{text}</p>
            {/* //this piece of text says that the background turns red */}
            <p>{background}</p>
            <button onClick={() => { setText("goodbye") }}>press me</button>
        </div>
    )
}

export default Page
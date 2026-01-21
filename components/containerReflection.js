import React from 'react'

function containerReflection({ reflections }) {
    return (
        <div>
            <div className="flex flex-col gap-[2rem] lg:gap-[3.25rem] w-full case-x-gutter">
                <div className='border-t border-secondary'></div>
                <div className="flex flex-col gap-[3rem] w-full">
                    <h2>Key Learnings</h2>
                    <div className="flex flex-col gap-[1.5rem]">
                        {reflections.map((item, key) => (
                            <div className='flex flex-row gap-[0.5rem]' key={key}>
                                <p>-</p>
                                <p >{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border-t border-secondary'></div>
            </div>
        </div >
    )
}

export default containerReflection
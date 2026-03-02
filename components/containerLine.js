import React from 'react'
import ContainerText from "../components/containerText"
import ContainerImage from './containerImage'

function containerLine({ title, body, img, alt, hint, subheader, gutter, imgHeight, img2, alt2, imgw, imgw2, imgobj, imgobj2, lazy, caption }) {
    return (
        <div className={`flex flex-col min-h-full justify-between flex-1 min-w-0 gap-[2rem] ${gutter}`}>
            {(title && body && subheader) &&
                <div className='w-full'>
                    <ContainerText title={title} body={body} subheader={subheader} />
                </div>
            }
            {img && (
                <div className="flex flex-col">
                    {img2 ?
                        <div className={`flex flex-row gap-2 w-full max-w-full ${imgHeight ?? "h-[40vh]"}`}>
                            <div className={`${imgw ?? "flex-1 min-w-0"} overflow-hidden h-full`}>
                                <ContainerImage img={img} alt={alt} gutter={''} imgHeight="h-full" object={imgobj} lazy={lazy} />
                            </div>
                            <div className={`${imgw2 ?? "flex-1 min-w-0"} overflow-hidden h-full`}>
                                <ContainerImage img={img2} alt={alt2} gutter={''} imgHeight="h-full" object={imgobj2} lazy={lazy} />
                            </div>
                        </div>
                        :
                        <div className={`w-full overflow-hidden`}>
                            <ContainerImage img={img} alt={alt} gutter={''} head="h-[35rem]" imgHeight={imgHeight} imgWidth={imgw} object={imgobj} lazy={lazy} />
                        </div>
                    }
                    {caption && (
                        <h6 className="text-center pt-4 text-text-secondary">{caption}</h6>
                    )}
                </div>
            )}
            {
                hint &&
                (<ContainerText title={null} body={hint} />)
            }
        </div >
    )
}

export default containerLine
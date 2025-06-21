/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import React, { HTMLAttributes, useRef, useState } from "react"
import { cn } from "@/utils/lib/cn"
import { Pause, Play } from "lucide-react"

type VideoElementProps = HTMLAttributes<HTMLDivElement> & {
    videoSrc : string,
}

export const VideoElement : React.FC<VideoElementProps> = ({className, videoSrc, ...props}) => {
    const type = getVideoType(videoSrc)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const videoHandle = () => {
        const video = videoRef.current

        if(!video) return
        if(video.paused){
            setIsPlaying(true)
            video.play()
        }else {
            setIsPlaying(false)
            video.pause()
        }

        
    }

    return (
        <div
            className={cn("relative", className)}
            {...props}
        >
            <video 
            ref={videoRef}
            className={cn("w-full h-52 object-fill", className)}
            preload="metadata">
                <source src={videoSrc} type={`video/${type}`}/>
                your brower does not support video 
            </video>
            <button onClick={videoHandle} className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[hsl(var(--tertiary))]/70 text-[hsl(var(--primary))] rounded-full size-10 items-center justify-center flex cursor-pointer">
                {!isPlaying ? <Play className="fill-[hsl(var(--primary))]"/> : <Pause className="fill-[hsl(var(--primary))]"/>} 
            </button>
        </div>
    )
}


const getVideoType = (url : string) => {
    const type = url.split(".").pop()
    switch (type) {
        case "mp4":
            return "mp4"
        case "webm":
            return "webm"
        case "ogg":
            return "ogg"
        case "mov" :
            return "mov"

        case "avi" :
            return "avi"
        default:
            return "mp4"
    }
}
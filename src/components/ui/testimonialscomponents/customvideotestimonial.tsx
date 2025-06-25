/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps } from "motion/react"
import { motion } from "motion/react"
import { useRef, useState } from "react"
import { Pause, Play, Star } from "lucide-react"
import React from "react"


type VideoTestimonialType = HTMLMotionProps<"div"> & {
    username : string,
    usercompany : string,
    videoSrc : any,
    stars :number,
    borderRadius ?: number,
    bgColor ?:string
}

export const VideoTestimonialOne : React.FC<VideoTestimonialType> = ({usercompany, bgColor, username, videoSrc , borderRadius, stars,className, ...props}) =>{
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
        <motion.div 
        // initial={false}
        // whileHover={{
        //     // y : -2,
        //     scale : 1.01,
        //     transition : {
        //         ease : "linear",
        //         duration : 0.1
        //     }
        // }}
        style={{
            borderRadius : borderRadius
        }}
        className={cn(" rounded-2xl  h-full  relative overflow-hidden" , className)} {...props}>
            <video 
            ref={videoRef}
            style={{
                borderRadius : borderRadius,
                objectFit : "cover"
            }}
            className={cn("w-full h-full")}
            preload="metadata">
                <source src={videoSrc} type={`video/${type}`}/>
                your brower does not support video 
            </video>
            <button onClick={videoHandle} className="absolute top-2 left-3 bg-[hsl(var(--tertiary))]/70 text-[hsl(var(--primary))] rounded-full size-6 items-center justify-center flex cursor-pointer">
                {!isPlaying ? <Play className="fill-[hsl(var(--primary))]" size={14}/> : <Pause className="fill-[hsl(var(--primary))]" size={14}/>} 
            </button>
            <div 
                style={bgColor ? {backgroundColor : bgColor} : {}}
                className="font-semibold text-center absolute w-full rounded-b-xl bottom-0 bg_card_gradient">
                <h1>{username}</h1>
                <p>{usercompany}</p>
                <div className="flex flex-row gap-1 justify-center">
                {
                    Array.from({length : 5}).map((s, k) => (
                    <Star key={k} size={15} className={cn("text-[hsl(var(--primary))]", stars > k ? "fill-[hsl(var(--primary))]" : "")}/>
                    ))
                }
                </div>
            </div>
        </motion.div>
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
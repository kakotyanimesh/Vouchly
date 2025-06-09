/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps } from "motion/react"
import { motion } from "motion/react"
import React from "react"
import Video from "next-video"
import Instaplay from 'player.style/instaplay/react';

type VideoTestimonialType = HTMLMotionProps<"div"> & {
    username : string,
    usercompany : string,
    videoSrc : any
}

export const VideoTestimonial : React.FC<VideoTestimonialType> = ({usercompany, username, videoSrc ,className, ...props}) =>{
    return (
        <motion.div 
        initial={false}
        whileHover={{
            y : -2,
            transition : {
                ease : "linear",
                duration : 0.4
            }
        }}
        className={cn("w-full h-full bg-gradient-to-bl from-[hsl(var(--primary))]/20 to-teal-500 rounded-md overflow-hidden" , className)} {...props}>
            <Video src={videoSrc} theme={Instaplay} controls className="rounded-md h-3/4 "/>
            <div className="font-semibold ">
                <h1>{username}</h1>
                <p>{usercompany}</p>
            </div>
        </motion.div>
    )
}
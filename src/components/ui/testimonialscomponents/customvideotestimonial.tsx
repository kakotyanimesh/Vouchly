/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps } from "motion/react"
import { motion } from "motion/react"
import React from "react"
import { VideoElement } from "../videoelememt"


type VideoTestimonialType = HTMLMotionProps<"div"> & {
    username : string,
    usercompany : string,
    videoSrc : any,
    stars ?:number
}

export const VideoTestimonialOne : React.FC<VideoTestimonialType> = ({usercompany, username, videoSrc ,className, ...props}) =>{
    return (
        <motion.div 
        initial={false}
        whileHover={{
            // y : -2,
            scale : 1.01,
            transition : {
                ease : "linear",
                duration : 0.1
            }
        }}
        className={cn(" rounded-md bg_card_gradient" , className)} {...props}>
            <VideoElement videoSrc={videoSrc} className="rounded-md"/> 
            <div className="font-semibold text-center ">
                <h1>{username}</h1>
                <p>{usercompany}</p>
            </div>
        </motion.div>
    )
}
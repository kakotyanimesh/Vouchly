"use client"

import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps, motion } from "motion/react"
import React, { useState } from "react"

type FeatureCardProps = HTMLMotionProps<"div"> & {
    icon : React.ReactElement,
    title : string,
    desc : string
}


export const FeatureCard : React.FC<FeatureCardProps> = ({className, icon, title, desc, ...props}) => {
    const [ishovered, setIshovered] = useState(false)
    const animte = {
        color : ishovered ? "#4ade80" : "#ffffff"
    }
    return (
        <motion.div 
            viewport={{once : true}}
            onHoverStart={() => setIshovered(true)}
            onTapStart={() => setIshovered(true)}
            className={cn("rounded-md group space-y-2 h-full bg-white/10 py-4 px-3 text-left hover:shadow-[inset_0px_0px_2px_0px_#48bb78] transition-all duration-200 ease-linear", className)} {...props}>
            <div
                className="bg-[hsl(var(--primary))]/20 rounded-full p-2 w-fit">
                {
                    React.cloneElement(icon, {...animte})
                }
            </div>
            <motion.h1
                animate={animte}
                transition={{duration : 0.3, ease : "easeInOut"}}
            >
                {title}
            </motion.h1>
            <p className="text-xs">{desc}</p>
        </motion.div>
    )
}
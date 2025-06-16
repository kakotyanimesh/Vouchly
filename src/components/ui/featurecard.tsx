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
        color : ishovered ? "#24D7C283" : "#ffffff"
    }
    return (
        <motion.div 
            viewport={{once : true}}
            whileHover={{y : -1}}
            onHoverStart={() => setIshovered(true)}
            onTapStart={() => setIshovered(true)}
            className={cn("rounded-md group space-y-2 h-full bg-[hsl(var(--pure-white))]/7 py-4 px-3 text-left hover:shadow-[2px_2px_2px_0px_#a62fd5] transition-all duration-200 ease-linear", className)} {...props}>
                {/* shadow-[5px_5px_0px_0px_rgba(109,40,217)] */}
            <div
                className=" bg_card_gradient rounded-full p-2 w-fit">
                {
                    React.cloneElement(icon)
                }
            </div>
            <h1 className="text-[#a62fd5]">
                {title}
            </h1>
            <motion.p
                animate={animte}
                transition={{duration : 0.3, ease : "easeInOut"}}
            className="text-xs">{desc}</motion.p>
        </motion.div>
    )
}
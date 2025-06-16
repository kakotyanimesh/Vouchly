"use client"

import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps, motion } from "motion/react"
import React from "react"


type glowingTypes = HTMLMotionProps<"div"> 


export const GlowingComponent : React.FC<glowingTypes> = ({className, ...props}) => {
    return (
        <motion.div className={cn("z-0 pointer-events-none absolute w-80 h-72 bg-gradient-to-r", className)} {...props}>

        </motion.div>
    )
}
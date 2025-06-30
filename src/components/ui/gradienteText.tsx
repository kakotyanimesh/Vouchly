"use client"
import { motion } from "motion/react"
import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps } from "motion/react"

type GradientTextType = HTMLMotionProps<"span">


export const GradientText  : React.FC<GradientTextType> = ({ className, ...props}) => {
    return (
        <motion.span className={cn("bg-gradient-to-r relative from-[hsl(var(--primary))] to-[hsl(var(--primary-light))] bg-clip-text text-transparent", className)} {...props}/>
    )
}
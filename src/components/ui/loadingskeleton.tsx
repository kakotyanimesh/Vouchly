"use client"

import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";

export const LoadingSkeleton : React.FC<HTMLMotionProps<"div">> = ({className, ...props}) => {
    return (
        <motion.div 
        className={cn("rounded-md bg_card_gradient h-10 w-96 animate-pulse", className)} {...props}>

        </motion.div>
    )
}
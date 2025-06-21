"use client"

import { cn } from "@/utils/lib/cn"
import { TextReviewProps } from "@/utils/types/user_types"
import { Star } from "lucide-react"
import { HTMLMotionProps } from "motion/react"
import { motion } from "motion/react"
import Image from "next/image"
import { GlowingComponent } from "../glowingdiv"
import { useState } from "react"

export type TextReviewTypes = HTMLMotionProps<"div"> & TextReviewProps

export const TextReviewOne : React.FC<TextReviewTypes> = ({textReview, className, imageSrc,customerCompany, customerName, stars, ...props}) => {
    const [isHoverStart, setisHoverStart] = useState(false)
    return (
        <motion.div 
        onHoverStart={() => setisHoverStart(true)}
        // onHoverEnd={() => setisHoverStart(false)}
        initial={false}
        whileHover={{
            scale : 1.01,
            // y : -2,
            transition : {
                ease : "linear",
                duration : 0.1
            }
        }}
        className={cn("rounded-md group bg-[hsl(var(--secondary))] w-fit py-4 px-3 text-left space-y-3", className)} {...props}>
            <div className="flex flex-row gap-1">
                {
                Array.from({length : 5}).map((s, k) => (
                    <Star key={k} size={15} className={cn("text-[hsl(var(--primary))]", stars > k ? "fill-[hsl(var(--primary))]" : "")}/>
                ))
                }
            </div>
            <h1 className="text-sm break-all">{textReview}</h1>
            <div className="flex flex-row items-center gap-3">
                <Image src={imageSrc} alt="User image" width={30} height={30} className="rounded-full"/>
                <div className="text-xs relative">
                    <h1>{customerName}</h1>
                    <p>{customerCompany}</p>
                    {isHoverStart && <GlowingComponent 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay : 0.4, ease: "easeOut" }}
                        className="bg-gradient-to-r from-[hsl(var(--primary))] w-20 rounded-4xl h-[2px] to-transparent"/>}
                </div>
            </div>
        </motion.div>
    )
}
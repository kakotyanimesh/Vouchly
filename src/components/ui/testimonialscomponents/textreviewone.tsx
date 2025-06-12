"use client"

import { cn } from "@/utils/lib/cn"
import { TextReviewProps } from "@/utils/types/user_types"
import { Star } from "lucide-react"
import { HTMLMotionProps } from "motion/react"
import { motion } from "motion/react"
import Image from "next/image"

export type TextReviewTypes = HTMLMotionProps<"div"> & TextReviewProps

export const TextReviewOne : React.FC<TextReviewTypes> = ({textReview, className, imageSrc,userCompany, username, starts, ...props}) => {
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
        className={cn("rounded-md group bg-[hsl(var(--pure-white))]/10 w-fit py-4 px-3 text-left space-y-3", className)} {...props}>
            <div className="flex flex-row gap-1">
                {
                Array.from({length : 5}).map((s, k) => (
                    <Star key={k} size={15} className={cn("text-[hsl(var(--primary))]", starts > k ? "fill-[hsl(var(--primary))]" : "")}/>
                ))
                }
            </div>
            <h1 className="group-hover:text-[hsl(var(--primary))] transition-colors ease-linear duration-200 text-sm">{textReview}</h1>
            <div className="flex flex-row items-center gap-3">
                <Image src={imageSrc} alt="User image" width={30} height={30} className="rounded-full"/>
                <div className="text-xs">
                    <h1>{username}</h1>
                    <p>{userCompany}</p>
                </div>
            </div>
        </motion.div>
    )
}
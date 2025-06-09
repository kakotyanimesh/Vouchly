"use client"
import { HTMLMotionProps } from "motion/react"
import React from "react"
import { motion } from "motion/react"
import { Check } from "lucide-react"
import { cn } from "@/utils/lib/cn"
import { Button } from "./button"

type PricingProps = HTMLMotionProps<"div"> & {
    title : "Free" | "Professional" | "Enterprice",
    price : number,
    desc : string,
    features : string[]
}

export const PricingCard : React.FC<PricingProps> = ({className, title, price, desc, features, ...props}) => {
    return (
        <motion.div 
        initial={false}
        whileHover={{
            scale : 1.02,
            // backgroundColor : "black"
        }}
        transition={{
            ease : 'linear',
            duration : 0.3,
            // delay : 0.1
        }}
        className={cn("space-y-3 group relative hover:bg-black active:bg-black transition-colors ease-linear duration-200 rounded-md border bg-white/10 text-left p-4", title === "Professional" ? "border-[hsl(var(--primary))]/80" : "border-slate-100/10", className)} {...props}>
            { 
                title === "Professional" && <h1 className="absolute -top-3 left-1/2 bg-[hsl(var(--primary))] text-black text-sm px-2 py-0.5 rounded-md">Most Popular</h1>
            }
            <h1 className={cn("text-2xl font-bold", title === "Professional" ? "bg-gradient-to-br from-[hsl(var(--primary))] to-teal-500 bg-clip-text text-transparent" : "text-white")}>{title}</h1>
            <h1 className="text-sm text-slate-500"><span className="text-2xl text-[hsl(var(--primary))]">{price}</span>/month</h1>
            <p className="text-sm">{desc}</p>
            <div>
                {
                    features.map((f, k) => (
                        <h1 className="flex flex-row items-center gap-2 text-sm" key={k}><Check className="bg-[hsl(var(--primary))] rounded-full text-black" size={12}/> {f}</h1>
                    ))
                }
            </div>
            <Button className={cn("w-full mt-3 transition-colors ease-linear duration-200", title !== "Professional" ? "group-hover:bg-[hsl(var(--primary))]/20 group-active:bg-[hsl(var(--primary))]/20" : undefined)} variant={title === "Professional" ? "primary" : "transparent"}>Get Started</Button>
        </motion.div>
    )
}
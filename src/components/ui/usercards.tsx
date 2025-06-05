"use client"
import React, { ReactNode } from "react";
import { cn } from "@/utils/lib/cn";
import { HTMLMotionProps, motion } from "motion/react";

type UIcardProps = HTMLMotionProps<"div"> & {
    icon : ReactNode,
    title : string,
    iconStyle : string,
    parentColor : string
}

export const Usercards : React.FC<UIcardProps> = ({className, iconStyle, parentColor, icon, title, ...props}) => {
    return (
        <motion.div 
        initial={false}
        whileHover={{
            scale : 1.01,
            transition : {
                ease : "linear",
                // duration : 0.1,
                // delay : 0.1
            }
        }}
        whileTap={{
            scale : 1.02,
            // boxShadow : "0px 2px 4px 0px rgba(55,174,105,0.5)",
            transition : {
                ease : "linear",
                // duration : 0.1,
                // delay : 0.3
            }
        }}
        className={cn("cursor-pointer transition-colors ease-linear duration-75 rounded-2xl backdrop-blur-xl  w-full flex md:flex-row flex-col items-center md:px-7  md:gap-2 gap-1 py-5", className, parentColor)} {...props}>
                <span className={`${iconStyle} rounded-xl p-2 `}>{icon}</span>
                <h1 className="text-sm">{title}</h1>
        </motion.div>
    )
}
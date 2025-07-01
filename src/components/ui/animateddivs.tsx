"use client"
import { cn } from "@/utils/lib/cn"
import { HTMLMotionProps, motion } from "motion/react"
import React from "react"

// export const Blurdiv = () => {
//     return (
//         <div>
//             {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div> */}
      
//         <div className="absolute right-10 size-46 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
//         <div className="absolute justify-self-center w-80 h-30 bg-gradient-to-r from-purple-500/15 to-violet-500/15 rounded-full blur-3xl"></div>
//       {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/5 to-orange-400/5 rounded-full blur-3xl"></div> */}
      
//       {/* <div className="absolute inset-0 bg-gradient-to-t from-teal-900/10 via-transparent to-purple-900/10"></div>
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-800/5 to-transparent"></div> */}
//         </div>
//     )
// }

type BlurdivProps = HTMLMotionProps<"div">

export const BlurdivPrimary : React.FC<BlurdivProps> = ({className, ...props}) => {
    return (
        <motion.div

            className={cn("absolute bg-gradient-to-r from-teal-400/20 to-emerald-400/20", className)}

            {...props}
        >

        </motion.div>
    )
}

export const BlurdivTertiary : React.FC<BlurdivProps> = ({className, ...props}) => {
    return (
        <motion.div
            className={cn("absolute size-24 bg-gradient-to-r from-purple-500 to-violet-500", className)}
            {...props}
        >

        </motion.div>
    )
}
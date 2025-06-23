"use client"

import { cn } from "@/utils/lib/cn"
import { OrderedReviewTypes } from "@/utils/types/user_types"
import { useReviewStore } from "@/utils/zustand/gridState"
import { HTMLMotionProps, motion } from "motion/react"

type inputType = HTMLMotionProps<"input"> & {
    data : OrderedReviewTypes
}

export const CheckBox : React.FC<inputType> = ({className, data, ...props}) => {
    const { setTextReview, setVideoReview, } = useReviewStore()
    // useEffect(() => {
      
    //     console.log(videoReviewState);
    //     console.log(textReviewState);
        
        
    // }, [videoReviewState, textReviewState])
    
    return (           
        <motion.input 
            initial={{
            scale : 1
            }}
            whileTap={{
                scale : 1.5,
                transition : {
                    ease : "linear"
                }   
            }}
            onChange={() => {
                if(data.type === "text"){
                    setTextReview(data.data)
                } else if(data.type === "video"){
                    setVideoReview(data.data)
                }
            }}
            type="checkbox" 
            className={cn("appearance-none hover:shadow-[1px_0px_28px_0px_#f687b3] size-4 border-2 cursor-pointer border-[hsl(var(--tertiary))] rounded-md bg-white/20 checked:bg-[hsl(var(--tertiary))]/70 checked:shadow-2xl checked:shadow-amber-700", className)}
            {...props}
            />
    )
}
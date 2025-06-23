"use client"
import { useRenderReview } from "@/hooks/useReviewRenderer"
import { cn } from "@/utils/lib/cn"
import { useReviewStore } from "@/utils/zustand/gridState"
import { motion } from "motion/react"

export const MassonaryGridComponent = () => {
    const orderedReviews = useReviewStore(state => state.orderedReviews)

    const {renderReview} = useRenderReview()
    return (
        <motion.div 
            animate={{
                y : [0, -100]
            }}
            transition={{
                repeat : Infinity,
                repeatType : "loop",
                ease : "linear",
                duration : 20
            }}
            className="columns-3 gap-1 space-y-1 px-10">
            {
                orderedReviews.map((rv, k) => (
                    renderReview({
                        review : rv, 
                        index : k,
                        className : cn("w-full max-h-[200px]", k % 2 === 0 ? "aspect-3/2" : "aspect-square")
                    })
                ))
            }
        </motion.div>
    )
}
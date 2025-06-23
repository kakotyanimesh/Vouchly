"use client"
import { motion, MotionProps, useAnimationControls, useMotionValue } from "motion/react"
import { OrderedReview, useReviewStore } from "@/utils/zustand/gridState"
import { useEffect, useState } from "react"
import { useRenderReview } from "@/hooks/useReviewRenderer"

export const CorosoulGrid = () => {
    const orderedReviews  = useReviewStore(state => state.orderedReviews)
    const [ishoverd, setIshoverd] = useState<boolean>(false)
    const { renderReview } = useRenderReview()

    const newReviews : OrderedReview[] = [...orderedReviews, ...orderedReviews, ...orderedReviews]

    const controls = useAnimationControls()
    const xValue = useMotionValue(0)

    const totalLength = 328 * orderedReviews.length


    useEffect(() => {
        if(!ishoverd){
            controls.start({
                x : -totalLength,
                transition : {
                    ease : "linear",
                    duration : 40,
                    repeat : Infinity,
                    repeatType : "loop"
                }
            })
        } else {
            controls.stop()
        }
    }, [controls, ishoverd, orderedReviews.length, totalLength])

    

    return (
        <motion.div 
            onHoverStart={() => setIshoverd(true)}
            onHoverEnd={() => setIshoverd(false)}
            animate={controls}
            style={{x : xValue}}
            className="flex flex-row gap-2 w-full justify-center items-center">
            {
                newReviews.map((rev, k) => (
                    renderReview({
                            review : rev, 
                            index : k,
                            className : "h-[200px] w-[320px] flex-shrink-0",
                            motionProps : hoverAnimation
                        })
                ))
            }
        </motion.div>
    )
}

export const hoverAnimation : MotionProps = {
        initial : false,
        whileHover : {
            scale : 1.04,
            rotate : 2,
            boxShadow: "0px 0px 6px 2px #d53f8c"
        },
        transition : {
            ease: "easeOut",
            duration: 0.5
        }

}
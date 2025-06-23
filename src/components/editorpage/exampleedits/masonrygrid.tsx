"use client"
import { useRenderReview } from "@/hooks/useReviewRenderer"
import { OrderedReview, useReviewStore } from "@/utils/zustand/gridState"
import { motion, useAnimationControls, useMotionValue } from "motion/react"
import { useEffect, useState } from "react"

export const MassonaryGridComponent = () => {
    const orderedReviews = useReviewStore(state => state.orderedReviews)    


    const firstArray = orderedReviews.slice(0, orderedReviews.length / 2 )
    const totalFirstArray = [...firstArray, ...firstArray, ...firstArray, ...firstArray]
    const secondArray = orderedReviews.slice(orderedReviews.length / 2, orderedReviews.length)
    const totalSecondArry = [...secondArray, ...secondArray, ...secondArray, ...secondArray]
    

    return (
        <motion.div
            className="flex flex-col gap-1 space-y-1 px-10 bg-red-700">
                <SingleCorosoul review={totalFirstArray} totalLength={- 348 * totalFirstArray.length}/>
                <SingleCorosoul review={totalSecondArry} totalLength={348 * totalSecondArry.length}/>
        </motion.div>
    )
}


export const SingleCorosoul = ({review, totalLength } : {review : OrderedReview[], totalLength : number}) => {
    const [ishoverd, setIshoverd] = useState(false)
    const {renderReview} = useRenderReview()

    const animationControls = useAnimationControls()
    const xValue = useMotionValue(0)
    useEffect(() => {
      if(!ishoverd){
        animationControls.start({
            x : totalLength,
            transition : {
                    repeat : Infinity,
                    repeatType : "loop",
                    duration : 200
                }
        })
      } else {
        animationControls.stop()
      }

    }, [ishoverd, animationControls, totalLength])
    

    return (
        <motion.div
            onHoverStart={() => setIshoverd(true)}
            onHoverEnd={() => setIshoverd(false)}
            animate={animationControls}
            style={{x : xValue}}
            className="flex flex-row gap-2 w-full relative"
        >
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/90 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/90 to-transparent z-10" />

            {
                review.map((rev, k) => (
                    renderReview({
                        review : rev,
                        index : k,
                        className : "h-[180px] w-[340px] flex-shrink-0",
                        motionProps : hoverMotion(k)
                    })
                ))
            }
        </motion.div>
    )
}

const hoverMotion = (k : number) => {
        return {
            initial : false,
            whileHover : {
                scale : 1.04,
                rotate : k  % 2 === 0 ? 2 : -2,
                boxShadow: "0px 0px 8px 2px #d53f8c"
            },
            transition : {
                ease: "easeOut",
                duration: 0.5
            }
        }
}
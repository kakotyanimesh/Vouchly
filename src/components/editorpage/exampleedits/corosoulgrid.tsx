// "use client"
// import { motion, useAnimationControls } from "motion/react"
// import { OrderedReview, ReviewStyleType } from "@/utils/zustand/gridState"
// import { useEffect, useState } from "react"
// import { useRenderReview } from "@/hooks/useReviewRenderer"
// import { HoverAnimation } from "./masonrygrid"

// export const getWidth = ({gap}: {gap : number}) => {
//     if(typeof window !== "undefined"){
//         if(window.innerWidth >= 1280) return 230 + gap
//         if(window.innerWidth >= 768) return 280 + gap
//     }  
//     return 320 + gap
// }

// type CorosoulGridTypes = {
//     orderedReviews : OrderedReview[], 
//     reviewStyles : Omit<ReviewStyleType, "parentBgColor">, 
//     direction : "left" | "right"
// }
// export const CorosoulGrid = ({orderedReviews, reviewStyles, direction} : CorosoulGridTypes) => {
//     const [ishoverd, setIshoverd] = useState<boolean>(false)
//     const { renderReview } = useRenderReview()
//     const [totalLength, setTotalLength] = useState<number>(0)
// // 
    
//     // const {rewiewCardBg, textColor, meteorColor, starColor, roundedCorner} = useReviewStyle()
//     const {shadowColor}  = reviewStyles

//     const newReviews : OrderedReview[] = [...orderedReviews, ...orderedReviews, ...orderedReviews]

//     const controls = useAnimationControls()

    

//     useEffect(() => {
//       const lengthOfAnimation = () => {
//         setTotalLength(getWidth({gap : 4}) * orderedReviews.length)
//       }
//       lengthOfAnimation()
//       window.addEventListener("resize", lengthOfAnimation)
//       return () => window.removeEventListener("resize", lengthOfAnimation)
//     }, [orderedReviews.length])
    

//     useEffect(() => {
//         controls.set({x : direction === "left" ? 0 : -totalLength})
    
//     }, [controls, totalLength, direction])
    


//     useEffect(() => {
//         if(!ishoverd){

//             controls.start({ 
//                 x : direction === "left" ? -totalLength : 0,
//                 transition : {
//                     ease : "linear",
//                     duration : Math.abs(totalLength/ 50),
//                     repeat : Infinity,
//                     repeatType : "loop"
//                 }
//             })
//         } else {
//             controls.stop()
//         }
//     }, [controls, ishoverd, orderedReviews.length, totalLength, direction])

    

//     return (
//         <motion.div 
//             initial={false}
//             // onTap={() => setIshoverd(!ishoverd)}
//             // onTapCancel={() => alert("amoe")}
//             onHoverStart={() => setIshoverd(true)}
//             onHoverEnd={() => setIshoverd(false)}
//             animate={controls}
//             className="flex flex-row gap-1 w-full justify-center items-center">
//             {
//                 newReviews.map((rev, k) => (
//                     renderReview({
//                             reviewStyles,
//                             review : rev, 
//                             index : k,
//                             className : "h-[290px] pb-2 xl:w-[320px] w-[280px] flex-shrink-0",
//                             motionProps : HoverAnimation({k, shadowColor})
//                         })
//                 ))
//             }
//         </motion.div>
//     )
// }

// // export const CorosoulHoverAnimation = () => {
// //     const shadow = useReviewStyle(state => state.shadowColor)
// //     return {
// //         initial : false,
// //         whileHover : {
// //             scale : 1.04,
// //             rotate : 2,
// //             boxShadow: `0px 0px 6px 2px ${shadow}`
// //         },
// //         transition : {
// //             ease: "easeOut",
// //             duration: 0.5
// //         }

// // }
// // }
"use client"
import { useRenderReview } from "@/hooks/useReviewRenderer"
import { OrderedReview, ReviewStyleType, useGridStore } from "@/utils/zustand/gridState"
import { HoverAnimation } from "./masonrygrid"

export const ClassicGridComponent = ({orderedReviews, reviewStyles} : {orderedReviews : OrderedReview[], reviewStyles : Omit<ReviewStyleType, "parentBgColor">}) => {
    const gridWidth = useGridStore(state => state.gridWidth)

    const { renderReview } = useRenderReview()

    const {rewiewCardBg, textColor, meteorColor, starColor, roundedCorner, shadowColor} = reviewStyles
    
    return (
        <div className={`grid grid-cols-3 gap-1 px-2`} style={{width : `${gridWidth}vw`}}>
            {orderedReviews.map((rv, k) => (
                renderReview({
                    review : rv, 
                    reviewStyles : {
                        rewiewCardBg,
                        textColor,
                        meteorColor,
                        starColor,
                        roundedCorner
                    },
                    className : "w-full",
                    index : k, 
                    motionProps : HoverAnimation({k, shadowColor})    
                })
            ))}
        </div>
    )
}





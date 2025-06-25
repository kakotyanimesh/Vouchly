"use client"
import { useRenderReview } from "@/hooks/useReviewRenderer"
import { useGridStore, useReviewStore } from "@/utils/zustand/gridState"
import { HoverAnimation } from "./masonrygrid"

export const ClassicGridComponent = () => {
    const orderedReviews  = useReviewStore(state => state.orderedReviews)
    const gridWidth = useGridStore(state => state.gridWidth)

    const { renderReview } = useRenderReview()
    
    return (
        <div className={`grid grid-cols-2 gap-1 px-2`} style={{width : `${gridWidth}vw`}}>
            {orderedReviews.map((rv, k) => (
                renderReview({
                    review : rv, 
                    index : k, 
                    motionProps : HoverAnimation(k)    
                })
            ))}
        </div>
    )
}





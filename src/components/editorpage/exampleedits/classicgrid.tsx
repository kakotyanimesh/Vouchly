"use client"
import { useRenderReview } from "@/hooks/useReviewRenderer"
import { useGridStore, useReviewStore } from "@/utils/zustand/gridState"

export const ClassicGridComponent = () => {
    const orderedReviews  = useReviewStore(state => state.orderedReviews)
    const gridWidth = useGridStore(state => state.gridWidth)

    const { renderReview } = useRenderReview()

    
    return (
        <div className={`grid grid-cols-2 gap-2`} style={{ width: `${gridWidth}vw` }}>
            {orderedReviews.map((rv, k) => (
                renderReview({
                    review : rv, 
                    index : k, 
                    motionProps : {
                        initial : false,
                        whileHover : {
                            scale : 1.04,
                            rotate : k  % 2 === 0 ? 2 : -2,
                            boxShadow: "0px 0px 6px 2px #d53f8c"
                        },
                        transition : {
                            ease: "easeOut",
                            duration: 0.5
                        }
                }})
            ))}
        </div>
    )
}


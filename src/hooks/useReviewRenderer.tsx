import { VideoTestimonialOne } from "@/components/ui/testimonialscomponents/customvideotestimonial"
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone"
import { TextReviewProps, VideoReviewProps } from "@/utils/types/user_types"
import { OrderedReview, ReviewStyleType } from "@/utils/zustand/gridState"
import { MotionProps } from "motion/react"

interface RenderReviewProps {
    review : OrderedReview,
    index : number,
    className ?: string,
    motionProps ?: MotionProps
    reviewStyles : Omit<ReviewStyleType, "parentBgColor"| "shadowColor">
}

export const useRenderReview = () => {
    const renderReview = ({review, index, className, motionProps, reviewStyles} : RenderReviewProps) => {
        const {rewiewCardBg, textColor, meteorColor, starColor, roundedCorner} = reviewStyles
        if(review.type === "text"){
            const data = review.data as TextReviewProps
            return (
                <TextReviewOne
                    style={{
                        backgroundColor : rewiewCardBg,
                        color : textColor,
                        borderRadius : `${roundedCorner}px`
                    }}
                    
                    starColor={starColor}
                    meteorColor={meteorColor}
                    {...motionProps}
                    className={className}
                    customerName={data.customerName}
                    customerCompany={data.customerCompany}
                    textReview={data.textReview}
                    imageSrc={data.imageSrc}
                    stars={data.stars}
                    textreviewid={data.textreviewid}
                    key={index}/>
            )
        } else if(review.type === "video"){
            const data = review.data as VideoReviewProps

            return (
                <VideoTestimonialOne
                    {...motionProps}
                    style={{
                        color : textColor,
                        borderRadius : `${roundedCorner}px`,
                        
                    }}
                    starColor={starColor}
                    bgColor= {rewiewCardBg}
                    borderRadius={roundedCorner}
                    className={className}
                    videoSrc={data.videoLink}
                    stars={data.stars}
                    usercompany={data.customerCompany}
                    username={data.customerName}
                    key={index}/>
            )
        }
        return null

    }
    return { renderReview }
}
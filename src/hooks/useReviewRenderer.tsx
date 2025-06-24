import { VideoTestimonialOne } from "@/components/ui/testimonialscomponents/customvideotestimonial"
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone"
import { TextReviewProps, VideoReviewProps } from "@/utils/types/user_types"
import { OrderedReview, useReviewStyle } from "@/utils/zustand/gridState"
import { MotionProps } from "motion/react"

interface RenderReviewProps {
    review : OrderedReview,
    index : number,
    className ?: string,
    motionProps ?: MotionProps
}

export const useRenderReview = () => {
    const {bgColor, textColor, meteorColor, roundedCorner} = useReviewStyle()
    const renderReview = ({review, index, className, motionProps} : RenderReviewProps) => {
        if(review.type === "text"){
            const data = review.data as TextReviewProps
            return (
                <TextReviewOne
                    style={{
                        backgroundColor : bgColor,
                        color : textColor,
                        borderRadius : roundedCorner
                    }}
                    starColor={meteorColor}
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
                        borderRadius : roundedCorner
                    }}
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
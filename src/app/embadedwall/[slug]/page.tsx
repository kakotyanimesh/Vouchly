import { getReviews } from "@/app/action/client_action/user";
import { VideoTestimonialOne } from "@/components/ui/testimonialscomponents/customvideotestimonial";
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone";
import { OrderedReviewTypes } from "@/utils/types/user_types";

export default async function FetchWidgetPage({params} : {params : Promise<{slug : string}>}){
    const embadedId =  (await params).slug

    const data = await getReviews({embadedId : embadedId})
    
    if(!data.orderedReviews){
        return <h1>You don&apos;t have any reviews yet</h1>
    }


    const reviews : OrderedReviewTypes[] = data.orderedReviews
    
    
    return (
        <div className="grid grid-cols-3">
            {
                reviews.map((rv,k) => {
                    if(rv.type === "text"){
                        return (
                            <TextReviewOne
                                textreviewid={rv.data.textreviewid}
                                key={k}
                                customerName={rv.data.customerName}
                                customerCompany={rv.data.customerCompany}
                                textReview={rv.data.textReview}
                                stars={rv.data.stars}
                                imageSrc={rv.data.imageSrc}/>
                        )
                    } else if (rv.type === "video") {
                        return (
                            <VideoTestimonialOne
                                stars={rv.data.stars}
                                key={k}
                                username={rv.data.customerName}
                                usercompany={rv.data.customerCompany}
                                videoSrc={rv.data.videoLink}
                                />

                        )
                    }
                })
            }
        </div>
    )
}
import { fetchedReviews } from "@/app/action/server_action/user";
import { Card } from "@/components/ui/card";
import { VideoTestimonialOne } from "@/components/ui/testimonialscomponents/customvideotestimonial";
import { TextReviewOne } from "@/components/ui/testimonialscomponents/textreviewone";
import { getUserSession } from "@/utils/lib/user_session";

export default async function ReviewsPage({params}: {params : Promise<{formId : number}>}) {
    const formId = (await params).formId
    const adminId = parseInt((await getUserSession()).id)

    const reviewData = await fetchedReviews({formId, adminId})

    
    
    
    return (
        <Card className="flex-1 border-[hsl(var(--primary))]/20 h-[calc(100vh-11rem)]">
            {
                !reviewData.orderedReviews?.length ?
                <h1>You dont have any reviews yet</h1>
                :
                <div className="grid grid-cols-3 gap-2 p-3 h-full overflow-y-auto scroll-smooth scrollbar scrollbar-thumb-[hsl(var(--tertiary))] scrollbar-w-0.7 ">
                    {
                        reviewData.orderedReviews.map((rv, k) => {
                            if(rv.type === "text"){
                                return (
                                    <TextReviewOne  
                                        customerName={rv.data.customerName}
                                        customerCompany={rv.data.customerCompany}
                                        textReview={rv.data.textReview}
                                        imageSrc={rv.data.imageSrc}
                                        stars={rv.data.stars}  
                                        key={k}/>
                                )
                            } else if(rv.type === "video"){
                                return (
                                    <VideoTestimonialOne 
                                        videoSrc={rv.data.videoLink}
                                        usercompany={rv.data.customerCompany}
                                        username={rv.data.customerName}
                                        key={k}/>
                                )
                            }
                        })
                    }
                </div>
            }
        </Card>
    )
}
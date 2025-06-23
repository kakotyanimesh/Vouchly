import prisma from "@/utils/lib/prisma";
import { OrderedReviewTypes } from "@/utils/types/user_types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params} : {params : Promise<{slug : string}>}) {
    try {
        const widgetId = (await params).slug
        

        const res = await prisma.embadedWall.findUnique({
            where : {
                id : widgetId
            }, select : {
                selectedReviews : true
            }
        })

        if(!res?.selectedReviews){
            return NextResponse.json(
                {msg : "You don't have any embaded wall with this id Try another"},
                {status : 401}
            )
        }

        const ids = res.selectedReviews

        const reviews = await prisma.customerReview.findMany({
            where : {
                id : {in : ids}
            }, include : {
                textReview : {
                    select : {
                        textReview : true
                    }
                }, 
                videoReview : {
                    select : {
                        videoLink : true
                    }
                }
            }, omit : {
                testimonialFormsId : true,
                spaceId : true,
                adminId : true,
                createdAt : true
            }
        })


        const reviewWithOrder : OrderedReviewTypes[] = ids.map(id => {
            const rvs = reviews.find(rv => rv.id === id)
            if(!rvs) return undefined

            if(rvs.textReview){
                return {
                    id,
                    type : "text",
                    data : {
                        textreviewid : rvs.id,
                        customerName : rvs.customerName,
                        customerCompany : rvs.customerCompany,
                        imageSrc : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rvs.customerImageUrl}`,
                        stars : rvs.stars,
                        textReview : rvs.textReview.textReview
                    }
                } satisfies OrderedReviewTypes
            }

            if(rvs.videoReview){
                return {
                    id,
                    type : "video",
                    data : {
                        videoReviewid : rvs.id,
                        customerName : rvs.customerName,
                        customerCompany : rvs.customerCompany,
                        videoLink : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rvs.videoReview.videoLink}`,
                        stars : rvs.stars
                    }
                } satisfies OrderedReviewTypes
            }
            return undefined
            // this is for wheen no reviews retun and map won't break
        }).filter(Boolean) as OrderedReviewTypes[]

        return NextResponse.json(
            {msg : "Fetched Reviews successfully", reviewWithOrder},
            {status : 200}
        )
        
    } catch (error) {
        // console.log(error);
        
        return NextResponse.json(
            process.env.NODE_ENV === "development" 
            ? {msg : "DB down", errors : error}
            : {msg : "Something really bad happen In server side "},
            {status : 500}
        )
    }
}


// const textTestimonialsArray : TextReviewPropsWallOfLove[] = []
        // const videoTestimonialArray : VideoReviewPropsWallOflove[] = []

        // for (const rvs of reviews) {
        //     if(rvs.textReview){
        //         textTestimonialsArray.push({
        //             customerCompany : rvs.customerCompany,
        //             customerName : rvs.customerName,
        //             imageSrc : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rvs.customerImageUrl}`,
        //             textReview : rvs.textReview.textReview,
        //             stars : rvs.stars,
        //             id : rvs.id
        //         })
        //     } else if(rvs.videoReview){
        //         videoTestimonialArray.push({
        //             id : rvs.id,
        //             customerCompany : rvs.customerCompany,
        //             customerName : rvs.customerName,
        //             videoLink : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rvs.videoReview.videoLink}`,
        //             stars : rvs.stars
        //         })
        //     }
        // }
        // return NextResponse.json(
        //     {videoTestimonialArray, textTestimonialsArray},
        //     {status : 200}
        // )
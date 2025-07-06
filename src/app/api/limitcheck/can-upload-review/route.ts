import { checkPlan } from "@/utils/lib/checkplan";
import { ExceedLimitError } from "@/utils/lib/errorclass";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const { searchParams } = new URL(req.url)
    const adminId = searchParams.get("adminId")
    
    const reviewType = searchParams.get("reviewType")
    
    if(!adminId || isNaN(Number(adminId)) || !reviewType){
        return NextResponse.json(
            {msg : "No adminId provided, You are not allowed"},
            {status : 403}
        )
    }

    try {
        const userdata = await prisma.user.findUnique({
            where : {
                id : Number(adminId)
            }, select : {
                subscription : {
                    where : {
                        Active : "ACTIVE"
                    },
                    orderBy : {
                        createdAt : "desc"
                    },
                    take : 1,
                    select : {
                        subscriptionName : true,
                        subscriptionData : {
                            select : {
                                maxReview : true,
                                maxVideoReview : true
                            }
                        }
                    }
                },_count : {
                    select : {
                        customerReview : true
                    }
                }
            }
        })

        if(!userdata){
            return NextResponse.json(
                {msg : "NO user found"},
                {status : 409}
            )
        }

        const totalVideoTestimonial = await prisma.customerReview.count({
            where : {
                adminId : Number(adminId),
                videoReview : {
                    isNot : null
                }
            }
        })

        
        
        const totalReviews = userdata._count.customerReview
        const limit = Number(userdata.subscription[0].subscriptionData.maxReview)
        const maxVideoLimit = Number(userdata.subscription[0].subscriptionData.maxVideoReview)

        // console.log({type : typeof(maxVideoLimit)}, "max video");
        // console.log({type : typeof(limit)}, "limt");
        
        

        // if(limit !== -1 && (totalReviews >= limit || totalVideoTestimonial >= maxVideoLimit)){
        //     throw new ExceedLimitError(`This form is not able to received any more reviews as it exceed the limit, contact your provider for more details`)
        // }

        /**
         * logic 
         * user can upload vidoes but it has limit 
         * user can upload text unitl unless it exceed the total review limit
         */

        if(checkPlan({planName : userdata.subscription[0].subscriptionName})){
            if(totalReviews >= limit){
                throw new ExceedLimitError(`This form is not able to received any more reviews as it exceed the limit, contact your provider for more details`)
            }
            if(reviewType === "video"){
                if(totalVideoTestimonial >=maxVideoLimit){
                    throw new ExceedLimitError(`This form is not able to received any more video reviews as it exceed the limit, contact your provider for more details`)
                }
            }
        }
        
        return NextResponse.json(
            {msg : "You are good do anything you want"},
            {status: 200}
        )
    } catch (error) {
        if(error instanceof ExceedLimitError){
            return NextResponse.json(
                {msg : error.message},
                {status : 409}
            )
        }
        return NextResponse.json(
            {msg : `something went wrong`}
        )
    }
}



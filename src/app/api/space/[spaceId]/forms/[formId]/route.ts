import { reviewObject } from "@/utils/config/review.config";
import prisma from "@/utils/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";

export async function POST(req:NextRequest, {params} : {params : Promise<{spaceId : string, formId : string}>}) {
    try {
        const { spaceId, formId } = await params

        if(!spaceId && !formId){
            return NextResponse.json(
                {msg : "No spaceId or no form Id"},
                {status : 409}
            )
        }

        const parsedObject = reviewObject.safeParse(await req.json())

        if(!parsedObject.success){
            throw error
        }

        const { customerName, adminId, jobTitle, customerCompany, customerEmail, customerImageUrl, videoLink, textReview, stars} = parsedObject.data

        await prisma.$transaction(async(ts) => {
            const customerReview = await ts.customerReview.create({
                data : {
                    adminId : Number(adminId),
                    spaceId : Number(spaceId),
                    testimonialFormsId : Number(formId),
                    customerCompany,
                    customerEmail,
                    customerName,
                    customerImageUrl,
                    stars,
                    jobTitle
                }, select : {
                    id : true
                }
            })

            if(videoLink && textReview){
                return NextResponse.json(
                    {msg : "Cannot provide both text review and video review"},
                    {status : 400}
                )
            }

            if(textReview){
                await ts.textReview.create({
                    data : {
                        customerReviewId : customerReview.id,
                        textReview
                    }
                })
            } else if(videoLink){
                await ts.vidoeReview.create({
                    data : {
                        customerReviewId : customerReview.id,
                        videoLink
                    }
                })
            }
        })

        return NextResponse.json(
            {msg : "Review submitted successfully"},
            {status : 200}
        )

    } catch (error) {
        console.log(JSON.stringify(error));
        
        // we need to work on our error handlers
        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Invalid Input fields"},
                {status : 409}
            )
        }
        return NextResponse.json(
            {msg : "Something went wrong while submitting reviews please try again later", error},
            {status : 500}
        )
    }
}
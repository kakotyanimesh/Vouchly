import { reviewObject } from "@/utils/config/review.config";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";

export async function POST(req: NextRequest) {
    try {
        const parsedObject = reviewObject.safeParse(await req.json())

        if(!parsedObject.success){
            return NextResponse.json(
                {msg : `zod error ${JSON.stringify(parsedObject.error.errors)}`},
                {status : 400}
            )
        }

        const { customerName, adminId, jobTitle,spaceId, formId, customerCompany, customerEmail, customerImageUrl, videoLink, textReview, stars} = parsedObject.data

        if(videoLink && textReview){
            return NextResponse.json(
                {msg : "You cant send both text and video submissions"},
                {status : 400}
            )
        }

        await prisma.$transaction(async(ts) => {
            const customerReviewId = await ts.customerReview.create({
                data : {
                    customerName,
                    customerCompany,
                    customerEmail,
                    customerImageUrl,
                    stars,
                    adminId : Number(adminId),
                    spaceId : Number(spaceId),
                    testimonialFormsId : Number(formId),
                    jobTitle
                },select : {
                    id : true
                }
            })


            if(textReview){
                await ts.textReview.create({
                    data : {
                        textReview,
                        customerReviewId : Number(customerReviewId.id)
                    }
                })
            } else if(videoLink){
                await ts.vidoeReview.create({
                    data : {
                        videoLink,
                        customerReviewId : Number(customerReviewId.id)
                    }
                })
            }
        })

        return NextResponse.json(
            {msg : "Review Submitted successfully"},
            {status : 200}
        )

    } catch (error) {
        console.log(error);
        
        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Zod fucking error"},
                {status : 400}
            )
        }
        return NextResponse.json(
            {msg : "Something went wrong while testimonial submission"},
            {status : 500}
        )
    }
}
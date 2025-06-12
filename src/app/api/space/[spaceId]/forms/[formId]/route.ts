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

        const { customerName, adminId, jobTitle, customerCompany, customerEmail, customerImageUrl, customerVideoUrl, textReview, stars} = parsedObject.data

        await prisma.customerReview.create({
            data : {
                adminId : Number(adminId),
                spaceId : Number(spaceId),
                testimonialFormsId : Number(formId),
                customerCompany,
                customerEmail,
                customerImageUrl,
                customerName,
                customerVideoUrl,
                textReview, 
                stars,
                jobTitle
            }
        })

        return NextResponse.json(
            {msg : "Review submitted successfully"},
            {status : 200}
        )

    } catch (error) {
        console.log(error);
        
        // we need to work on our error handlers
        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Invalid Input fields"},
                {status : 409}
            )
        }
        return NextResponse.json(
            {msg : "Something went wrong while submitting reviews please try again later"},
            {status : 500}
        )
    }
}
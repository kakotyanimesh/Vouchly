import { TestimoniaFormConfig } from "@/utils/config/space.config";
import { ExceedLimitError } from "@/utils/lib/errorclass";
import prisma from "@/utils/lib/prisma";
import { getUserSession } from "@/utils/lib/user_session";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";

export async function POST(req:NextRequest, {params} : {params : Promise<{spaceId : string}>}) {
    // create form from users data here 
    try {
        const spaceId = (await params).spaceId

        const space = await prisma.spaces.findUnique({
            where : {
                id : Number(spaceId)
            }
        })

        if(!space){
            throw new Error("No space Found !!")
        }

        const parsesObject = TestimoniaFormConfig.safeParse(await req.json())

        if(!parsesObject.success){
            throw parsesObject.error
        }

        const { Name, Description, questions, brandLogo } = parsesObject.data

        const { id } = await getUserSession()

        const userDetails = await prisma.user.findUnique({
            where : {
                id : Number(id)
            }, include : {
                subscription : {
                    select : {
                        subscriptionName : true,
                        subscriptionData : {
                            select : {
                                maxTestimonialForm : true
                            }
                        }
                    }
                },_count : {
                    select : {
                        testimonialForms : true
                    }
                }
            }
        })

        if(!userDetails || userDetails.subscription.length === 0){
            throw new Error("Unable to find the user")
            // the getusersession will automatically check this error just for safety
        }

        const totalTestimonialForms = userDetails._count.testimonialForms
        const maxAllowedTestimonials = userDetails.subscription[0].subscriptionData.maxTestimonialForm

        if(maxAllowedTestimonials !== -1 && totalTestimonialForms >= maxAllowedTestimonials){
            throw new ExceedLimitError(`You have exceed Your Limit , Please Upgrate to ${userDetails.subscription[0].subscriptionName === "TRIAL" ? "PRO" : "ENTERPRICE"}`)
        }

        const res = await prisma.testimonialForm.create({
            data : {
                Name,
                Description,
                questions,
                brandLogo,
                spaceId : Number(spaceId),
                adminId : Number(id)
            },select : {
                id : true
            }
        })

        revalidateTag(`user-spaces-${id}`)
        revalidateTag(`user-inidividual-space-testimoials-${spaceId}`)
        revalidateTag(`user-all-data-count-${id}`)
        revalidateTag(`all_testimonials-${id}`)

        return NextResponse.json(
            {msg : "Testimonia Form Created Successfully !!", formId : res.id},
            {status : 200}
        )
    } catch (error) {
        // console.log(error);

        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : `Invalid Inputs at ${JSON.stringify(error.cause)}`},
                {status: 400}
            )
        }
        
        if(error instanceof ExceedLimitError){
            return NextResponse.json(
                {msg : error.message},
                {status : 403}
            )
        }
        return NextResponse.json(
            {msg : "Something bad happens at backend while creating Forms"},
            {status : 500}
        )
    }
}
import { ExceedLimitError } from "@/utils/lib/errorclass";
import prisma from "@/utils/lib/prisma";
import { getUserSession } from "@/utils/lib/user_session";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { id } = await getUserSession()

        const userdata = await prisma.user.findUnique({
            where : {
                id : Number(id)
            },select : {
                subscription : {
                    where : {
                        Active : "ACTIVE"
                    }, orderBy : {
                        createdAt : "desc"
                    },
                    take : 1,
                    select : {
                        subscriptionName : true,
                        subscriptionData : {
                            select : {
                                maxTestimonialForm : true
                            }
                        }
                    }
                }, _count : {
                    select : {
                        testimonialForms : true
                    }
                }
            }
        })

        if(!userdata){
            throw new Error("User does not have specific data")
        }

        const totalTestimonialForms = userdata._count.testimonialForms
        const limit= userdata.subscription[0].subscriptionData.maxTestimonialForm

        if(limit !== -1 && totalTestimonialForms >= limit){
            throw new ExceedLimitError(`You have exceed Your Limit , Please Upgrate to ${userdata.subscription[0].subscriptionName === "TRIAL" ? "PRO" : "ENTERPRICE"}`)
        }

        return NextResponse.json(
            {msg : `limit is not exceeded yet, remaining ${limit - totalTestimonialForms}`},
            {status : 200}
        )
    } catch (error) {
        if(error instanceof ExceedLimitError){
            return NextResponse.json(
                {msg : error.message},
                {status : 403}
            )
        }
        return NextResponse.json(
            {msg : `${process.env.NODE_ENV === "development" ? error : "something went wrong"}`},
            {status : 500}
        )
    }
}
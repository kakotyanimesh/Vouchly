import { SpaceObject } from "@/utils/config/space.config";
import { ExceedLimitError } from "@/utils/lib/errorclass";
import prisma from "@/utils/lib/prisma";
import { getUserSession } from "@/utils/lib/user_session";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req:NextRequest) {
    try {
        const parseddata = SpaceObject.safeParse(await req.json())

        if(!parseddata.success){
            // console.log();
            
            throw parseddata.error
        }

        const { spaceName, url } = parseddata.data
        
        const { id } = await getUserSession()

        const userDetails = await prisma.user.findUnique({
            where : {
                id : Number(id)
            }, include: {
                subscription : {
                    select : {
                        subscriptionData : {
                            select : {
                                maxSpace : true,
                                name : true
                            }
                        }
                    }
                }, _count : {
                    select : {
                        spaces : true
                    }
                }
            }
        })

        if(!userDetails || !userDetails.subscription || userDetails.subscription.length === 0){
            throw new Error("Unable to find the user ")
        }

        const totalUserSpace = userDetails._count.spaces  
              
        const maxAllowedSpaces = userDetails.subscription[0].subscriptionData.maxSpace
        

        if(maxAllowedSpaces !== -1 && totalUserSpace >= maxAllowedSpaces){
            throw new ExceedLimitError(`You have exceed Your Limit , Please Upgrate to ${userDetails.subscription[0].subscriptionData.name === "TRIAL" ? "PRO" : "ENTERPRICE"}`)
        }

        await prisma.spaces.create({
            data : {
                spaceName,
                url,
                userId : Number(id)
            }
        })

        // revalidateTag(`user-spaces-${id}`)
        // revalidateTag(`spaces`)
        revalidateTag(`user-spaces-${id}`)
        revalidateTag(`user-all-data-count-${id}`)
        revalidatePath(`/space`)

        return NextResponse.json(
            {msg : "Space created successfully"},
            {status : 200}
        )
    } catch (error) {

        // console.log(error, "zod error ")
        // console.error(error.instanceof)

        if(error instanceof ZodError){
            return NextResponse.json(
                {msg : "Invalid inputs, Check your input fields properly !!",},
                {status : 400}
            )
        }

        if(error instanceof ExceedLimitError){
            return NextResponse.json(
                {msg : error.message},
                {status : 403}
            )
        }


        return NextResponse.json(
            {msg : "Something went wrong while creating space"},
            {status : 500}
        )
    }
}
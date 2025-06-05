import { SpaceObject } from "@/utils/config/space.config";
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

        return NextResponse.json(
            {msg : "Something went wrong while creating space"},
            {status : 500}
        )
    }
}
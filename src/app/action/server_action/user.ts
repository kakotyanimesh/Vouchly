"use server"

import { handlerError } from "@/utils/lib/errorhandler"
import prisma from "@/utils/lib/prisma"
import { getUserSession } from "@/utils/lib/user_session"
import { SpaceCardProps } from "@/utils/types/user_types"
import { unstable_cache } from "next/cache"



const cachedSpaceData = (userId : string) => unstable_cache(
    async() => {
        const spaces = await prisma.spaces.findMany({
            where : {
                userId : Number(userId)
            }, select : {
                spaceName : true,
                url : true,
                id : true,
                createdAt : true,
                _count : {
                    select : {
                        testimonialForms : true
                    }
                }
            }, orderBy : {
                createdAt : "asc"
            }
        })

        return spaces
    },
    [`spaces-${userId}`],
    {
        revalidate : 300,
        tags : [`user-spaces-${userId}`, `spaces`]
    }
)

type GetAllSpacesTypes = SpaceCardProps[] | {success : false, message : string, status?:number}

export const getAllSpaces = async() : Promise<GetAllSpacesTypes> => {
    try {
        const { id } = await getUserSession()

        const spaces = cachedSpaceData(id)


        const formatedData : SpaceCardProps[] = (await spaces()).map(s => ({
            spaceName : s.spaceName,
            createdAt : s.createdAt,
            totalForms : s._count.testimonialForms,
            Id : s.id,
            src : s.url
        }))

        return formatedData
    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}   
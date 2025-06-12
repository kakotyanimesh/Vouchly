"use server"

import { handlerError } from "@/utils/lib/errorhandler"
import prisma from "@/utils/lib/prisma"
import { SpaceCardProps, TestimoniaTableDataTypes } from "@/utils/types/user_types"
import { unstable_cache } from "next/cache"



export const getUserDataCount = async(id : number) => {
    try {
        const [ spaceCount, formsCount, submissionCount ] = await Promise.all([
            prisma.spaces.count({
                where : {
                    userId : Number(id)
                }
            }),

            prisma.testimonialForm.count({
                where : {
                    adminId : Number(id)
                }
            }),
            prisma.customerReview.count({
                where : {
                    adminId : Number(id)
                }
            })
        ])

        return {
            spaceCount, submissionCount, formsCount
        }
    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}


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

export const getAllSpaces = async(id : string) : Promise<GetAllSpacesTypes> => {
    try {
        // const { id } = await getUserSession()

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


const cachedIndividualSpaceTestimonialsData = ({adminId, spaceId} : {adminId: string, spaceId : string}) => unstable_cache(
    async() => {
        const data = await prisma.testimonialForm.findMany({
            where : {
                spaceId : Number(spaceId),
                adminId : Number(adminId)
            }, select : {
                Name : true,
                Description : true,
                createdAt : true,
                id : true,
                status : true,
                _count : {
                    select : {
                        customerReview : true
                    }
                }
            }
        })

        return data
    },
    [`individual_space_testimonials${spaceId}`],
    {   
        revalidate : 300,
        tags : [`user-inidividual-space-testimoials-${spaceId}`, `spaces`]
    }
)


export const getSpaceTestimonialsDataWithId = async({spaceId, adminId} : {spaceId : string, adminId : string}) => {
    try {

        const alltestimonials = cachedIndividualSpaceTestimonialsData({spaceId, adminId})

        const res = await alltestimonials()
        
        return res.map((t) : TestimoniaTableDataTypes => ({
            id : t.id,
            Name : t.Name,
            Description : t.Description,
            createdAt : new Date(t.createdAt).toLocaleDateString(),
            Submissions : t._count.customerReview,
            status : t.status
        }))

    } catch (error) {
        const err = await handlerError(error)
        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}


// const cached



const cachedAllTestimonialForms = (adminId : number, takeNumber : number) => unstable_cache(async() => {
    const allTestimonials = await prisma.testimonialForm.findMany({
        where : {
            adminId : Number(adminId)
        },
        take : takeNumber,
        orderBy : {
            createdAt : "asc"
        },select : {
            Name : true,
            space : {
                select : {
                    spaceName : true
                }
            },
            id : true,
            Description : true,
            status : true,
            createdAt : true,
            _count : {
                select : {
                    customerReview : true
                }
            }
        }
    })
    return allTestimonials
},
[`all_testimonials-${adminId}`],
{
    revalidate : 3000,
    tags : [`all_testimonials-${adminId}`, `spaces`, `testimonials`]
})


export const getAllTestimonials = async(adminId : number, takeNumber : number) => {
    try {
        const res = cachedAllTestimonialForms(adminId, takeNumber)

        const allT = await res()


        return allT.map((t) : TestimoniaTableDataTypes=> ({
            id : t.id,
            Name : t.Name,
            Space : t.space.spaceName,
            Description : t.Description,
            createdAt : new Date(t.createdAt).toLocaleDateString(),
            status : t.status,
            Submissions : t._count.customerReview
        }))

        

    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            statusCode : err.statusCode
        }
    }
}



// const cachedIndividualTestimonialFormdata = ({adminId, formId} : {adminId : number, formId : number}) => unstable_cache(async() => {
//     return prisma.testimonialForm.findUnique({
//         where : {
//             id : Number(formId),
//             adminId : Number(adminId)
//         },select : {
//             Name : true,
//             Description : true,
//             _count : {
//                 select : {
//                     customerReview : true
//                 }
//             },
//             createdAt : true
//         }
//     })
// })


export const getIndividualTestimonialFormData = async({adminId, formId} : {adminId : number, formId : number}) => {
    try {
        return await prisma.testimonialForm.findUnique({
            where : {
                id : Number(formId),
                adminId : Number(adminId)
            }, select : {
                spaceId : true,
                Name : true,
                brandLogo : true,
                Description : true,
                questions : true,
                _count : {
                    select : {
                        customerReview : true
                    }
                },
                createdAt : true
            }
        })

    } catch (error) {
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}
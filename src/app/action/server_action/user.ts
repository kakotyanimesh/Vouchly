"use server"
import { gridTypes } from "@/generated/prisma"
import { embadedTypes } from "@/utils/config/user.config"
import { handlerError } from "@/utils/lib/errorhandler"
import prisma from "@/utils/lib/prisma"
import { getUserSession } from "@/utils/lib/user_session"
import { OrderedReviewTypes, SpaceCardProps, TestimoniaTableDataTypes, TextReviewPropsWallOfLove, VideoReviewPropsWallOflove } from "@/utils/types/user_types"
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache"
import { ZodError } from "zod/v4"


const cachedUserdataCount = (id : number) => unstable_cache(
    async() => {
        const numberedId = Number(id)
        const [ spaceCount, formsCount, submissionCount ] = await Promise.all([
            prisma.spaces.count({
                where : {
                    userId : numberedId
                }
            }),
            prisma.testimonialForm.count({
                where : {
                    adminId : numberedId
                }
            }),
            prisma.customerReview.count({
                where : {
                    adminId : numberedId
                }
            })
        ])

        return {
            spaceCount,
            formsCount,
            submissionCount
        }
    },
    [`user-count-data${id}`]
    ,{
        revalidate : 300,
        tags : [`user-all-data-count-${id}`, `spaces`, `testimonials`, `user-data`]
    }
)

export const getUserDataCount = async(id : number) => {
    try {
        const countfunction = cachedUserdataCount(id)

        const data = await countfunction()

        
        return {
            success : true,
            data

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
            createdAt : "desc"
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



/**
 * two functions -> for text review 
 * another for vidoes => not in use im fetching everything with one function written in last
 */


const cachedTextReviews = ({formId, adminId} : {formId : number, adminId : number}) => unstable_cache(async() => {
    return await prisma.customerReview.findMany({
        where : {
            adminId : Number(adminId),
            testimonialFormsId : Number(formId),
            textReview : {
                isNot : null
            }
        },select : {
            id : true,
            customerName : true,
            customerImageUrl : true,
            customerCompany : true,
            stars : true,
            textReview : {
                select : {
                    textReview : true
                }
            }
        }
    })
},
    [`text-reviews-cached${formId}-${adminId}`],
    {
        revalidate : 300,
        tags : [`text-review-cached-${formId}-${adminId}`, `review-cached`]
    }
)

export const getTextReviews = async({formId, adminId} : {formId : number, adminId : number}) => {
    try {
        const res = cachedTextReviews({formId, adminId})

        return (await res()).map((t) : TextReviewPropsWallOfLove => ({
            id : t.id,
            customerName : t.customerName,
            customerCompany : t.customerCompany,
            stars : t.stars,
            imageSrc : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${t.customerImageUrl}`,
            textReview : t.textReview?.textReview as string
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


const cachedVideoReviews = ({formId, adminId} : {formId : number, adminId : number}) => unstable_cache(async() => {
    return await prisma.customerReview.findMany({
        where : {
            adminId : Number(adminId),
            testimonialFormsId : Number(formId),
            videoReview : {
                isNot : null
            }
        }, select : {
            id : true,
            customerCompany : true,
            customerName : true,
            stars : true,
            videoReview : {
                select : {
                    videoLink : true,
                }
            }
        }
    })
},
    [`video-reviews-cached${formId}-${adminId}`],
    {
        revalidate : 300,
        tags : [`video-review-cached-${formId}-${adminId}`, `review-cached`]
    }
)


export const getVideoReview = async({formId, adminId} : {formId : number, adminId : number}) => {
    try {
        const res = cachedVideoReviews({adminId, formId})
        

        return (await res()).map((vt) : VideoReviewPropsWallOflove => ({
            id : vt.id,
            customerName : vt.customerName,
            customerCompany : vt.customerCompany,
            stars : vt.stars,
            videoLink : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${vt.videoReview?.videoLink}`

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

export const revalidateCached = async({cachedName} : {cachedName : string}) => {
    revalidateTag(`${cachedName}`)
}




type AddWidgetTypes = {
    formId : number,
    embadedIds : number[],
    style : string,
    shadowColor : string,
    starColor : string,
    gridType : gridTypes
}

export const addWidgetstoDb = async({formId, embadedIds, style, shadowColor, starColor, gridType } : AddWidgetTypes) => {
    try {
        const parsedObject = embadedTypes.safeParse({formId, embadedIds, shadowColor, starColor, style, gridType})

        // update reviews table that these are in action right now
        if(!parsedObject.success){
            throw parsedObject.error.errors
        }

        const parseddata = parsedObject.data
        console.log(parseddata.gridType);
        
        const embadedId = await prisma.$transaction(async() => {
            await prisma.reviewStyle.create({
                data : {
                    testimonialFormId : Number(parseddata.formId),
                    inlinestyle : parseddata.style,
                    shadowColor : parseddata.shadowColor,
                    starColor : parseddata.starColor,
                    gridType : parseddata.gridType
                }
            })

            const emabdedRes = await prisma.embadedWall.create({
                data : {
                    testimonialFormsId : Number(parseddata.formId),
                    selectedReviews : parseddata.embadedIds,
                }, select : {
                    id : true
                }
            })

            return emabdedRes.id
        })

        revalidatePath(`reviewwallcached-${formId}`)

        return {
            success : true,
            id : embadedId
        }
    } catch (error) {
        // console.log(error);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if((error as any).code === "P2002"){
            return {
                success : false,
                message : "You already has one wall",
                style : 409
            }
        }
        
        if(error instanceof ZodError){
        return {
            errorMsg : `Invalid Inputs at ${JSON.stringify(error.cause)}`,
            statusCode : 400
        }
    }
        const err = await handlerError(error)

        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}


export const saveScriptKey = async({s3ScriptKey, formId} : {s3ScriptKey : string, formId : number}) => {
    try {
        const { id } = await getUserSession()

        await prisma.testimonialForm.update({
            where : {
                adminId : Number(id),
                id : Number(formId)
            }, data : {
                scriptS3 : s3ScriptKey
            }
        })
        return {
            success : true
        }
    } catch (error) {
        const err = await handlerError(error)

        return {
            messgage : err.errorMsg,
            status : err.statusCode,
            success : false
        }
    }
}


const cachedEmbadedWall = async({formId} : {formId : number}) => {
    const wall = await prisma.embadedWall.findUnique({
        where : {
            testimonialFormsId : Number(formId)
        }, select : {
            selectedReviews : true
        }
    })

    if(!wall || wall.selectedReviews.length === 0){
        return {
            textReviewArray : [],
            videoReviewArray : []
        }
        // {
        //     // here Im returing new arrys not getiing access to those that are being declared after it
        //     // textReviewArray : [],
        //     // videoReviewArray : [] => worst gpt code ever im not going to add this 
            
        // }
    }

    const reviewIds = wall.selectedReviews

    const reviews = await prisma.customerReview.findMany({
        where : {
            id : {in : reviewIds}
        }, include : {
            textReview : {
                select : {
                    textReview : true
                }
            },
            videoReview : {
                select : {
                    videoLink : true
                }
            }
        }, omit : {
            testimonialFormsId : true,
            spaceId : true,
            adminId : true,
            createdAt : true
        }
    })


    const textReviewArray : TextReviewPropsWallOfLove[] = []
    const videoReviewArray : VideoReviewPropsWallOflove[] = []

    for (const rvs of reviews) {
        if(rvs.textReview){
            textReviewArray.push({
                id : rvs.id,
                textReview : rvs.textReview.textReview,
                customerName : rvs.customerName,
                customerCompany : rvs.customerCompany,
                stars : rvs.stars,
                imageSrc : rvs.customerImageUrl
            })
        } else if(rvs.videoReview){
            videoReviewArray.push({
                id : rvs.id,
                videoLink : rvs.videoReview.videoLink,
                customerCompany : rvs.customerCompany,
                customerName : rvs.customerName,
                stars : rvs.stars
            })
        }
    }

    return {
        textReviewArray,
        videoReviewArray
    }
}


export const getEmbadedWall = async({formId} : {formId : number}) => {
    try {
        const cachedFn = await cachedEmbadedWall({formId : formId})


        const { textReviewArray, videoReviewArray } = cachedFn

        const textReviewArrayWithURL = textReviewArray.map(rev => ({
            ...rev,
            imageSrc : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rev.imageSrc}`
        }))

        const videoReviewWithURL = videoReviewArray.map(rev => ({
            ...rev,
            videoLink : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${rev.videoLink}`
        }))
        return {
            success : true,
            textReviewArrayWithURL,
            videoReviewWithURL
        }
    } catch (error) {
        console.log(error);
        
        const err = await handlerError(error)
        return {
            success : false,
            message : err.errorMsg,
            status : err.statusCode
        }
    }
}

export const fetchEmbadedScript = async({formId} : {formId: number} ) => {
    try {
        const res =  await prisma.testimonialForm.findUnique({
            where : {
                id : Number(formId)
            }, select : {
                scriptS3 : true
            }
        })

        return {
            s3script : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${res?.scriptS3}`,
            success : true
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


const cachedAllReviews = ({formId, adminId} : {formId : number, adminId : number,}) => unstable_cache(async() => {

    return await prisma.customerReview.findMany({
        where : {
            testimonialFormsId : Number(formId),
            adminId : Number(adminId),
        },
        include : {
            textReview : {
                select : {
                    textReview : true
                }
            },
            videoReview : {
                select : {
                    videoLink : true
                }
            }
        },
        omit : {
            testimonialFormsId : true,
            spaceId : true,
            adminId : true,
        }
    })
},
    [`review-cached-${formId}-${adminId}`],
    {
        revalidate : 100,
        tags : [`${formId}-review-cached`, `review-cached`]
    }
)


export const fetchedReviews = async({formId, adminId} : {formId : number, adminId : number}) => {
    try {
        const res = cachedAllReviews({formId, adminId})

        const reviews = await res()
        const orderedReviews : OrderedReviewTypes[] = reviews.map(r => {
            if(r.textReview){
                return {
                    id : r.id,
                    type : "text",
                    data : {
                        textreviewid : r.id,
                        customerName : r.customerName,
                        customerCompany : r.customerCompany,
                        textReview : r.textReview.textReview,
                        imageSrc : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${r.customerImageUrl}`,
                        stars : r.stars
                    }
                } satisfies OrderedReviewTypes
            }
            if(r.videoReview){
                return {
                    id : r.id,
                    type : "video",
                    data : {
                        videoReviewid : r.id,
                        videoLink : `${process.env.CLOUD_FRONT_DOMAIN_NAME}/${r.videoReview.videoLink}`,
                        customerCompany : r.customerCompany,
                        customerName : r.customerName,
                        stars : r.stars
                    }
                } satisfies OrderedReviewTypes
            }
            return undefined
        }).filter(Boolean) as OrderedReviewTypes[]

        return {
            orderedReviews 
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
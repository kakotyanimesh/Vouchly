"use server"
import { handlerError } from "@/utils/lib/errorhandler"
import prisma from "@/utils/lib/prisma"
import { SpaceCardProps, TestimoniaTableDataTypes, TextReviewProps } from "@/utils/types/user_types"
import { revalidateTag, unstable_cache } from "next/cache"


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
 * another for vidoes
 */


const cachedTextReviews = ({formId, adminId} : {formId : number, adminId : number}) => unstable_cache(async() => {
    return await prisma.customerReview.findMany({
        where : {
            adminId : Number(adminId),
            testimonialFormsId : Number(formId)
        },select : {
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

        return (await res()).map((t) : TextReviewProps => ({
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


export const revalidateCached = async({cachedName} : {cachedName : string}) => {
    revalidateTag(`${cachedName}`)
}


// export const updateUserData = async(data : UserProfileDataTypes) => {
//     try {
//         const parsedData = updateObject.safeParse(data)

//         if(!parsedData.success){
//             return {
//                 success : false,
//                 message : "Invalid Input values"
//             }
//         }

//         const { email, username, id } = parsedData.data

//         const user = await prisma.user.findUnique({
//             where : {
//                 id : Number(id)
//             }
//         })

//         if(!user){
//             return {
//                 success : false,
//                 message : "User does not exits bro"
//             }
//         }

//         const updateUser = await prisma.user.update({
//             where : {
//                 id : Number(id)
//             }, data : {
//                 ...(username && {username}),
//                 ...(email && {email})
//             }
//         })

//         revalidatePath("/account")

//         return {
//             success : true,
//             message : "Profile data updated successfully",
//             user : {
//                 username : updateUser.username,
//                 email : updateUser.email
//             }
//         }
//     } catch (error) {
//         const err = await handlerError(error)

//         return {
//             success : false,
//             message : err.errorMsg,
//             status : err.statusCode
//         }
//     }
// }

// export const wallofSubmissions = async({formId, adminId} : {formId : number, adminId : number})=> {
//     try {
//         return await prisma.customerReview.findMany({
//             where : {
//                 adminId : Number(adminId),
//                 testimonialFormsId : Number(formId)
//             }, select : {
//                 customerName : true,
//                 customerCompany : true,
//                 customerImageUrl : true,
//                 viderId : true,
//                 textReviewId : true,
//                 stars : true
//             },
//             take : 12,
//         })
//     } catch (error) {
//         const err = await handlerError(error)

//         return {
//             success : false,
//             message : err.errorMsg,
//             status : err.statusCode
//         }
//     }
// }



// const cachedSubmissionsTable = ({adminId, formId} : {adminId : number, formId : number}) => unstable_cache(async() => {
//     return await prisma.customerReview.findMany({
//         where : {
//             adminId : adminId,
//             testimonialFormsId : formId
//         }, select : {
//             customerName : true,
//             customerCompany : true,
//             createdAt : true,
//             approved : true
//         }
//     })
// },
//     [`user-all-submission-${adminId}`],
//     {
//         revalidate : 300,
//         tags : [`user-all-submission-${adminId}`]
//     }
// )


// export const getForSubmissionTable = async ({adminId, formId} : {adminId : number, formId : number}) => {
//     try {
//         const res = cachedSubmissionsTable({adminId, formId})

//         return (await res()).map((t) : SubmissionTableDatatypes => ({
//             "Customer Name" : t.customerName,
//             Status : !t.approved ? "Active" : "Draft",
//             "Submitted At" : new Date(t.createdAt).toDateString()
//         }))
//     } catch (error) {
//         const err = await handlerError(error)

//         return {
//             success : false,
//             message : err.errorMsg,
//             status : err.statusCode
//         }
//     }
// }



// submit textreview and video link extra

// export const submitTextReview = async(textReview : string) => {
//     try {
//         const { id } = await prisma.textReview.create({
//             data : {
//                 textReview
//             }
//         })

//         return {
//             id,
//             success : true
//         }
//     } catch (error) {
//         const err = await handlerError(error)

//         return {
//             success : false,
//             message : err.errorMsg,
//             status : err.statusCode
//         } 
//     }
// }


// export const submiVideoReview = async(video : string) => {
//     try {
//         const { id } = await prisma.textReview.create({
//             data : {
//                 textReview
//             }
//         })

//         return {
//             id,
//             success : true
//         }
//     } catch (error) {
//         const err = await handlerError(error)

//         return {
//             success : false,
//             message : err.errorMsg,
//             status : err.statusCode
//         } 
//     }
// }
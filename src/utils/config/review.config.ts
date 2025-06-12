import { z } from "zod"

export const reviewObject = z.object({
    customerName : z.string().max(30, {message : "Maximum 30 words is allowed"}),
    customerEmail : z.string().email({message : "Provide a valid email address"}),
    textReview : z.string().max(300, {message : "Max 300 words of review is allowed"}).optional(),
    adminId  : z.number(),
    customerImageUrl : z.string().min(1),
    customerVideoUrl : z.string().optional(),
    stars : z.number(),
    jobTitle : z.string().max(10, {message : "How tf your job title exceed 20 sorry for bad words"}),
    customerCompany : z.string().max(20, {message : "Company name can't be more than 20 words"})
})
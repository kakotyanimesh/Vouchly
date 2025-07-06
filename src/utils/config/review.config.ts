import { z } from "zod"

export const reviewObject = z.object({
    customerName : z.string().max(30, {message : "Maximum 30 words is allowed"}),
    customerEmail : z.string().email({message : "Provide a valid email address"}),
    adminId  : z.number(),
    formId : z.number(),
    spaceId : z.number(),
    customerImageUrl : z.string().min(1),
    stars : z.number(),
    jobTitle : z.string().max(10, {message : "How tf your job title exceed 20 sorry for bad words"}),
    customerCompany : z.string().max(20, {message : "Company name can't be more than 20 words"}),
    textReview : z.string().max(300, {message : "Your text review must be withing 300 words"}).min(10, {message : "Plese write atleast 30 words of review"}).optional(),
    videoLink : z.string().optional()
}).refine(
    (data) => (data.textReview && !data.videoLink) || (data.videoLink && !data.textReview),{
        message : "You can either submit video review or text review not both",
        path: ["textReview", "videoId"]
    }
)
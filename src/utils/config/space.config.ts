import { z } from "zod"


export const SpaceObject = z.object({
    spaceName : z.string().max(20, {message : "maximum 20 characters is allowed for space"}),
    url : z.string() 
    // we can add .url and for that we need to show what our url should look like like add https:// not without it for now lets focus on that
})


export const TestimoniaFormConfig = z.object({
    Name : z.string().max(30, {message : "Maximum 30 words of Name is allowed"}),
    Description : z.string().max(200, {message : "Maximum 50 words of Description is allowed"}),
    questions : z.string().array(),
    brandLogo : z.string()
})
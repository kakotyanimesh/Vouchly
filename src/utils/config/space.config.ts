import { z } from "zod"


export const SpaceObject = z.object({
    spaceName : z.string().max(20, {message : "maximum 20 characters is allowed for space"}),
    url : z.string() 
    // we can add .url and for that we need to show what our url should look like like add https:// not without it for now lets focus on that
})
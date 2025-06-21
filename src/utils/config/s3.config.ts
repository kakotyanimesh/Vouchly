import { z } from "zod"

export const S3Config = z.object({
    fileName : z.string(),
    fileType : z.string(),
    folderName : z.enum(["form_logos", "testimonial-videos", "user-images", "widget"])
}) 
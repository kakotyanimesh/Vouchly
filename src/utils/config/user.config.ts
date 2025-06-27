import { gridTypes } from "@/generated/prisma"
import { z } from "zod"

export const signinObject = z.object({
    email : z.string().email({message : "Enter a valid email address "}),
    password : z.string()
                .max(25, {message : "Password length should be within 25"})
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

export const signupObject = z.object({
    email : z.string().email({message : "Enter a valid email address "}),
    username : z.string().max(20, {message : "Max 20 letters is allowed"}),
    password : z.string()
                .max(25, {message : "Password length should be within 25"})
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})


export const updateObject = z.object({
    id : z.number(),
    email : z.string().email({message : "Enter a valid email address "}).optional(),
    username : z.string().max(20, {message : "Max 20 letters is allowed"}).optional(),
})


export const embadedTypes = z.object({
    formId : z.string(),
    embadedIds : z.number().array(),
    gridType : z.nativeEnum(gridTypes),
})


export const widgetIdObject = z.object({
    widgetId : z.string(),
    formId : z.number()
})


import { PrismaClientKnownRequestError } from "@/generated/prisma/runtime/library";
import { signupObject } from "@/utils/config/user.config";
import prisma from "@/utils/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const parsedObject = signupObject.safeParse(await req.json())

    if(!parsedObject.success){
        // console.log(parsedObject.error.errors[0].message);
        // for now we are not touching all zod errros but we need to fix it also haha 
        
        return NextResponse.json(
            {msg : `Invalid Inputs ${JSON.stringify(parsedObject.error.errors[0].message)}`},
            {status : 400}
        )
    }

    const { username, password, email } = parsedObject.data
    try {  
        const hasedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data : {
                email,
                password : hasedPassword,
                username
            }
        })

        return NextResponse.json(
            {msg : "User created successfully"},
            {status : 200}
        )
    } catch (error) {        
        if(error instanceof PrismaClientKnownRequestError && error.code === "P2002"){
            return NextResponse.json(
                {msg : "User already exists"},
                {status : 409}
            )
        }

        // if(error instanceof PrismaClientInitializationError && error.message.startsWith("Invalid `prisma.user.create()` invocation")){
        //     console.log("here");
            
        //     return NextResponse.json(
        //         {msg : "Db connection error"},
        //         {status : 500}
        //     )
        // }
        
        return NextResponse.json(
            {msg : `Error Unable to create User`},
            {status : 500}
        )
    }
}


// export async function PUT(req:NextRequest) {
//     try {
//         const parsedObject = updateObject.safeParse(await req.json())

//         if(!parsedObject.success){
//             throw parsedObject.error.errors
//         }

//         const { username, email, id} = parsedObject.data

//         const user = await prisma.user.findUnique({
//             where : {
//                 id : Number(id)
//             }
//         })

//         if(!user){
//             return NextResponse.json(
//                 {msg : "User with Your Id doesnot exits"},
//                 {status : 404}
//             )
//         }

//         await prisma.user.update({
//             where : {
//                 id : Number(id)
//             },
//             data : {
//                 ...(username && {username}),
//                 ...(email && {email})
//                 // && returns first falsy value => means if username exits then it will return the object and we destructure it 
//             }
//         })

//         return NextResponse.json(
//             {msg : "User data updated Successgully"},
//             {status : 200}
//         )
//     } catch (error) {
//         if(error instanceof ZodError){
//             return NextResponse.json(
//                 {msg : "Invalid Inputs"},
//                 {status : 409}
//             )
//         }
//         return NextResponse.json(
//             {msg : "Unable to upadate Your data"},
//             {status : 500}
//         )
//     }
// }
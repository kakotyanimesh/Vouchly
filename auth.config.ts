import { signinObject } from "@/utils/config/user.config";
import prisma from "@/utils/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig : NextAuthConfig = {
    providers : [
        Credentials({
            name : "credentials",
            credentials : {
                email : {label : "email", placeholder : "your email here", type:"text"},
                password  : { label : "password", placeholder : "your password here", type : "password"}
            },
            authorize : async (credentials) => {
                const parsedObject = signinObject.safeParse(credentials)

                if(!parsedObject.success){
                    throw new Error(`Invalid inputs ${parsedObject.error.errors}`)
                }

                const {email, password} = parsedObject.data

                try {
                    const user = await prisma.user.findUnique({
                        where : {
                            email
                        }
                    })

                    if(!user){
                        throw new Error("User not exits ! sign Up")
                    }

                    const compare = await bcrypt.compare(password, user.password)

                    if(!compare){
                        throw new Error("Invalid Credentials !!")
                    }

                    return {
                        email : user.email,
                        id : String(user.id),
                        name : user.username
                    }
                } catch (error) {
                    throw new Error(`Error while SignIn ${error}`)
                }
            }
        })
    ],
    callbacks : {
        async jwt({token, user}){
            if(user){
                token.email = user.email
                token.id = user.id
                token.name = user.name
            }
            return token
        },
        async session({session, token}){
            if(token.sub){
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.id = token.sub as string
            }
            return session
        },
        signIn : async ({account}) => {
            if (account?.provider === "credentials"){
                return true
            } else {
                return false
            }
        }

    }

}
"use client"
import { Lock, Mail, User } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { InputBox } from "./ui/input"
import { LinkTag } from "./ui/Link"
import { Logo } from "./ui/logo"
import { motion } from "motion/react"
import { useTransition } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { createUser } from "@/app/action/client_action/user"



export const AuthPage = ({authTypes} : {
    authTypes : "signin" | "signup"
}) => {
    const authForm = authTypes === "signin"
    
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (formdata : FormData) => {
        startTransition(async() => {
            const username = formdata.get("username") as string
            const email = formdata.get("email") as string
            const password = formdata.get("password") as string

            if(authForm){
                console.log("signin ");
                
                const userSignin = await signIn("credentials", {
                    email, 
                    password,
                    redirect : false
                })

                if(userSignin.error === undefined){
                    // toast.success("User signined In")
                    redirect("/dashboard")
                } else if (userSignin.error === "Configuration"){
                    toast.error("Invalid inputs")
                }
            } else {
                // console.log("signup");

                const userSignUp = await createUser({
                    username, 
                    password,
                    email
                })

                if(userSignUp.success){
                    toast.success("User creted !")
                    redirect("/signin")
                } else {
                    toast.error(userSignUp.message)
                }
            }
        })
    }
    return (
        <div className="flex flex-col relative min-h-screen bg-black justify-center w-full items-center overflow-hidden">
            
            <div className="z-0 pointer-events-none absolute left-1/2 top-60 w-80 h-72 bg-gradient-to-r from-teal-400/20 to-emerald-400/15 rounded-full blur-3xl"></div>
            <div className="z-0 pointer-events-none absolute right-1/2 top-60  w-80 h-72 bg-gradient-to-r from-purple-500/20 to-violet-500/15 rounded-full blur-3xl"></div>
            
            <Logo className="mb-10"/>

            <motion.div 
            initial={{
                opacity : 0,
                y : 10
            }}
            animate={{
                opacity : 1,
                y : 0,
                transition : {
                    duration : 0.5,
                    ease : "easeOut"
                }
            }}
            className="mb-2">
                <Card className="h-fit p-5 md:w-[450px] w-[300px] text-start md:space-y-4 space-y-2 bg-[hsl(var(--pure-white))]/10 border border-[hsl(var(--primary))]/20 backdrop-blur-3xl">
                    <div className="space-y-1">
                        <h1 className="text-2xl">{authForm ? "LogIn" : "SignUp"}</h1>
                        <p className="text-sm">Enter your credentials to access your account</p>
                    </div>
                    <form action={handleSubmit} 
                    className="space-y-3">
                        {!authForm && 
                        <InputBox
                            disabled={isPending}
                            icon={<User size={14} strokeWidth={1.2}/>}
                            name="username" 
                            placeholder="username" 
                            type="text"/>} 
                        <InputBox 
                            disabled={isPending}
                            icon={<Mail size={14} strokeWidth={1.2}/>}
                            name="email" 
                            placeholder="animeshkakoty33@gmail.com" 
                            type="email"/>
                        <InputBox 
                            disabled={isPending}
                            icon={<Lock size={14} strokeWidth={1.2}/>}
                            name="password" 
                            placeholder="Your Password here " 
                            type="password"/>
                        <Button disabled={isPending} className="mt-2 w-full">{authForm ? "Continue with Email " : "Create Account "}</Button>
                    </form>
                </Card>
            </motion.div>
            {
                authForm ? 
                <h1 className="text-sm">Don&apos;t have an account? <LinkTag href="signup">Sign up</LinkTag></h1> 
                : 
                <h1 className="text-sm">Already have an account? <LinkTag href="signin">Sign in</LinkTag></h1>
            }
        </div>
    )
}
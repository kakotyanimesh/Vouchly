"use client"

import React from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { signOut } from "next-auth/react"

export interface UserProfileDataTypes {
    username ?: string,
    email ?: string,
    id : number
}

export const ProfileCard = (data : UserProfileDataTypes) => {
    // const [username , setUsername ] = useState<string>(data.username!)
    // const [email, setEmail] = useState<string>(data.email!)

    return (
        <div className="space-y-5">
            <form className="space-y-3">
                <h1 className="text-md">Customize your public presence.</h1>
                <h1 className="rounded-md border-2 border-[hsl(var(--primary))]/40 p-2 text-[hsl(var(--secondary-foreground))] overflow-x-auto whitespace-nowrap scrollbar-hide">{data.email}</h1>
                <h1 className="rounded-md border-2 border-[hsl(var(--primary))]/40 p-2 text-[hsl(var(--secondary-foreground))] overflow-x-auto whitespace-nowrap scrollbar-hide">{data.username}</h1>
            </form>
            <h1 className="bg-[hsl(var(--tertiary))]/20 text-white rounded-full px-3 py-1 w-fit text-xs">
                More Updates are on their Im still building it ...
            </h1>
            <Button variant={"secondary"} onClick={async() => {
                // im doing this here just for toast to appear after sometime idk its gona work or not
                await signOut({callbackUrl : "/", redirect : true})
                toast.message("✅ You`ve been logged out successfully.")
                
            }}>Log Out</Button>
        </div>
    )
}
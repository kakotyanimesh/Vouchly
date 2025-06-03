"use client"
import { File, Plus } from "lucide-react"
import { Card } from "./ui/card"
import { IconDiv } from "./ui/icondiv"
import { Button } from "./ui/button"
import { cn } from "@/utils/lib/cn"
import { redirect } from "next/navigation"
import { endcodeURL } from "@/utils/lib/lib_new"

export const FormCreation = ({sName, sId} : {sName : string, sId : string}) => {
    
    return (
        <div className="space-y-10">
            <div className={cn("flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3")}>
                <div>
                    <h1 className="font-semibold text-2xl">{sName}</h1> 
                </div>
                <Button 
                onClick={() => redirect(`/createForm?data=${endcodeURL(JSON.stringify({sName, sId}))}`)} 
                variant={"secondary"} 
                className="flex items-center gap-2" 
                sizes={"md"}><Plus size={16}/>Create Testimonia</Button>

            </div>

            <Card className="w-full h-full py-10 items-center flex flex-col space-y-5 justify-center hover:border-dotted hover:border-2 hover:border-[hsl(var(--primary))] transition-colors ease-linear duration-200 group">
                <IconDiv reactNode={<File/>}/>
                <h1 className="text-sm text-[hsl(var(--primary))]">Create your first Testimonia Form </h1>
                <Button
                onClick={() => redirect(`/createForm?data=${endcodeURL(JSON.stringify({sName, sId}))}`)} 
                variant={"transparent"} 
                className="flex items-center gap-2 group-hover:bg-[hsl(var(--primary))]/20 " 
                sizes={"md"}>
                <Plus size={16}/>Create Testimonia
                </Button>

            </Card>
        </div>
    )
}
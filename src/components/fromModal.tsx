"use client"
import { File, Plus } from "lucide-react"
import { Card } from "./ui/card"
import { IconDiv } from "./ui/icondiv"
import { Button } from "./ui/button"
import { cn } from "@/utils/lib/cn"
import { redirect, useRouter } from "next/navigation"
import { endcodeURL } from "@/utils/lib/lib_new"
import { TestimoniaTableDataTypes } from "@/utils/types/user_types"
import { TestimonialsTableheaders } from "@/utils/hardcodeddata/shortcuts"
import { FormTable } from "./formtable"

type FormDivtypes = {
    sName : string,
    sId : string,
    data : TestimoniaTableDataTypes[] | { success: boolean, message: string, status: number | undefined }
}


export const FormCreation = ({sName, sId, data} : FormDivtypes) => {

    // console.log(data);
    const router = useRouter()

    const isArray = Array.isArray(data)

    if(!isArray){
        return (
            <div>somthing went wrong baba   </div>
        )
    }
    
    return (
        <div className="space-y-10">
            <div className={cn("flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-3")}>
                <div>
                    <h1 className="font-semibold text-2xl">{sName}</h1> 
                </div>
                <Button 
                onClick={() => router.push(`/space/createForm?data=${endcodeURL(JSON.stringify({sName, sId}))}`)} 
                variant={"secondary"} 
                className="flex items-center gap-2" 
                sizes={"md"}><Plus size={16}/>Create Testimonia</Button>

            </div>

            {
                data.length === 0 ?
                <Card className="w-full h-full py-10 items-center  bg-[hsl(var(--pure-white))]/3  flex flex-col space-y-5 justify-center border-dotted hover:border-2 hover:border-[hsl(var(--primary))] transition-colors ease-linear duration-200 group">
                    <IconDiv reactNode={<File/>}/>
                    <h1 className="text-sm">Create your first Testimonia Form </h1>
                    <Button
                        onClick={() => redirect(`/space/createForm?data=${endcodeURL(JSON.stringify({sName, sId}))}`)} 
                        variant={"secondary"} 
                        className="flex items-center gap-2 group-hover:bg-[hsl(var(--primary))]/20 " 
                        sizes={"md"}>
                        <Plus size={16}/>Create Testimonia
                    </Button>
                </Card>
                : <FormTable thead={TestimonialsTableheaders} tdata={data}/>
            }
        </div>
    )
}
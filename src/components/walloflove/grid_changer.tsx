"use client"

import { Card } from "../ui/card"
import { cn } from "@/utils/lib/cn"
import { Button } from "../ui/button"
import {  addWidgetstoDb, revalidateCached, saveScriptKey } from "@/app/action/server_action/user"
import { ReactNode } from "react"
import { IconDiv } from "../ui/icondiv"
import { useGridStore, useReviewStore, useScriptStore } from "@/utils/zustand/gridState"
import { LayoutDashboard, LayoutGrid, User } from "lucide-react"
import { toast } from "sonner"
import { getScript, uploadToS3 } from "@/app/action/client_action/user"
import { useRouter } from "next/navigation"




// const GridGuideLines = [
//   "✅ Select testimonials to display.",
//   "🔢 Choose display order.",
//   "✍️ Mix text and video freely.",
//   "📱 Use 1 column on mobile.",
//   "🧱 Pick number of columns from bottom",
// ];


export const GridGuideLinesDiv = ({cachedName, formId, className} : {cachedName : string, formId : number, className ?:string}) => {
    const { setGridNumber, gridNumber } = useGridStore()
    console.log(formId);
    
    return (
        <Card className={cn("space-y-2 p-2 border-[hsl(var(--primary))]/20", className)}>
            <h1 className="text-white xl:text-xl text-sm font-semibold text-center">Guidelines to Create Your Testimonial Script</h1>
            <div className="flex flex-row gap-10">
                <div className="flex flex-row gap-2 ">
                {LayoutArry.map((t, k) => (
                            <Card 
                            onClick={() => setGridNumber(t.id)}
                            key={k} 
                            className={cn("cursor-pointer h-fit p-2 flex flex-col justify-center items-center hover:border-[hsl(var(--primary))] hover:border transition-colors duration-200 ease-linear", gridNumber === k + 1 ? "bg-[hsl(var(--primary))]/10" : "hover:bg-[hsl(var(--primary))]/20")}>
                                <IconDiv className="rounded-full p-1 w-fit" reactNode={t.icon}/>
                                <div className="-space-y-2 text-sm text-center">
                                    <h1>{t.layoutStyle}</h1>
                                    <p className="text-sm hidden md:block text-[hsl(var(--secondary-foreground))]">{t.desc}</p>
                                </div>
                            </Card>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                <GenerateLayoutButton formId={formId} />
                <Button
                    className="w-full"
                    onClick={() => revalidateCached({cachedName})}
                    >
                    Fetch Database
                </Button>
            </div>
            </div>
            
            {/* <p className="bg-[hsl(var(--primary))]/10 text-[hsl(var(--destructive))]  border-[hsl(var(--destructive))] border rounded-full w-fit px-3 justify-self-center">Preview function will be here</p> */}
        </Card>
    )
}



const GenerateLayoutButton = ({formId} : {formId : number}) => {
    const {embededIds} = useReviewStore()
    const { gridNumber } = useGridStore()

    const { setIsGenerated , setScriptKey} = useScriptStore()
    const router = useRouter()


    const createScript = async() => {
        const toasterId = toast.loading("creating your embaded script")
        try {
            if(embededIds.length === 0){
                toast.error("you haven't selected anything its empty", {
                    id : toasterId
                })
                return
            }

            // const forNowGridStyl = "" im just sending grid number helll 

            const embadedFormId = await addWidgetstoDb({formId, style: gridNumber.toString(),embadedIds : embededIds})

            if(!embadedFormId.id){
                throw new Error(embadedFormId.message)
            }

            toast.message("one step done, just few clicks away", {
                id : toasterId
            })

            const script = await getScript({widgetId : embadedFormId.id})


            const widgetFile = new File([script.script], `widget-${embadedFormId.id}.js`, {type : "application/javascript"})

            const s3Widget = await uploadToS3(widgetFile, "widget")

            if (!s3Widget || !s3Widget.uniqueKey) {
                toast.error("Something went wrong.Please 😓 Try again?")
                return
            }


            const updateForm = await saveScriptKey({s3ScriptKey : s3Widget.uniqueKey, formId : formId})

            if(!updateForm.success){
                toast.error("something went wrong while uploading to db")
                return
            }
            
            
            toast.success(`id : ${s3Widget.uniqueKey} done for now`, {
                id : toasterId
            })

            
            setIsGenerated(true)
            setScriptKey(s3Widget.uniqueKey)
            router.push(`/forms/${formId}`)
        } catch (error) {
            const err = error instanceof Error ? error.message : "🌐 Network error. Please check your connection."

            toast.error(err, {
                id : toasterId
            })
        }
    }
    return (
        <Button 
            onClick={createScript}
            variant={"secondary"} className="w-full">
            Generate Layout
        </Button>
    )
}


const LayoutArry : {layoutStyle : string, desc : string, icon : ReactNode, id : number}[] = [
    {
        layoutStyle : "single",
        desc : "vertical slacks",
        icon : <User size={16}/>,
        id : 1
    },
    {
        layoutStyle : "2 X 2 grid",
        desc : "classic 2 x 2 grid",
        icon : <LayoutGrid size={16}/>,
        id : 2
    },
    {
        layoutStyle : "3 X 3 grid",
        desc : "classsic 3 X 3 grid",
        icon : <LayoutDashboard size={16}/>,
        id : 3
    },
    
]
"use client"
import { CalendarRange, EllipsisVertical, Rocket } from "lucide-react"
import { Card } from "./card"
import { IconDiv } from "./icondiv"
import { Button } from "./button"
import { SpaceCardProps } from "@/utils/types/user_types"
import { cn } from "@/utils/lib/cn"
import { useRouter } from "next/navigation"
import { HTMLMotionProps, motion } from "motion/react"
import { toast } from "sonner"
import { useState } from "react"
import LoadingCircleSpinner from "./loadingspinner"

type SpceCardProps = HTMLMotionProps<"div"> & SpaceCardProps

export const SpaceCard : React.FC<SpceCardProps> = ({className, spaceName, createdAt, src, Id, totalForms}) => {
    // console.log(id);
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    
    return (
        <motion.div
        >
            <Card className={cn("px-5 py-7 space-y-5 group hover:border-[hsl(var(--card-bg-one))] transition-colors ease-linear duration-200", className)}>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-2">
                        <IconDiv reactNode={<Rocket size={18}/>} className="rounded-md p-2"/>
                        <div className="-space-y-1">
                            <h1 className="text-[hsl(var(--card-bg-one))] transition-colors ease-linear duration-150 font-semibold">{spaceName}</h1>
                            <p className="text-xs text-[hsl(var(--slate-text))]">{src}</p>
                        </div>
                    </div>
                    <EllipsisVertical 
                    onClick={() => toast.message("Not working right now ")}
                    className="text-[hsl(var(--card-bg-one))] cursor-pointer" size={14}/>
                </div>
                <div>
                    <h1>{totalForms} forms </h1>
                    <h1 className="flex items-center text-sm gap-2"><CalendarRange size={12}/>{new Date(createdAt).toDateString()}</h1>
                </div>
                <Button
                onClick={() => {
                    setLoader(true)
                    router.push(`/space/${spaceName}/${Id}`)
                }}
                variant={"secondary"} className="w-full" sizes={"md"}>
                    {
                        !loader ? <span>Open Space</span> : <LoadingCircleSpinner/>
                    }
                    
                </Button>
            </Card>
        </motion.div>
    )
}
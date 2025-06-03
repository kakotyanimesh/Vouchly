import { CalendarRange, EllipsisVertical, Rocket } from "lucide-react"
import { Card } from "./card"
import { IconDiv } from "./icondiv"
import { Button } from "./button"
import { SpaceCardProps } from "@/utils/types/user_types"
import { cn } from "@/utils/lib/cn"
import { redirect } from "next/navigation"

type SpceCardProps = React.HTMLAttributes<HTMLDivElement> & SpaceCardProps

export const SpaceCard : React.FC<SpceCardProps> = ({className, spaceName, createdAt, src, Id, totalForms}) => {
    // console.log(id);
    
    return (
        <Card className={cn("px-5 py-7 space-y-5 group hover:bg-[hsl(var(--primary))]/5 hover:border-[hsl(var(--primary))] active:bg-[hsl(var(--primary))]/5 active:border-[hsl(var(--primary))] transition-colors ease-linear duration-200", className)}>
            <div className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <IconDiv reactNode={<Rocket size={18}/>} className="rounded-md p-2 group-hover:border-[hsl(var(--primary))]"/>
                    <div className="-space-y-1">
                        <h1 className="group-hover:text-[hsl(var(--primary))] font-semibold">{spaceName}</h1>
                        <p className="text-xs text-[hsl(var(--slate-text))]">{src}</p>
                    </div>
                </div>
                <EllipsisVertical size={14}/>
            </div>
            <div>
                <h1>{totalForms} fomrs</h1>
                <h1 className="flex items-center text-sm gap-2"><CalendarRange size={12}/>{new Date(createdAt).toDateString()}</h1>
            </div>
            <Button 
            onClick={() => redirect(`/space/${spaceName}/${Id}`)}
            variant={"transparent"} className="w-full py-2 group-hover:border-[hsl(var(--primary))] group-active:border-[hsl(var(--primary))]" sizes={"sm"}>Open Space </Button>
        </Card>
    )
}
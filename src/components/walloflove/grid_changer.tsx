"use client"

import { Card } from "../ui/card"
import { LayoutDashboard, LayoutGrid, User } from "lucide-react"
import { IconDiv } from "../ui/icondiv"
import { ReactNode } from "react"
import { useGridStore } from "@/utils/zustand/gridState"
import { cn } from "@/utils/lib/cn"
import { Button } from "../ui/button"
import { revalidateCached } from "@/app/action/server_action/user"

export const GridChanger = ({cachedName} : {cachedName : string}) => {
    const { setGridNumber, gridNumber } = useGridStore()
    return (
        <Card className="py-7 md:fixed top-28 right-5 xl:w-96 w-fit px-5 space-y-5">
                    <h1 className="font-semibold text-xl">Customize Layout</h1>
                    <div className="space-y-4 flex md:flex-col flex-row space-x-2">
                        {LayoutArry.map((t, k) => (
                            <Card 
                            onClick={() => setGridNumber(t.id)}
                            key={k} className={cn("flex md:flex-row flex-col h-full w-full items-center p-3 gap-3  cursor-pointer hover:border-[hsl(var(--primary))] hover:border transition-colors duration-200 ease-linear", gridNumber === k +1 ? "bg-[hsl(var(--primary))]/70" : "hover:bg-[hsl(var(--primary))]/20")}>
                                <IconDiv className="rounded-full p-2 w-fit" reactNode={t.icon}/>
                                <div className="-space-y-2 ">
                                    <h1>{t.layoutStyle}</h1>
                                    <p className="text-sm hidden md:block text-[hsl(var(--secondary-foreground))]">{t.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <h1 className="bg-pink-800/70 text-blue-100 rounded-full xl:block hidden px-3 border border-blue-950 w-fit text-xs">For smaller screen its only 1 grid is available right now</h1>
                    <h1 className="bg-blue-800/70 text-blue-100 rounded-full xl:block hidden px-3 border border-blue-950 w-fit text-xs">More customization are coming ....</h1>
                    <Button 
                        onClick={() => revalidateCached({cachedName})}
                        variant={"secondary"}>
                        Fetch Database
                    </Button>
            </Card>
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




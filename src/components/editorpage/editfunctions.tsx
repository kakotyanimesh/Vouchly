"use client"
import { ReactNode } from "react"
import { Card } from "../ui/card"
import { useGridStore } from "@/utils/zustand/gridState"
import { cn } from "@/utils/lib/cn"
import { Button } from "../ui/button"
import { Carousel, ClassicGrid, MassonaryGrid } from "./exampleedits/exampleedits"

const styleGuideArray : {title : string, desc : string, comp ?: ReactNode}[] = [
    {
        title : "Masonry Grid",
        desc : "Pinterest-style layout",
        comp : <MassonaryGrid/>
    },
    {
        title : "Classic Grid",
        desc : "Even 3x3 grid layout",
        comp : <ClassicGrid/>
    },
    {
        title : "Carousel View",
        desc : "Scrollable horizontal",
        comp : <Carousel/>
    }
]

// MAIN COMPONENT
export const WidgetCustomizer = () => {
    const { gridNumber, setGridNumber} = useGridStore()
    return (
        <div className="space-y-4">
            {styleGuideArray.map((s, k) => (
                    <Card 
                        onClick={() => setGridNumber(k + 1)}
                        role="button"
                        key={k} className={cn("py-3 px-5 cursor-pointer relative rounded-xl transition-all ease-linear duration-300 hover:bg-[hsl(var(--tertiary))]/5", gridNumber === k + 1 ? "shadow-[0px_0px_4px_2px_#cf10f1]" : undefined)}>
                        <h1 className={cn(gridNumber === k + 1 ? "text-[hsl(var(--tertiary))]" :"bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent")}>
                            {s.title}
                        </h1>
                        <p className="text-[hsl(var(--secondary-foreground))]/70 text-xs">{s.desc}</p>
                        {s.comp}
                    </Card>
                ))}

                <Button variant={"secondary"} className="w-full">Save Customization</Button>
            
        </div>
    )
}


// const Genera
"use client"
import { ReactNode } from "react"
import { Card } from "../ui/card"
import { gridTypes, useGridStore } from "@/utils/zustand/gridState"
import { cn } from "@/utils/lib/cn"
import { Button } from "../ui/button"
import { Carousel, ClassicGrid, MassonaryGrid } from "./exampleedits/exampleedits"
import { ClassicGridComponent } from "./exampleedits/classicgrid"
import { CorosoulGrid } from "./exampleedits/corosoulgrid"
import { MassonaryGridComponent } from "./exampleedits/masonrygrid"

const styleGuideArray : {title : string, desc : string, comp ?: ReactNode, type : gridTypes}[] = [
    {
        title : "Carousel View",
        desc : "Scrollable horizontal",
        comp : <Carousel/>,
        type : "Carousel"
    },
    {
        title : "Classic Grid",
        desc : "Even 2x2 grid layout",
        comp : <ClassicGrid/>,
        type : "Classic"
    },
    {
        title : "Masonry Grid",
        desc : "Pinterest-style layout",
        comp : <MassonaryGrid/>,
        type : "Masonry"
    }
    
]

// MAIN COMPONENT
export const WidgetCustomizer = () => {
    const { gridType, setgridType, openFinalWidget, setOpenFinalWidget } = useGridStore()

    // useEffect(() => {
    //   console.log(gridNumber);
      
    
      
    // }, [gridNumber])
    
    return (
        <div className="space-y-4">
            {
                openFinalWidget && <FinalGridCard/>
            }
            {styleGuideArray.map((s, k) => (
                    <Card 
                        onClick={() => setgridType(s.type)}
                        role="button"
                        key={k} className={cn("py-2 space-y-1 px-5 cursor-pointer relative rounded-xl transition-all ease-linear duration-300 hover:bg-[hsl(var(--tertiary))]/5", gridType === s.type  ? "shadow-[0px_0px_4px_2px_#cf10f1]" : undefined)}>
                        <h1 className={cn(gridType === s.type ? "text-[hsl(var(--tertiary))]" :"bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent")}>
                            {s.title}
                        </h1>
                        <p className="text-[hsl(var(--secondary-foreground))]/70 text-xs">{s.desc}</p>
                        {s.comp}
                    </Card>
                ))}

                <Button variant={"secondary"} className="w-full" onClick={() => setOpenFinalWidget()}>Save Customization</Button>
            
        </div>
    )
}


// const Genera


const FinalGridCard = () => {
    const gridType = useGridStore(state => state.gridType)

    return (
            <Card className="inset-x-56 inset-y-20 shadow-[0px_0px_5px_1px_#cf10f1] z-20 absolute py-4 px-10 flex flex-col space-y-2">
                <h1 className="text-xl text-center bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
                    Your Generated Layout
                </h1>
                <Card className="justify-center h-full flex overflow-y-auto overflow-x-hidden py-4 scroll-smooth scrollbar scrollbar-thumb-[hsl(var(--tertiary))] scrollbar-w-0.7 ">
                    {
                        gridType === "Classic" ? <ClassicGridComponent/> : gridType === "Carousel" ? <CorosoulGrid/> : <MassonaryGridComponent/>
                    }
                </Card>
                <EditorButtons/>
            </Card>
    )
}


const EditorButtons = () => {
    const setOpenFinalWidget = useGridStore(state => state.setOpenFinalWidget)

    return (
        <div className="space-x-5 mt-6 flex justify-end relative">
            <RangeSliderButton/>
            {/* <Button className="w-fit" onClick={() => setOpenFinalWidget()}>Close Customization</Button> */}
            <Button className="w-fit" variant={"secondary"} onClick={() => setOpenFinalWidget()}>Generate Script</Button>
        </div>
    )
}

const RangeSliderButton = () => {
    const setGridWidth = useGridStore(state => state.setGridWidth)
    const gridWidth = useGridStore(state => state.gridWidth)

    const handleWheel = (e : React.WheelEvent<HTMLInputElement>) => {
        e.preventDefault()
        const d = e.deltaY > 0 ? -30 : 30
        setGridWidth(Math.min(100, Math.max(30, gridWidth + d)))
    }
    return (
        <Card className="flex flex-row gap-2 items-center bg-[hsl(var(--primary))]/60 px-2">
            <input
                value={gridWidth} 
                onChange={(e) => setGridWidth(parseInt(e.target.value))}
                onWheel={handleWheel}
                type="range" step={10} min={30} max={180} className="accent-indigo-500 cursor-pointer h-1 flex-1"/>
            <p className="rounded-md border-2 border-[hsl(var(--tertiary))] bg-[hsl(var(--tertiary))]/40 text-white font-bold px-1">{gridWidth} vw </p>
        </Card>
            
    )
}
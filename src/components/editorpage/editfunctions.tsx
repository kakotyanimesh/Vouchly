"use client"
import React, { ReactNode, useTransition } from "react"
import { Card, InfiniteScrollCard } from "../ui/card"
import { gridTypes, useGridStore, useReviewStore, useReviewStyle } from "@/utils/zustand/gridState"
import { cn } from "@/utils/lib/cn"
import { Button } from "../ui/button"
import { Carousel, ClassicGrid, MassonaryGrid } from "./exampleedits/exampleedits"
import { ClassicGridComponent } from "./exampleedits/classicgrid"
import { CorosoulGrid } from "./exampleedits/corosoulgrid"
import { MassonaryGridComponent } from "./exampleedits/masonrygrid"
import { Scan, X } from "lucide-react"
import { DimensionInput } from "../ui/editorpageelements/dimensionInput"
import { ColorPicker } from "../ui/editorpageelements/colorPicker"
import { toast } from "sonner"
import { addWidgetstoDb, saveScriptKey } from "@/app/action/server_action/user"
import { useRouter } from "next/navigation"
import LoadingCircleSpinner from "../ui/loadingspinner"

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
export const WidgetCustomizer = ({formId} : {formId : number}) => {
    const { gridType, setgridType, openFinalWidget, setOpenFinalWidget } = useGridStore()

    // useEffect(() => {
    //   console.log(gridNumber);
      
    
      
    // }, [gridNumber])
    
    return (
        <div className="">
            {
                openFinalWidget && <FinalGridCard formId={formId}/>
            }
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 space-x-2">
                    { 
                    styleGuideArray.map((s, k) => (
                        <Card 
                        onClick={() => setgridType(s.type)}
                        role="button"
                        key={k} className={cn("md:py-2 text-sm  space-y-1 h-full sm:px-5 p-1 cursor-pointer relative rounded-xl transition-all ease-linear duration-300 hover:bg-[hsl(var(--tertiary))]/5", gridType === s.type  ? "shadow-[0px_0px_4px_2px_#cf10f1]" : undefined)}>
                        <h1 className={cn(gridType === s.type ? "text-[hsl(var(--tertiary))]" :"bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent")}>
                            {s.title}
                        </h1>
                        <p className="text-[hsl(var(--secondary-foreground))]/70 text-xs lg:block hidden">{s.desc}</p>
                        {s.comp}
                    </Card>
                ))}
                </div>

                <Button variant={"secondary"} className="w-full mt-4" onClick={() => setOpenFinalWidget()}>Save Customization</Button>
            
        </div>
    )
}


// const Genera


const FinalGridCard = ({formId} : {formId : number}) => {
    const gridType = useGridStore(state => state.gridType)
    const setOpenFinalWidget = useGridStore(state => state.setOpenFinalWidget)
    const {parentBgColor} = useReviewStyle()
    const orderedReviewss = useReviewStore(state => state.orderedReviews) 
    const reviewStyles = useReviewStyle()



    // flex-1 overflow-y-auto h-full  overflow-x-hidden scrollbar scrollbar-thumb-[hsl(var(--tertiary))] scrollbar-w-0.7 flex justify-center items-center

    return (
            <Card className="xl:left-20 md:inset-y-10 md:right-5 md:left-20 right-1 left-3 top-10 bottom-15 z-20 absolute py-4 lg:px-10 px-5 flex flex-col space-y-2">
                <h1 className="text-xl text-center bg-gradient-to-bl from-[hsl(var(--primary))] to-[hsl(var(--tertiary))] bg-clip-text text-transparent font-semibold">
                    Your Generated Layout
                </h1>
                <Button variant={"transparent"} sizes={"sm"} className="absolute md:right-10 right-3 p-0" onClick={() => setOpenFinalWidget()}><X/></Button>
                <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-2">
                    <Card 
                        style={{
                            backgroundColor : parentBgColor
                        }}
                        className="xl:h-[550px] md:h-[450px] h-80 w-full overflow-hidden flex justify-center py-10 md:px-10 px-2">
                        <InfiniteScrollCard className="flex justify-center h-full">
                            {
                                gridType === "Classic" ? <ClassicGridComponent orderedReviews={orderedReviewss} reviewStyles={reviewStyles}/> : 
                                gridType === "Carousel" ? <CorosoulGrid orderedReviews={orderedReviewss} reviewStyles={reviewStyles} direction="left"/> : 
                                <MassonaryGridComponent reviewStyles={reviewStyles} orderedReviews={orderedReviewss}/>
                            }
                            
                        </InfiniteScrollCard>
                    </Card>
                    <EditorButtons formId={formId}/>
                </div>
            </Card>
    )
}


const EditorButtons = ({formId} : {formId : number}) => {
    const router = useRouter()
    const resetEditiorPage = useReviewStore(state => state.reset)
    const resetStyles = useReviewStyle(state => state.restyles)
    const setOpenFinalWidget = useGridStore(state => state.setOpenFinalWidget)
    const {
        rewiewCardBg, setrewiewCardBg,
        textColor, setTextColor, 
        // setMeteor, meteorColor, 
        setRoundedCorner, roundedCorner,
        shadowColor, setShadowColor,
        starColor, setStarColor,
        parentBgColor, setparentBgColor

        } = useReviewStyle()

        const gridType = useGridStore(state => state.gridType)
        const { embededIds } = useReviewStore()
        const [isPending, startTransition] = useTransition()

        const saveCustomization = (e : React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            startTransition(async() => {
                
                const toasterId = toast.loading("🛠️ Saving your style magic...")
                try {

                    const res = await addWidgetstoDb({
                        formId,
                        style : {
                            rewiewCardBg,
                            textColor,
                            roundedCorner,
                            shadowColor,
                            parentBgColor,
                            starColor,
                        },
                        
                        gridType : gridType,
                        embadedIds : embededIds
                    })

                    if(!res.success || !res.id){
                        throw new Error(res.message || "Could not save widget settings")
                    }

                    

                    const saveEmbadedId = await saveScriptKey({embadedId : res.id, formId : formId})

                    if(!saveEmbadedId.success){
                        throw new Error("Failed to generate script.")
                    }

                    toast.success("🎉 Testimonial Wall created! Grab your embed from the Widget section.", {
                        id : toasterId
                    })
                    router.push(`/forms/${formId}`)
                    resetEditiorPage()
                    setOpenFinalWidget()
                    resetStyles()
                    // const 
                } catch (error) {
                    console.log(error);
                    
                    const err = error instanceof Error ? `❌ ${error.message}` : "😓 Something went wrong. Try again."
                    toast.error(err,{
                        id : toasterId
                    })
                }
            })
        }
    return (
        <Card className="flex flex-col p-5 w-96 space-y-5">
            {/* <RangeSliderButton/> */}
            <form onSubmit={saveCustomization} className="space-y-5">
                <h1>Don&apos;t forget to change the required Styles & match the bg color now its black </h1>
                <DimensionInput 
                    
                    label="🍩Rounded Vibes" 
                    icon={<Scan size={14}/>}
                    initialValue={roundedCorner}
                    onChangeFuntion={(e : React.ChangeEvent<HTMLInputElement>) => setRoundedCorner(parseInt(e.target.value))}
                    />
                <ColorPicker 
                    title="🌈Hero Shade" 
                    initialValue={parentBgColor} 
                    onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setparentBgColor(e.target.value)}/>
                <ColorPicker 
                    title="🌈Review Card Drip" 
                    initialValue={rewiewCardBg} 
                    onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setrewiewCardBg(e.target.value)}/>
                <ColorPicker 
                    title="✨Hype Stars" 
                    initialValue={starColor} onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setStarColor(e.target.value)}/>
                <ColorPicker 
                    title="📃Text Shade" 
                    initialValue={textColor} onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)}/>
                <ColorPicker 
                    title="🛸Hover Aura" 
                    initialValue={shadowColor} onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setShadowColor(e.target.value)}/>
                {/* <ColorPicker 
                    title="🌌Meteor Trail" 
                    initialValue={meteorColor} onChangeFunction={(e : React.ChangeEvent<HTMLInputElement>) => setMeteor(e.target.value)}/> */}
                {/* <Button className="w-fit" onClick={() => setOpenFinalWidget()}>Close Customization</Button> */}


                <Button disabled={isPending} className="w-full" variant={"secondary"}>
                    {isPending ? <LoadingCircleSpinner/> : "Generate Script"}
                </Button>
            </form>
        </Card>
    )
}

// const RangeSliderButton = () => {
//     const setGridWidth = useGridStore(state => state.setGridWidth)
//     const gridWidth = useGridStore(state => state.gridWidth)

//     const handleWheel = (e : React.WheelEvent<HTMLInputElement>) => {
//         e.preventDefault()
//         const d = e.deltaY > 0 ? -30 : 30
//         setGridWidth(Math.min(100, Math.max(30, gridWidth + d)))
//     }
//     return (
//         <Card className="flex flex-row gap-2 items-center bg-[hsl(var(--primary))]/60 px-2">
//             <input
//                 value={gridWidth} 
//                 onChange={(e) => setGridWidth(parseInt(e.target.value))}
//                 onWheel={handleWheel}
//                 type="range" step={10} min={30} max={180} className="accent-indigo-500 cursor-pointer h-1 flex-1"/>
//             <p className="rounded-md border-2 border-[hsl(var(--tertiary))] bg-[hsl(var(--tertiary))]/40 text-white font-bold px-1">{gridWidth} vw </p>
//         </Card>
            
//     )
// }
import { GridGuideLinesDiv } from "@/components/walloflove/grid_changer"
import React from "react"

export default async function EmbadedLayout(
    {children, textReviews, videoReviews, editor, params} : LayoutInterface
) {
    return (
        <h1 className="text-[hsl(var(--primary))] text-2xl justify-center items-center">This page is not in used please go back</h1>
    )
    const formId = (await params).formId
    return (
        <div className="space-y-1 flex flex-col overflow-y-hidden gap-1">
            {children}
            <div className="w-full flex flex-row gap-2 h-[calc(100%-100px)]">
                <div className="flex-1 flex-col h-full overflow-hidden space-y-2">
                    {editor}
                    <GridGuideLinesDiv className="h-full " formId={formId} cachedName="review-cached"/>

                </div>
                <div className="w-96 h-screen flex flex-col space-y-2 -mt-2">
                    {textReviews}
                    {videoReviews}
                </div>
            </div>
            

        </div>
    )
}


interface LayoutInterface {
    children : React.ReactNode,
    textReviews : React.ReactNode,
    videoReviews : React.ReactNode,
    editor : React.ReactNode,
    params : Promise<{formId : number}>
}
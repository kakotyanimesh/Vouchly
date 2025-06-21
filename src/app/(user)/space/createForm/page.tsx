"use client"
import { FormDiv } from "@/components/formDiv";
import { PreviewForm } from "@/components/previewform";
import { BackButton } from "@/components/ui/routerBack";
import { Suspense } from "react";




export default function TestimoniaForm() {

    
    return (
        <div className="">
            <BackButton className=""/>
            <div className="flex md:flex-row mt-3 mr-5 flex-col gap-2 justify-between">
                <Suspense fallback={<h1>loading ....</h1>}>
                    <FormDiv/>
                </Suspense>
                <PreviewForm/>
            </div>
        </div>
    )
}
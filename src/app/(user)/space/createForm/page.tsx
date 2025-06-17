"use client"
import { FormDiv } from "@/components/formDiv";
import { PreviewForm } from "@/components/previewform";
import { BackButton } from "@/components/ui/routerBack";
import { Suspense } from "react";




export default function TestimoniaForm() {

    
    return (
        <div className="md:-mx-16 -mx-3">
            <BackButton className="left-56"/>
            <div className="flex md:flex-row mt-3 flex-col gap-5 md:mx-10 mx-2 justify-between">
                <Suspense fallback={<h1>loading ....</h1>}>
                    <FormDiv/>
                </Suspense>
                <PreviewForm/>
            </div>
        </div>
    )
}
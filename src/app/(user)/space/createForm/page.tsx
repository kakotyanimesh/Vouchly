"use client"
import { FormDiv } from "@/components/formDiv";
import { PreviewForm } from "@/components/previewform";
import { BackButton } from "@/components/ui/routerBack";
import { Suspense } from "react";




export default function TestimoniaForm() {

    
    return (
        <div className="">
            <BackButton className=""/>
            <div className="flex md:flex-row flex-col-reverse mt-3 lg:mr-5 -mx-2 lg:mx-0 gap-4 md:gap-2 justify-between">
                <Suspense fallback={<h1>loading ....</h1>}>
                    <FormDiv/>
                </Suspense>
                <PreviewForm/>
            </div>
        </div>
    )
}
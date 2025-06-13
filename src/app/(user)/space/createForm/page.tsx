"use client"
import { FormDiv } from "@/components/formDiv";
import { PreviewForm } from "@/components/previewform";




export default function TestimoniaForm() {

    
    return (
        <div className="md:-mx-16 -mx-3">
            <div className="flex md:flex-row flex-col gap-5 md:mx-10 mx-2 justify-between">
                <FormDiv/>
                <PreviewForm/>
            </div>
        </div>
    )
}
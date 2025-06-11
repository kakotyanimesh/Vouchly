"use client"
import Image from "next/image"
import { Card } from "./ui/card"
import { InputBox } from "./ui/input"
import { Button } from "./ui/button"
import { VerticalTabSwitcher } from "./ui/verticaltabswitcher"
import { InputBoxesTypesStore } from "@/utils/zustand/submittestimonialstate"
import { FileUploda } from "./ui/fileUpload"
import { TextArea } from "./ui/textbox"
import { IndividualFormDivProps } from "./individualformdiv"

export const SubmitFormComponent = (data : Omit<IndividualFormDivProps,  "createdAt" | "submission" | "token">) => {
    const { storeNumber } = InputBoxesTypesStore()
    return (
        <Card className="w-fit rounded-2xl bg-white/20 px-14 py-5 text-center space-y-4 flex flex-col justify-center items-center ">
            <Image src={"/images/logo.png"} width={200} height={100} className="rounded-2xl" alt="form_logo"/>
            <div>
                <h1 className="text-2xl font-bold">{data.Name}</h1>
                <p className="text-sm">{data.Description}</p>
            </div>
            <div className="text-start border-l-4 pl-2 border-[hsl(var(--primary))] space-y-2">
                <h1 className="text-md font-semibold">Questions</h1>
                {data.questions.map((q, k) => (
                    <h1 key={k} className="text-sm">• {q}</h1>
                ))}
           </div>
            <form action="" className="w-full text-left space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <InputBox placeholder="Your name" name="Name" type="text"/>
                    <InputBox placeholder="Your Email" name="Email" type="email"/>
                    <InputBox placeholder="Your Company" name="Company" type="text"/>
                    <InputBox placeholder="Job Title" name="Job Title" type="text"/>
                </div>
                <VerticalTabSwitcher tabs={tabS} />
                {storeNumber === 0 && <TextReview/>}
                {storeNumber === 1 && <FileUploda fileType="Video"/>}
                <Button className="w-full">submit</Button>
            </form>
            
        </Card>
    )
}

const tabS = [{title : "Text", key : 0}, {title : "Video", key : 1}]


const TextReview = () => {
    return (
        <TextArea 
            // disabled={isPending}
            // onChange={(e) => setDescription(e.target.value) }
            name="Your Review" 
            // value={Description}
            placeholder="Share Your Experience with our Product/service"/>
    )
}
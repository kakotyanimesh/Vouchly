"use client"
import Image from "next/image"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { useFileStore, useFormStore } from "@/utils/zustand/testimonialsformstore"
import { toast } from "sonner"

export const PreviewForm = () => {
    const {Name, Description, questions} = useFormStore()
    const { previewUrl } = useFileStore()

    const alert = () => {
        toast.message("Action disabled for preview mode", {
            description: "Only end-users will be able to interact with this form.",
            // ai message im not that good at writing english
        })
    }
    return (
        <Card className="h-full md:px-5 lg:py-5 p-3 flex flex-col md:w-1/2 w-full space-y-5 border-[hsl(var(--primary))]/20">
            <h1 className="text-xl font-bold">🧪 Live Preview</h1>
            <div className="justify-center flex">
                <Image 
                    src={previewUrl && previewUrl !== "" ? previewUrl : "/images/logo.png"} 
                    className="rounded-4xl border-2 border-green-600 max-h-20 object-cover" width={100} height={100} alt="logo"/>
           </div>
           <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">{Name}</h1>
                <p className="text-md break-words whitespace-pre-line text-sm">{Description}</p>
           </div>
           <div className="flex justify-start space-y-3 cursor-none flex-col">
                <div className=" border-2 border-[hsl(var(--primary))] bg-blue-700/10 md:w-72 w-52 rounded-3xl space-x-5 flex items-center px-5 py-2 h-fit">
                    <span>Name</span>
                    <span className="text-pink-400 italic text-sm font-semibold">Required Field</span>
                </div>
                <div className=" border-2 border-[hsl(var(--primary))] bg-blue-700/10 md:w-72 w-52 rounded-3xl space-x-5 flex items-center px-5 py-2 h-fit">
                    <span>Email</span>
                    <span className="text-pink-400 italic text-sm font-semibold">Required Field</span>
                </div>
           </div>
           <div className="text-start border-l-4 pl-2 pb-2 border-[hsl(var(--primary))] space-y-3">
                <h1 className="text-xl font-semibold">Questions</h1>
                {questions.map((q, k) => (
                    <h1 key={k}>• {q}</h1>
                ))}
           </div>
           <Button className="w-full" onClick={() => alert()} >Record a Video</Button>
           <Button className="w-full" onClick={() => alert()} variant={"secondary"}>Send Text Review</Button>
    </Card>
    )
}
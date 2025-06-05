import Image from "next/image"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { useFileStore, useFormStore } from "@/utils/zustand/testimonialsformstore"

export const PreviewForm = () => {
    const {Name, Description, questions} = useFormStore()
    const { previewUrl } = useFileStore()
    return (
        <Card className="h-fit md:px-15 md:py-10 p-3 bg-[hsl(var(--primary))]/10 flex flex-col space-y-5 md:max-w-[700px] md:w-[700px] w-[300px]">
           <div className="justify-center flex">
                <Image src={previewUrl || "/images/logo.png"} className="rounded-4xl border-2 border-blue-600" width={200} height={200} alt="logo"/>
           </div>
           <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">{Name}</h1>
                <p className="text-md md:mx-10 text-[hsl(var(--slate-text))] break-words whitespace-pre-line">{Description}</p>
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
           <Button className="w-full"  >Record a Video</Button>
           <Button className="w-full" variant={"secondary"}>Send Text Review</Button>
    </Card>
    )
}
import { FileQuestion } from "lucide-react"
import { Card } from "./card"
import { IconDiv } from "./icondiv"
import React, { useRef, useState } from "react"
import { cn } from "@/utils/lib/cn"
import { useFileStore } from "@/utils/zustand/testimonialsformstore"

interface FileUploadProps {
    fileType : "Logo" | "UserImage" | "Video"
    className ?: string
}


export const FileUploda = ({fileType, className} : FileUploadProps) => {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [fileName, setfileName] = useState<string | null>(null)

    const { setFile } = useFileStore()

    const handleUpload = () => {
        const f = fileRef.current?.files?.[0]
        if(f){
            setfileName(f.name)
            setFile(f)
        }
    }
    return (
        <Card
        onClick={() => {
            fileRef.current?.click()
        }}
        className={cn("w-full h-fit p-5 cursor-pointer border-dotted border-2 rounded-2xl border-[hsl(var(--primary))] flex justify-center items-center flex-col hover:bg-[hsl(var(--secondary))]/60", className)}
        >
            <IconDiv reactNode={<FileQuestion size={13}/>} className="p-2"/>
            <input className="hidden" type="file" ref={fileRef} accept="image/*" onChange={handleUpload}/>
            <p className="text-xs italic">{fileName ? fileName : `Click to upload your ${fileType}`} </p>
        </Card>
    )
}
import { FileQuestion, User, Video} from "lucide-react"
import { Card } from "./card"
import { IconDiv } from "./icondiv"
import React, { useRef, useState } from "react"
import { cn } from "@/utils/lib/cn"
import { useFileStore } from "@/utils/zustand/testimonialsformstore"
import { Button } from "./button"
import Image from "next/image"

interface FileUploadProps {
    fileType : "Logo" | "UserImage" | "Video"
    className ?: string,
    disable ? : boolean
}


export const FileUploda = ({fileType, className, disable} : FileUploadProps) => {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [fileName, setfileName] = useState<string | null>(null)
    // there is a bug file name still there after uploading to s3 i will solve later just have to make a the usestate of filename to a varible that takes data from zustand

    const { setImageFile, setVideoFile, previewUrl } = useFileStore()

    const handleUpload = () => {
        const f = fileRef.current?.files?.[0]
        if(f){
            setfileName(f.name)

            const setter = fileType === "Video" ? setVideoFile : setImageFile

            setter(f)
        }
    }
    return (
        <Card
            className={cn("w-full disabled:cursor-not-allowed h-fit p-5 cursor-pointer border-dotted border-2 space-y-2 rounded-2xl border-[hsl(var(--primary))] flex justify-center items-center flex-col hover:bg-[hsl(var(--primary))]/5", className)}
        >

            {
                fileName ? <div className="flex justify-center items-center flex-col space-y-2">
                    <h1 className="text-sm text-[hsl(var(--primary))]">Selected File : {fileName}</h1>
                    {fileType !== "Video" && previewUrl && <Image width={100} height={100} alt="image" className="rounded-full object-cover max-h-10" src={previewUrl}/>}
                </div> 
                : 
                <IconDiv reactNode={fileType === "UserImage" ? <User size={14}/> : fileType === "Video" ?  <Video size={13}/> : <FileQuestion size={13}/>} className="p-2"/>
            }
            <input
                className="hidden" 
                type="file"
                disabled={disable} 
                ref={fileRef} 
                accept={fileType === "Video" ? "video/*" : "image/*"} 
                onChange={handleUpload}/>

            <Button 
                disabled={disable} 
                onClick={() => fileRef.current?.click()}
                type="button" 
                variant={"secondary"} 
                sizes={"sm"}>
                {fileName ? "Change" : "Upload"} {fileType === "UserImage" ? "Profile Picture" : fileType}
            </Button>
        </Card>
    )
}
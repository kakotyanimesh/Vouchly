"use client"

import { cn } from "@/utils/lib/cn"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"


export const BackButton = ({className} : {className ?:string}) => {
    const router = useRouter()
    return (
        <button
            onClick={() => router.back()}
            className={cn("cursor-pointer rounded-full bg-white/10 p-1 flex items-center justify-center", className)}
        >
            <ChevronLeft size={18} className="text-[hsl(var(--primary))]"/>
        </button>
    )
}
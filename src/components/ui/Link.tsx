"use client"
import { cn } from "@/utils/lib/cn"
import Link from "next/link"
// import { motion } from "motion/react"

export const LinkTag : React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({className, ...props}) => {
    return (
        <>
            <Link href={`/${props.href}`}
            className={cn("text-[hsl(var(--primary))]", className)}
            {...props}
            />
            {/* will add motion underline  */}
        </>
    )
}
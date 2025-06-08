import { cn } from "@/utils/lib/cn";
import Link from "next/link";
import React from "react";

export const Logo : React.FC<React.HTMLAttributes<HTMLAnchorElement>> = ({className, ...props}) => {
    return (
        <Link href={"/"} className={cn("text-3xl font-bold text-white space-x-2", className)} {...props}>
                <span className="bg-[hsl(var(--primary))] text-black rounded-md px-2 py-1">T</span>
                <span>Testimonia</span>
        </Link>
    )
}
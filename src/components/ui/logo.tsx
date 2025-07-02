import { cn } from "@/utils/lib/cn";
import Link from "next/link";
import React from "react";

export const Logo : React.FC<React.HTMLAttributes<HTMLAnchorElement>> = ({className, ...props}) => {
    return (
        <Link href={"/"} className={cn("text-3xl font-bold text-white space-x-1", className)} {...props}>
                <span className="bg_card_gradient rounded-md px-2 pt-1">V</span>
                <span className="bg-gradient-to-r from-[hsl(var(--card-bg-one))] to-[hsl(var(--card-bg-two))] text-transparent bg-clip-text">Vouchly</span>
        </Link>
    )
}
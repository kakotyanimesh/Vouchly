import { cn } from "@/utils/lib/cn";
import { ReactNode } from "react";

export const IconDiv = ({reactNode, className} : {reactNode : ReactNode, className ?: string}) => {
    return (
        <div className={cn("bg-[hsl(var(--primary))]/10 p-4 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))] rounded-full transition-all ease-linear duration-200", className)}>
            {reactNode}
        </div>
    )
}
import { cn } from "@/utils/lib/cn";
import { ReactNode } from "react";

export const IconDiv = ({reactNode, className} : {reactNode : ReactNode, className ?: string}) => {
    return (
        <div className={cn("bg_card_gradient p-4 text-[hsl(var(--primary))]  rounded-full transition-all ease-linear duration-200", className)}>
            {reactNode}
        </div>
    )
}
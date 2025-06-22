"use client"

import { cn } from "@/utils/lib/cn"

export const CheckBox : React.FC<React.HTMLAttributes<HTMLInputElement>> = ({className, ...props}) => {
    return (           
        <input 
            type="checkbox" 
            className={cn("appearance-none size-4 border-2 cursor-pointer border-[hsl(var(--tertiary))] rounded-md bg-white/20 checked:bg-[hsl(var(--tertiary))]/70 checked:shadow-2xl checked:shadow-amber-700", className)}
            {...props}
            />
    )
}
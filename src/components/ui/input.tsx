import { cn } from "@/utils/lib/cn"
import { cva, VariantProps } from "class-variance-authority"
import React, { ReactNode } from "react"

export const InputVariants = cva(
    "w-full rounded-md border focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ",
    {
        variants : {
            variants : {
                primary : "bg-[hsl(var(--primary))]/14 placeholder:text-[hsl(var(--secondary-foreground))]/60 text-white border-white/20 focus:ring-[hsl(var(--primary))]",
                secondary : "bg-[hsl(var(--secondary))]/20 placeholder:text-[hsl(var(--secondary-foreground))]/60 text-white border-white/20 focus:ring-[hsl(var(--primary))]"
            },
            sizes : {
                sm : "text-sm h-10",
                // md : ""
            }
        },
        defaultVariants : {
            variants : "primary",
            sizes : "sm"
        }
    }
)


export interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants>{
    icon ? : ReactNode
}


export const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(({className, icon, variants, sizes, ...props}, ref) => {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor="" className="text-sm text-[hsl(var(--secondary-foreground))]">{props.name}</label>
            <div className="relative">
            {
                icon && <span className="absolute top-3 left-5">{icon}</span>
            }
            
            <input
            ref={ref}
            className={cn("", icon ? "px-11" : "px-5", className, InputVariants({variants, sizes}))}
            {...props}
            type={props.type}
            required
            />
            </div>
        </div>
    )
})


InputBox.displayName = "Input"
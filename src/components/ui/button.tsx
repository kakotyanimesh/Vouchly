import { cn } from "@/utils/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const ButtonVariants = cva(
    "w-fit rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-linear duration-200",
    {
        variants : {
            variant : {
                primary : "bg-[hsl(var(--pure-white))]/80 text-black",
                secondary : "bg-[hsl(var(--primary))] text-[hsl(var(--pure-white))] border border-[hsl(var(--primary-border))] hover:bg-[hsl(var(--hover-primary))]",
                transparent : "hover:bg-[hsl(var(--pure-white))]/10 border border-slate-100/10 text-[hsl(var(--primary))] hover:text-white",
                fetch : "hover:underline decoration-[hsl(var(--primary))] text-[hsl(var(--primary))] underline-offset-2"
            },
            sizes : {
                sm : "py-1 px-2 text-sm",
                md : "md:px-5 px-3 py-2 font-semibold text-sm "
            }
        },
        defaultVariants : {
            variant : "primary",
            sizes : "md"
        }
    }
)


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants>{}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, sizes, ...props}, ref) => {
    return (
        <button
        ref={ref}
        className={cn("", ButtonVariants({variant, sizes}), className)}
        {...props}
        />
    )
})


Button.displayName = "Button"
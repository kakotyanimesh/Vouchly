import { cn } from "@/utils/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const ButtonVariants = cva(
    "w-fit md:rounded-2xl rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-linear duration-200",
    {
        variants : {
            variant : {
                primary : "bg-white text-black",
                secondary : "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))]",
                transparent : "hover:bg-[hsl(var(--primary))]/20 border border-slate-100/10 text-[hsl(var(--primary))]",
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
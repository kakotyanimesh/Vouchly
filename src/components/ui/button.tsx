import { cn } from "@/utils/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps } from "motion/react";
import React from "react";
import { motion } from "motion/react";

const ButtonVariants = cva(
    "w-fit rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-all ease-linear duration-200",
    {
        variants : {
            variant : {
                primary : "bg-[hsl(var(--pure-white))]/80 text-black",
                secondary : "bg-gradient-to-r from-[hsl(var(--card-bg-two))]/60 to-[hsl(var(--card-bg-one))] text-black",
                transparent : "hover:bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:text-white",
                fetch : "hover:underline decoration-[hsl(var(--card-bg-one))] bg-gradient-to-r  from-[hsl(var(--card-bg-two))]/60 to-[hsl(var(--card-bg-one))] bg-clip-text text-transparent underline-offset-2"
                // decoration underline color 
            },
            sizes : {
                sm : "py-1 px-2 text-sm",
                md : "md:px-5 px-3 py-2 text-sm font-bold"
            }
        },
        defaultVariants : {
            variant : "primary",
            sizes : "md"
        }
    }
)


export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref">, VariantProps<typeof ButtonVariants>{}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, children, variant, sizes, ...props}, ref) => {
    return (
        <motion.button
        initial={{
            scale : 1
        }}
        whileTap={{
            scale : 0.95,
            transition : {
                ease : "linear"
            }
        }}
        ref={ref}
        className={cn("", ButtonVariants({variant, sizes}), className)}
        {...props}
        >
            {children}
        </motion.button>
    )
})


Button.displayName = "Button"
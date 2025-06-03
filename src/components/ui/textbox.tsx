import { cva } from "class-variance-authority";
import React from "react";

export const TextBoxVariants = cva(
    "w-full rounded-xl h-10 border focus:ring-2 focus:outline-none text-sm disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants : {
            variants : {
                "primary" : "bg-[hsl(var(--primary))]/20 placeholder:text-[hsl(var(--secondary-foreground))]/60 text-white border-white/20 focus:ring-[hsl(var(--primary))]"
            },
            sizes : {
                sm : "h-20 p-10"
            }
        },
        defaultVariants : {
            variants : "primary",
            sizes : "sm"
        }
    }
)


export interfce TextBoxProps extends React
"use client"
import { cn } from "@/utils/lib/cn";
import React from "react";
import { Card } from "../card";

type ColorPickerTypes = React.HTMLAttributes<HTMLDivElement> & {
    title : string,
    initialValue : string,
    onChangeFunction : (e : React.ChangeEvent<HTMLInputElement>) => void
}
 
export const ColorPicker : React.FC<ColorPickerTypes> = ({className,title, initialValue, onChangeFunction, ...props}) => {
    
    return ( 
        <div className={cn("", className)} {...props}>
            <h1 className="text-xs">{title}</h1>
            <Card className="flex flex-row items-center rounded bg-[hsl(var(--secondary))] focus-within:shadow-[0px_0px_0px_1px_#ed64a6]">
                <input 
                    type="color"
                    onChange={onChangeFunction}
                    value={initialValue}
                    className="input_color "
                    />
                <input 
                    placeholder={initialValue}
                    type="text"
                    className="pl-2 bg-white/10 text-white placeholder-white outline-0 ring-0 w-full rounded-r [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&&::-webkit-inner-spin-button]:appearance-none"/>
            </Card>
        </div>
    )
}
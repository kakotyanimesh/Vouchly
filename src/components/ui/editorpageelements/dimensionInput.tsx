"use client"
import { cn } from "@/utils/lib/cn";
import React, { ReactNode } from "react";
import { Card } from "../card";

type DiemnsionInputTypes = React.HTMLAttributes<HTMLDivElement> & {
    label : string,
    icon : ReactNode,
    initialValue : number,
    onChangeFuntion : (e : React.ChangeEvent<HTMLInputElement>) => void
}
 
export const DimensionInput : React.FC<DiemnsionInputTypes> = ({className, label, icon, initialValue, onChangeFuntion, ...props}) => {
    return (
        <div className={cn("space-y-1 cursor-pointer", className)} {...props}>
            <h1 className="text-xs">{label}</h1>
            <Card className="rounded pl-2 bg-[hsl(var(--secondary))] text-white/40 flex flex-row items-center gap-2 focus-within:shadow-[0px_0px_0px_1px_#ed64a6]">
                {icon}
                {/* <p className="pl-2 bg-white/10 w-full rounded-r-md">1</p> */}
                <input 
                    onChange={onChangeFuntion}
                    type="number"
                    min={0}
                    placeholder={initialValue.toString()}
                    className="pl-2  bg-white/10 text-white placeholder-white outline-0 ring-0  w-full rounded-r [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&&::-webkit-inner-spin-button]:appearance-none"/>
            </Card>
        </div>
    )
}
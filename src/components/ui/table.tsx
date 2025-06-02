import { cn } from "@/utils/lib/cn"
import { StatusColor, statusType } from "@/utils/lib/tailwind_switch"
import { TabledataTypes } from "@/utils/types/user_types"
import React from "react"
import { Button } from "./button"
import { toast } from "sonner"

type TableProps = React.HTMLAttributes<HTMLTableElement> & TabledataTypes


export const TableComponent : React.FC<TableProps> =  ({className, thead, tdata,...props}) => {
    return (
        <table className={cn("w-full ", className)} {...props}>
            <thead>
                <tr>
                    {thead.map((th, k) => (
                        <th key={k}
                        className={cn("text-left font-semibold text-[hsl(var(--primary))] px-3 py-2 border-b border-[hsl(var(--primary))]/20", th.isHidden ? "md:table-cell hidden" : "")}
                        >
                            {th.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tdata.map((td, k) => (
                    <tr key={k} className="cursor-pointer border-b border-[hsl(var(--primary))]/20 last:border-0 hover:bg-[hsl(var(--primary))]/10 transition-all ease-linear duration-200 px-6 py-5 text-left rounded-3xl">
                        {thead.map((th, k) => {
                            if(th.label === "Name"){
                                return (
                                    <td key={k} className="pt-5 pb-3 px-3 text-sm" >
                                        <span>{td[th.label]}</span>
                                        <p className="hidden md:table-cell">{td["desc"]}</p>
                                    </td>
                                )
                            }

                            if(th.label === "Status"){
                                return (
                                    <td key={k} className="">
                                        <span className={cn("px-3 py-0.5 rounded-full border text-sm", StatusColor(td[th.key] as statusType) )}>{td[th.key]}</span>
                                    </td>
                                )
                            }
                            if(th.label === "Actions"){
                                return (
                                    <td key={k} className="text-left pl-10">
                                        <button className="cursor-pointer" onClick={() => toast.success("will be available soon ...", {position : "bottom-right"})}>
                                            ...
                                        </button>
                                    </td>
                                )
                            }
                            
                            return (
                                <td key={k} className={cn("pt-5 pb-3 px-3 text-sm md:table-cell hidden")}>{td[th.key]}</td>
                            )
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
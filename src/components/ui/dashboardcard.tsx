import { cn } from "@/utils/lib/cn"
import { Card } from "./card"
import { DashboardCardProps, RecentelyActiveProps } from "@/utils/types/user_types"
import React from "react"
import Link from "next/link"
import { StatusColor } from "@/utils/lib/tailwind_switch"

type DashboardProps = React.HTMLAttributes<HTMLDivElement> & DashboardCardProps

export const DashboardCard : React.FC<DashboardProps> = ({className, title, data, desc, ...props}) => {
    return (
        <Card className={cn("bg-[hsl(var(--pure-white))]/5 px-7 py-6 hover:border-[hsl(var(--primary))]/40 active:border-[hsl(var(--primary))]/40 transition-colors ease-linear duration-200", className)} {...props}>
            <h1 className="text-[hsl(var(--primary))] font-semibold">Total {title}</h1>
            <h1 className="text-4xl font-bold">{data} </h1>
            <p className="text-sm text-[hsl(var(--primary))]">{desc}</p>
        </Card>
    )
}

type RecentlyActiveCardProps = React.HTMLAttributes<HTMLAnchorElement> & RecentelyActiveProps

export const RecentlyActiveCard : React.FC<RecentlyActiveCardProps> = ({className, time, Name, position, src, status, ...props}) => {
    return (
        <Link href={src} className={cn("flex flex-row justify-between rounded-none border-b first:rounded-t-md last:rounded-b-md transition-all duration-200 ease-linear last:border-b-0 px-10 pt-6 pb-3 cursor-pointer text-xs border-slate-100/10 bg-[hsl(var(--pure-white))]/7 hover:bg-[hsl(var(--primary))]/20", className)} {...props}>
            <div>
                <h1 className="text-sm">{Name}</h1>
                <p className="text-[hsl(var(--card-foreground))]/70">{position}</p>
            </div>
            <div className="text-right">
                <h1 className={cn("px-3 py-0.5 rounded-full border", StatusColor(status))}>{status}</h1>
                <p>{time} ago</p>
            </div>
        </Link>
    )
}
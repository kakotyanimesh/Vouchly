import { cn } from "@/utils/lib/cn"


export const DashboardNavbarText = ({h1Title , desc, className} : {h1Title : string, desc : string, className ?: string}) => {
    return(
        <div className={cn("", className)}>
            <h1 className="font-semibold text-2xl">{h1Title}</h1> 
            <p className="text-[hsl(var(--secondary-foreground))] text-sm">{desc}</p>
        </div>
    )
}
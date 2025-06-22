import { cn } from "@/utils/lib/cn"

export const Card : React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn("rounded-md border-[hsl(var(--pure-white))]/20 border bg-[hsl(var(--deep-black))]", className)} {...props}>
            {children}
        </div>
    )
}
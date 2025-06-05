import { cn } from "@/utils/lib/cn"

export const Card : React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn("rounded-md border-slate-100/10 border", className)} {...props}>
            {children}
        </div>
    )
}
import { cn } from "@/utils/lib/cn";
import React, { forwardRef } from "react";

// export const Card : React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
//     className,
//     children,
//     ...props
// }) => {
//     return (
//         <div className={cn("rounded-xl border-[hsl(var(--pure-white))]/20 border bg-[hsl(var(--deep-black))]", className)} {...props}>
//             {children}
//         </div>
//     )
// }

export const Card = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				"rounded-xl border-[hsl(var(--pure-white))]/20 border bg-[hsl(var(--deep-black))]",
				className,
			)}
			{...props}
		>
			{props.children}
		</div>
	);
});

Card.displayName = "card";

export const InfiniteScrollCard: React.FC<
	React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
	return (
		<div
			className={cn(
				"w-full overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-[hsl(var(--tertiary))]/60 scrollbar-track-[hsl(var(--tertiary))]/40 scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

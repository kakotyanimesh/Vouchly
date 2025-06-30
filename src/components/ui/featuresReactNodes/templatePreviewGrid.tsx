"use client"
import { motion } from "motion/react";
import { cn } from "@/utils/lib/cn";
import React from "react";
import { Card } from "../card";
import { HTMLMotionProps } from "motion/react";
import { FeatureIconDivProps } from "./dashboardPreview";

export const FormPreview: React.FC<FeatureIconDivProps> = ({
	className,
	isHover,
	...props
}) => {
	return (
		<div className={cn("h-28 relative", className)} {...props}>
			<DeskTopFormCard isHover={isHover}/>
			<MobileFormCard isHover={isHover} />
		</div>
	);
};



const DeskTopFormCard = ({isHover} : {isHover : boolean}) => {
    return (
		<Card
			className={cn(
				"bg-gradient-to-b from-[hsl(var(--feature-preview))]/10 to-transparent border-0 h-full md:w-60 flex flex-col items-center space-y-2 px-2 pt-2",
				isHover ? "shadow-[0px_4px_4px_-2px_#C27CFF] transition-colors delay-200 ease-linear" : undefined
			)}
		>
			<MotionDiv />
			<MotionDiv className="w-1/2 h-2" />
			<div className="w-full flex flex-col justify-center items-center space-y-0.5">
				{Array.from({ length: 3 }).map((_, k) => (
					<MotionDiv
						key={k}
						className={cn("h-1", k % 2 === 0 ? "w-42" : "w-56")}
					/>
				))}
			</div>
			<MotionDiv className=" bg-gradient-to-b from-[hsl(var(--primary))]/20 to-transparent w-40 h-full rounded" />
		</Card>
	);
}


const MobileFormCard = ({ isHover }: { isHover: boolean }) => {
	return (
		<Card
			className={cn(
				"border-0 bg-gradient-to-b from-[hsl(var(--primary))]/20 to-transparent absolute h-full w-36 top-3 right-0 hidden md:flex flex-col items-center space-y-2 px-2 pt-2",
				isHover ? "shadow-[0px_4px_4px_-3px_#25D3B1] transition-colors delay-300 ease-linear" : undefined
			)}
		>
			<MotionDiv className="w-6 h-4 bg-[hsl(var(--feature-preview))]/30" />
			<MotionDiv className="w-1/2 h-2 bg-[hsl(var(--feature-preview))]/30" />
			<div className="w-full flex flex-col justify-center items-center space-y-0.5">
				{Array.from({ length: 3 }).map((_, k) => (
					<MotionDiv
						key={k}
						className={cn(
							" h-1 bg-[hsl(var(--feature-preview))]/30",
							k % 2 === 0 ? "w-24" : "w-28"
						)}
					/>
				))}
			</div>
			<MotionDiv className=" bg-gradient-to-b from-[hsl(var(--feature-preview))]/50 to-transparent w-28 h-full rounded" />
		</Card>
	);
};


export const MotionDiv : React.FC<HTMLMotionProps<"div">> = ({className, ...props}) => {
	return (
		<motion.div
			className={cn(
				"bg-[hsl(var(--primary))]/30 w-6 h-5 border-0 rounded-2xl",
				className
			)}
			{...props}
		/>
	);
}

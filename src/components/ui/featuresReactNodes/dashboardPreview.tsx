"use client";
import { cn } from "@/utils/lib/cn";
import React, { HTMLAttributes, useEffect, useState } from "react";
import { Card } from "../card";
import { MotionDiv } from "./templatePreviewGrid";

export type FeatureIconDivProps = HTMLAttributes<HTMLDivElement> & {
	isHover: boolean;
};

export const DashboardPreview: React.FC<FeatureIconDivProps> = ({
	className,
	isHover,
	...props
}) => {
	const [heights, setHeights] = useState<number[]>([]);

	useEffect(() => {
		const randomHeight = Array.from({ length: 15 }).map(

			() => Math.floor(Math.random() * 30) + 40
		);

		setHeights(randomHeight);
	}, []);

	return (
		<div className={cn("h-28", className)} {...props}>
			<Card className="bg-[hsl(var(--feature-preview))]/10 h-full space-y-4 px-4 pt-3 border-0">
				<MotionDiv className="w-1/2 h-2" />
				<div className="flex flex-row justify-between items-end ">
					{heights.map((h, k) => (
						<div
							key={k}
							className={cn(
								"rounded-t-full w-3 transition-colors ease-linear relative overflow-hidden",
								k % 2 === 0
									? "bg-[hsl(var(--feature-preview))]/20"
									: "bg-[hsl(var(--primary))]/20"
							)}
							style={{ height: `${h}px` }}
						>
							<MotionDiv 
								className="absolute bottom-0 left-0 rounded-t-full w-3" 
								initial={{height : "0%"}}
								animate={{
									height : isHover ? "100%" : "0%",
									backgroundColor : k % 2 === 0 ? "hsl(var(--feature-preview))" : "hsl(var(--primary))"
								}}
								transition={{
									delay : k * 0.05,
									duration : 0.5,
									ease : "linear",
									// type : "spring",
									// stiffness : 300
								}}
								/>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

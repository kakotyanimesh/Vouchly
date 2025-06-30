import React from "react";
import { Card } from "../card";
import { MotionDiv } from "./templatePreviewGrid";
import { FeatureIconDivProps } from "./dashboardPreview";
import { cn } from "@/utils/lib/cn";

export const EmbadedPreview: React.FC<FeatureIconDivProps> = ({
	isHover,
	className,
	...props
}) => {
	return (
		<Card
			className={cn(
				"bg-[hsl(var(--feature-preview))]/10 h-28 p-4 space-y-2 border-0",
				className
			)}
			{...props}
		>
			<MotionDiv
				initial={{
					opacity : 0,
					scale : 0
				}}
				animate={{
					backgroundColor: isHover
						? "hsl(var(--primary))"
						: undefined,
					opacity : isHover ? 1 : 0,
					scale : isHover ? 1 : 0
				}}
				
				transition={{
					ease : "easeOut",
					type : "spring",
					stiffness : 100,
					delay : 0.2,
					duration : 0.5
				}}
				className="w-10 h-3"
			/>
			<div className="grid grid-cols-2 w-full h-full gap-3">
				{Array.from({ length: 2 }).map((_, k) => (
					<Card
						key={k}
						className="bg-gradient-to-b from-[hsl(var(--feature-preview))]/30 to-transparent flex flex-col items-center space-y-2 justify-center py-3 px-2  w-full border-0"
					>
						<MotionDiv className="bg-[hsl(var(--feature-preview))]/40 rounded-md h-2 w-4" />
						<MotionDiv className="bg-gradient-to-b to-transparent from-[hsl(var(--primary))]/60 rounded-md h-7 w-full" />
					</Card>
				))}
			</div>
		</Card>
	);
};
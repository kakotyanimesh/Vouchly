"use client";
import { motion } from "motion/react";
import { cn } from "@/utils/lib/cn";
import React, { HTMLAttributes } from "react";
import { Card } from "../card";

export const ReviewTamplatePreview: React.FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<Card
			className={cn(
				"border-0 bg-[hsl(var(--feature-preview))]/10 h-28 overflow-hidden space-y-1 pt-1",
				className
			)}
			{...props}
		>
			<CorosoulPreviewAnimation direction="left" />
			<CorosoulPreviewAnimation direction="right" />
			<CorosoulPreviewAnimation direction="left" />
			<CorosoulPreviewAnimation direction="right" />
			<CorosoulPreviewAnimation direction="left" />
		</Card>
	);
};


const CorosoulPreviewAnimation = ({direction} : {direction : "left" | "right"}) => {
    const totalLength = 68 * 12
    return (
		<motion.div
			animate={{
				x: [0, direction === "left" ? -totalLength : totalLength],
			}}
			transition={{
				duration: 100,
				ease: "linear",
				repeat: Infinity,
			}}
			className="gap-1 flex  justify-center items-center"
		>
			{Array.from({ length: 24 }).map((_, k) => (
				<Card
					key={k}
					className={cn(
						"w-16 h-5 shrink-0 rounded-md border-0 to-transparent",
						k % 2 === 0
							? "from-[hsl(var(--feature-preview))]/30 bg-gradient-to-l"
							: "from-[hsl(var(--primary))]/30 bg-gradient-to-r"
					)}
				/>
			))}
		</motion.div>
	);
}
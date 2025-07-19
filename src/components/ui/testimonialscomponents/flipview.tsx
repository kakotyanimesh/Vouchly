"use client"
import React from "react";
import { TextReviewTypes } from "./textreviewone";
import { motion } from "motion/react";
import { cn } from "@/utils/lib/cn";
import Image from "next/image";
import { Star } from "lucide-react";

export const FlipView: React.FC<TextReviewTypes> = ({
	textReview,
	imageSrc,
	customerCompany,
	customerName,
	stars,
	className,
	tesimoonialCardBg,
	textColor,
	starColor,
	roundedCorner,
	...props
}) => {
	return (
		<motion.div
			style={{
				background:
					tesimoonialCardBg ||
					`linear-gradient(to right, hsl(var(--feature-preview)/ 0.4), hsl(var(--primary)/0.6))`,
				color: textColor,
				borderRadius: `${roundedCorner || 16}px`,
			}}
			className={cn("p-4 space-y-5 min-h-72", className)}
			{...props}
		>
			<div className="flex flex-col justify-center items-center text-center gap-3">
				<Image
					src={imageSrc}
					width={30}
					height={30}
					className="rounded-full size-8"
					alt="userimage"
				/>
				<div>
					<h1 className="text-sm">{customerName}</h1>
					<h2 className="text-[hsl(var(--pure-white))]/60 text-xs">
						{customerCompany}
					</h2>
				</div>
			</div>
			<div className="space-y-2 text-left">
				{RenderStars({
					starNo: stars,
					className: "text-center flex justify-center",
					starColor,
				})}
				<h1 className="text-sm break-all">{textReview}</h1>
			</div>
		</motion.div>
	);
};

export const RenderStars = ({
	starNo,
	className,
	starColor,
}: {
	starNo: number;
	className?: string;
	starColor?: string;
}) => {
	return (
		<div className={cn("flex flex-row gap-2", className)}>
			{Array.from({ length: 5 }).map((_, k) => (
				<Star
					size={15}
					key={k}
					style={{
						color: starColor || "hsl(var(--primary))",
						fill:
							starNo > k
								? starColor || "hsl(var(--primary))"
								: undefined,
					}}
				/>
			))}
		</div>
	);
};

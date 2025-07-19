"use client";
import { motion } from "motion/react";
import React from "react";
import { TextReviewTypes } from "./textreviewone";
import { cn } from "@/utils/lib/cn";
import Image from "next/image";
import { RenderStars } from "./flipview";

export const ManualSlide: React.FC<TextReviewTypes> = ({
	textReview,
	imageSrc,
	customerCompany,
	customerName,
	stars,
	tesimoonialCardBg,
	textColor,
	starColor,
	roundedCorner,
	className,
	...props
}) => {
	return (
		<motion.div
			className={cn(
				" px-3 py-1 rounded-2xl w-72 flex-shrink-0 flex flex-col justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 gap-3",
				className,
			)}
			style={{
				background:
					tesimoonialCardBg ||
					`linear-gradient(to right, hsl(var(--feature-preview)/ 0.4), hsl(var(--primary)/0.6))`,
				color: textColor,
				borderRadius: `${roundedCorner || 16}px`,
			}}
			{...props}
		>
			{RenderStars({ starNo: stars, starColor })}

			<h1 className="text-left text-sm break-all">{textReview}</h1>
			<div className="flex flex-row items-center gap-3 text-left">
				<Image
					src={imageSrc}
					width={50}
					height={50}
					alt="user image"
					className="rounded-full object-fit size-7  bg-gray-200"
				/>
				<div>
					<h1 className="text-sm">{customerName}</h1>
					<p className="text-xs">{customerCompany}</p>
				</div>
			</div>
		</motion.div>
	);
};

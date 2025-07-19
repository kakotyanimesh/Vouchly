"use client";

import { cn } from "@/utils/lib/cn";
import { TextReviewProps } from "@/utils/types/user_types";
import { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import Image from "next/image";
import { RenderStars } from "./flipview";
import { TestimonialCardStyleProps } from "@/utils/zustand/gridstateV2";

export type TextReviewTypes = HTMLMotionProps<"div"> &
	TextReviewProps &
	Partial<Omit<TestimonialCardStyleProps, "parentBgColor" | "shadowColor">>;

export const TextReviewOne: React.FC<TextReviewTypes> = ({
	textReview,
	className,
	imageSrc,
	customerCompany,
	customerName,
	stars,
	tesimoonialCardBg,
	textColor,
	starColor,
	roundedCorner,
	...props
}) => {
	return (
		<motion.div
			// // onHoverEnd={() => setisHoverStart(false)

			className={cn(
				"rounded-2xl text-left min-h-56 p-5 flex flex-col justify-between gap-3",
				className,
			)}
			// style={{
			// 	background: 'linear-gradient(to bottom left, hsl(var(--feature-preview)) 40%, hsl(var(--primary)) 60%)'
			// }}
			style={{
				background:
					tesimoonialCardBg ||
					`linear-gradient(to right, hsl(var(--feature-preview)/ 0.4), hsl(var(--primary)/0.6))`,
				color: textColor,
				borderRadius: `${roundedCorner || 16}px`
			}}
			{...props}
		>
			<div className="lg:space-y-3 space-y-1">
				{RenderStars({ starNo: stars, starColor })}
				<h1 className="text-sm inline-block break-all">{textReview}</h1>
			</div>
			<div className="flex flex-row gap-3 items-center">
				<Image
					src={imageSrc}
					width={30}
					height={30}
					className="size-7 rounded-full object-fill"
					alt="user image"
				/>
				<div className="-space-y-1">
					<h1 className="text-sm">{customerName}</h1>
					<p className="text-xs">{customerCompany}</p>
				</div>
			</div>
		</motion.div>
	);
};

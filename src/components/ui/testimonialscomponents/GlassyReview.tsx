"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { RenderStars } from "./flipview";
import { TextReviewTypes } from "./textreviewone";
import { cn } from "@/utils/lib/cn";
import { Card } from "../card";

type GlassReviewProps = TextReviewTypes & {
	shadowcolor?: string;
};

export const GlassyReview: React.FC<GlassReviewProps> = ({
	textReview,
	imageSrc,
	customerName,
	stars,
	shadowcolor,
	tesimoonialCardBg,
	textColor,
	starColor,
	roundedCorner,

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	customerCompany,
	className,
	...props
}) => {
	return (
		<motion.div
			className={cn(
				"flex justify-center items-center h-full w-full relative group ",
				className,
			)}
			{...props}
		>
			<Card
				style={{
					background:
						tesimoonialCardBg || `hsl(var(--pure-white)/0.1)`,
					color: textColor,
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: 'blur(12px)',
					borderRadius: `${roundedCorner || 16}px`,
				}}
				className=" relative flex flex-row items-center space-x-5 md:py-4 p-2 md:px-7 rounded-2xl border-0 w-[90%] z-10 backdrop-blur-none group-hover:backdrop-blur-3xl transition-all ease-linear duration-200 min-h-50 "
			>
				<Image
					src={imageSrc}
					width={50}
					height={50}
					className="size-13 rounded-full"
					alt="user_image"
				/>
				<div className="space-y-2">
					{RenderStars({ starNo: stars, starColor })}
					<h1 className="text-sm break-all">{textReview}</h1>
					<h1 className="text-xs bg-[hsl(var(--tertiary))] w-fit px-3 group-hover:-skew-3 transition-all duration-200 ease-out">
						{customerName}
					</h1>
				</div>
			</Card>
			<Card
				style={{
					background: shadowcolor || `linear-gradient(to right, #a855f733, #8b5cf633`,
					borderRadius: `${roundedCorner}px`,
					filter: 'blur(12px)',
					opacity: 0.6,
					zIndex: 1,
				}}
				className="rounded-2xl border-0 w-[90%] md:h-50 h-52 absolute top-19 -left-2"
			/>
		</motion.div>
	);
};

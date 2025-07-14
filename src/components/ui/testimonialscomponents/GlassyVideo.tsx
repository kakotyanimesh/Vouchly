/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/utils/lib/cn";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import React from "react";
import { getVideoType, VideoTestimonialType } from "./customvideotestimonial";
import { Card } from "../card";
import { RenderStars } from "./flipview";

// type VideoTestimonialType = HTMLMotionProps<"div"> & {
// 	username: string;
// 	usercompany: string;
// 	videoSrc: any;
// 	stars: number;
// 	fixedHeight?: number;
// } & Partial<Omit<TestimonialCardStyleProps, "parentBgColor" | "shadowColor">>

type videotestimonialtypeWithShdowColor = VideoTestimonialType & {
	shadowcolor?: string
}

export const GlassyVideoReview: React.FC<videotestimonialtypeWithShdowColor> = ({
	usercompany,
	username,
	videoSrc,
	stars,
	shadowcolor,
	tesimoonialCardBg,
	textColor,
	starColor,
	roundedCorner,
	className,
	fixedHeight = 320,
	...props
}) => {
	const type = getVideoType(videoSrc);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	const videoHandle = () => {
		const video = videoRef.current;

		if (!video) return;
		if (video.paused) {
			setIsPlaying(true);
			video.play();
		} else {
			setIsPlaying(false);
			video.pause();
		}
	};

	return (
		<motion.div
			style={{
				height: fixedHeight,
				borderRadius: `${roundedCorner || 16}px`,
				color: textColor
			}}
			className={cn(
				"flex justify-center items-center h-full w-full group relative ",
				className,
			)}
			{...props}
		>
			<Card style={{
				borderRadius: `${roundedCorner}px`,
				background:
					tesimoonialCardBg ||
					`linear-gradient(to right, hsl(var(--feature-preview)/ 0.4), hsl(var(--primary)/0.6))`,
			}} className="border-0 w-[90%] z-10 backdrop-blur-2xl overflow-hidden relative">
				<div className="relative w-full h-42 overflow-hidden rounded-t-2xl">
					<video
						ref={videoRef}
						className="absolute inset-0 w-full h-full object-cover"
						style={{
							borderTopRightRadius: `${roundedCorner}px`,
							borderTopLeftRadius: `${roundedCorner}px`
						}}
						preload="metadata"
						playsInline
						muted
					>
						<source src={videoSrc} type={`video/${type}`} />
						Your browser does not support video
					</video>

					<button
						onClick={videoHandle}
						style={{
							background: tesimoonialCardBg || "hsl(var(--tertiary)/0.7)",
						}}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[hsl(var(--primary))] rounded-full size-10 flex items-center justify-center cursor-pointer z-20 transition-all duration-200 hover:scale-110"
					>
						{!isPlaying ? (
							<Play

								style={{
									fill: "hsl(var(--primary))"
								}}
								size={24}
							/>
						) : (
							<Pause
								style={{
									fill: "hsl(var(--primary))"
								}}
								size={24} />
						)}
					</button>
				</div>

				<div
					style={{
						background:
							tesimoonialCardBg ||
							`linear-gradient(to right, hsl(var(--feature-preview)/ 0.4), hsl(var(--primary)/0.6))`,
						borderBottomLeftRadius: `${roundedCorner}px`,
						borderBottomRightRadius: `${roundedCorner}px`
					}}
					className="font-semibold text-center w-full flex flex-col justify-center items-center rounded-b-2xl backdrop-blur-2xl py-1 space-y-1"
				>
					<h1 className="text-xs bg-[hsl(var(--tertiary))] w-fit px-3 group-hover:-skew-3 transition-all duration-200 ease-out">
						{username}
					</h1>
					<p className="text-xs text-muted-foreground">
						{usercompany}
					</p>
					{RenderStars({ starNo: stars, starColor })}

				</div>
			</Card>
			<Card style={{
				background: shadowcolor || "linear-gradient(to right, #a855f733, #8b5cf633)",
				borderRadius: `${roundedCorner}px`

			}} className="rounded-2xl group-hover:blur-xs  border-0 w-[90%] h-58 absolute top-20 -left-2 blur-sm transition-all duration-200 ease-out" />
		</motion.div>
	);
};
